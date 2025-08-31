import express, { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../controllers/auth.controller.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => res.redirect(`${process.env.CLIENT_URL}/`)
);

export default authRouter;
