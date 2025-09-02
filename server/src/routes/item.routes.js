import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addItem, editItem } from "../controllers/item.controller.js";

const itemRouter = express.Router();

itemRouter.post(
  "/create-item",
  isAuthenticated,
  upload.fields([{ name: "image", maxCount: 1 }]),
  addItem
);

itemRouter.put(
  "/edit-item/:id",
  isAuthenticated,
  upload.fields([{ name: "image", maxCount: 1 }]),
  editItem
);

export default itemRouter;
