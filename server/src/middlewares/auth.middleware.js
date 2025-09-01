import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.user) {
    return next();
  }

  const token = req.cookies?.token;
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }
  req.user = user;
  next();
});
