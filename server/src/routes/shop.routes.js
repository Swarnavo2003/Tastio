import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { createShop, updateShop } from "../controllers/shop.controller.js";

const shopRouter = express.Router();

shopRouter.post(
  "/create-shop",
  isAuthenticated,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createShop
);

shopRouter.post(
  "/update-shop",
  isAuthenticated,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateShop
);

export default shopRouter;
