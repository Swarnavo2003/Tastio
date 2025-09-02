import fs from "fs";
import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { addItemSchema } from "../validations/item.validation.js";

export const addItem = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  if (!ownerId) {
    throw new ApiError(401, "Unauthorized");
  }

  const shop = await Shop.findOne({ owner: ownerId }).populate("items");
  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  const result = addItemSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, result.error.message);
  }

  const { name, price, category, foodType } = result.data;

  let image;
  if (req.files && req.files.image && req.files.image.length > 0) {
    image = req.files.image[0].path;
  }

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

  return res
    .status(201)
    .json(new ApiResponse(201, item, `Item added to shop ${shop.name}`));
});

export const editItem = asyncHandler((req, res) => {});
