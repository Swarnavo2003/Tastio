import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./api-error.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localFilePath, folder = "uploads") => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folder,
    });

    fs.unlinkSync(file);

    return result;
  } catch (error) {
    fs.unlinkSync(file);
    console.log("Error in uploading to cloudinary", error);
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Error in deleting from cloudinary", error);
    throw new ApiError(500, "Error in deleting from cloudinary");
  }
};
