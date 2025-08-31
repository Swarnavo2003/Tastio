import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/current-user", isAuthenticated, getCurrentUser);

export default userRouter;
