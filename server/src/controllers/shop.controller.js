import Shop from "../models/shop.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import {
  createShopSchema,
  updateShopSchema,
} from "../validations/shop.validation.js";

export const createShop = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  if (!ownerId) {
    throw new ApiError(401, "Unauthorized");
  }

  const result = createShopSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, result.error.message);
  }

  const { name, city, state, address } = result.data;
  let image;
  if (req.files && req.files.image && req.files.image.length > 0) {
    image = req.files.image[0].path;
  }

  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  const uploadedImage = await uploadToCloudinary(image);
  image = {
    url: uploadedImage.secure_url,
    public_id: uploadedImage.public_id,
  };

  const shop = await Shop.create({
    name,
    address,
    city,
    image,
    state,
    owner: ownerId,
  });
  await shop.populate("owner");
  return res.status(201).json(new ApiResponse(201, shop, "Shop created"));
});

export const updateShop = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  if (!ownerId) {
    throw new ApiError(401, "Unauthorized");
  }

  const result = updateShopSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, result.error.message);
  }

  const { name, city, state, address } = result.data;

  const shop = await Shop.findOne({ owner: ownerId });
  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  let image;
  if (req.files && req.files.image && req.files.image.length > 0) {
    image = req.files.image[0].path;
  }

  if (image) {
    if (shop.image.public_id) {
      await deleteFromCloudinary(shop.image.public_id);
    }

    const result = await uploadToCloudinary(image);
    image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  if (name) shop.name = name;
  if (city) shop.city = city;
  if (state) shop.state = state;
  if (address) shop.address = address;
  if (image) shop.image = image;

  await shop.save();
  return res.status(200).json(new ApiResponse(200, shop, "Shop updated"));
});

export const getMyShop = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  if (!ownerId) {
    throw new ApiError(401, "Unauthorized");
  }
  const shop = await Shop.findOne({ owner: ownerId }).populate("owner items");
  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }
  return res.status(200).json(new ApiResponse(200, shop, "Shop found"));
});
