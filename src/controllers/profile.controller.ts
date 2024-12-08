import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Profile } from "../models/profile.model";

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "Invalid Token");
  }

  const profile = await Profile.findOne({ user: user });

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  const profileData = profile.toObject();

  profileData.user = user;

  return res
    .status(200)
    .json(new ApiResponse(200, profileData, "User Profile"));
});

const updateUserProfile = () => {};

export { getUserProfile };
