import Shop from "../models/shop.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import uploadToCloudinary from "../utils/cloudinary.js";
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
  if (req.file) {
    image = await uploadToCloudinary(req.file.path);
  }

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
