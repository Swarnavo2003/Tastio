import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { generateToken } from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const registerUser = asyncHandler(async (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, result.error.message);
  }

  const { fullName, email, password, mobile, role } = result.data;

  if (!fullName || !email || !password || !mobile || !role) {
    throw new ApiError(400, "All fields are required");
  }

  let user = await User.findOne({ email });

  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    mobile,
    role,
  });

  const token = await generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, result.error.message);
  }

  const { email, password } = result.data;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = await generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User logged in successfully"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const otp = Math.floor(Math.random() * 1000000).toString();

  user.resetOtp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendOtpMail(user.email, otp);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP sent successfully"));
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!otp) {
    throw new ApiError(400, "OTP is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (user.resetOtp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  if (user.otpExpires < Date.now()) {
    throw new ApiError(400, "OTP has expired");
  }

  user.isOtpVerified = true;
  user.resetOtp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP verified successfully"));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (!user.isOtpVerified) {
    throw new ApiError(400, "OTP not verified");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.isOtpVerified = false;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully"));
});
