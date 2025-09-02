import Shop from "../models/shop.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { createShopSchema } from "../validations/shop.validation.js";

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

export const editShop = asyncHandler(async (req, res) => {});
