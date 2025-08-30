import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  sendOtp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/send-otp", sendOtp);

export default authRouter;
