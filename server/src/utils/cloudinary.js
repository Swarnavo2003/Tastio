import dotenv from "dotenv";
dotenv.config({ quiet: true });
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
    if (!localFilePath) {
      throw new ApiError(400, "File path is required");
    }

    if (!fs.existsSync(localFilePath)) {
      throw new ApiError(400, "File not found");
    }

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folder,
    });

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("Local file deleted:", localFilePath);
    }

    return result;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.log("Error in uploading to cloudinary", error);
    throw new ApiError(500, "Error in uploading to cloudinary");
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
