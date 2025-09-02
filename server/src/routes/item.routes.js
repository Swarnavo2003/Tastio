import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addItem } from "../controllers/item.controller.js";

const itemRouter = express.Router();

itemRouter.post(
  "/create-item",
  isAuthenticated,
  upload.fields([{ name: "image", maxCount: 1 }]),
  addItem
);

export default itemRouter;
