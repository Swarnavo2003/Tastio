import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { registerSchema } from "../validations/auth.validation.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { generateToken } from "../utils/token.js";

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
