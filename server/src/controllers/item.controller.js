import fs from "fs";
import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import {
  addItemSchema,
  updateItemSchema,
} from "../validations/item.validation.js";

export const addItem = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  if (!ownerId) {
    throw new ApiError(401, "Unauthorized");
  }

  const shop = await Shop.findOne({ owner: ownerId }).populate("items");
  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  let image;
  if (req.files && req.files.image && req.files.image.length > 0) {
    image = req.files.image[0].path;
  }

  const result = addItemSchema.safeParse(req.body);
  if (!result.success) {
    fs.unlinkSync(image);
    throw new ApiError(400, result.error.message);
  }

  const { name, price, category, foodType } = result.data;

  const existingItemInShop = shop.items.find((item) => item.name === name);
  if (existingItemInShop && fs.existsSync(image)) {
    fs.unlinkSync(image);
    throw new ApiError(400, "Item already exists");
  }

  if (image) {
    const result = await uploadToCloudinary(image);
    image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const item = await Item.create({
    name,
    price: Number(price),
    category,
    foodType,
    image: image,
    shop: shop._id,
  });
  shop.items.push(item._id);
  await shop.save();
  await shop.populate("items");

  return res
    .status(201)
    .json(new ApiResponse(201, shop, `Item added to shop ${shop.name}`));
});

export const editItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;

  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  const ownerId = req.user._id;
  if (!ownerId) {
    throw new ApiError(401, "Unauthorized");
  }

  const shop = await Shop.findOne({ owner: ownerId }).populate("items");
  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  const result = updateItemSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, result.error.message);
  }

  const { name, price, category, foodType } = result.data;

  let image;
  if (req.files && req.files.image && req.files.image.length > 0) {
    image = req.files.image[0].path;
  }

  if (image) {
    if (item.image.public_id) {
      await deleteFromCloudinary(item.image.public_id);
    }

    const result = await uploadToCloudinary(image);
    image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
    item.image = image;
  }

  if (name) item.name = name;
  if (price) item.price = Number(price);
  if (category) item.category = category;
  if (foodType) item.foodType = foodType;

  await item.save();

  return res.status(200).json(new ApiResponse(200, item, "Item updated"));
});
