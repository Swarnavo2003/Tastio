import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Not Authenticated"));
  }

  return res.status(200).json(new ApiResponse(200, req.user, "Success"));
});
