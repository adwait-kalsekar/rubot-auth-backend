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

  const profile = await Profile.findOne({ user: user }).select(
    "-user -createdAt -updatedAt -__v",
  );

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  const userData = user.toObject();

  userData.profile = profile;

  const profileData = {
    user,
    profile,
  };

  return res.status(200).json(new ApiResponse(200, userData, "User Profile"));
});

const useCredit = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "Invalid Token");
  }

  const profile = await Profile.findOne({ user: user }).select(
    "-user -createdAt -updatedAt -__v",
  );

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  const profileCredits = profile.credits;

  if (profileCredits <= 0) {
    throw new ApiError(400, "Cannot Deduct credits. Zero Credits");
  }

  await profile.updateOne({ credits: profileCredits - 1 });

  await profile.save();

  return res.status(204).json(new ApiResponse(204, null, "Credits deducted"));
});

const updateUserProfile = () => {};

export { getUserProfile, useCredit };
