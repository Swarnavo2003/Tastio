import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addItem, editItem, getItem } from "../controllers/item.controller.js";

const itemRouter = express.Router();

itemRouter.post(
  "/create-item",
  isAuthenticated,
  upload.fields([{ name: "image", maxCount: 1 }]),
  addItem
);

itemRouter.get("/get-item/:id", isAuthenticated, getItem);

itemRouter.put(
  "/edit-item/:id",
  isAuthenticated,
  upload.fields([{ name: "image", maxCount: 1 }]),
  editItem
);

export default itemRouter;
