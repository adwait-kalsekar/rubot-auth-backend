import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Profile } from "../models/profile.model";
import { profileValidator } from "../validators/profile.validator";
import { User } from "../models/user.model";

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

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  const validatedUserProfile = profileValidator.parse(req.body);

  console.log(validatedUserProfile);

  if (!user) {
    throw new ApiError(404, "Invalid Token");
  }

  const profile = await Profile.findOne({ user: user }).select(
    "-createdAt -updatedAt -__v",
  );

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  await User.findByIdAndUpdate(profile.user, {
    fullName: validatedUserProfile.fullName,
    email: validatedUserProfile.email,
    username: validatedUserProfile.username,
  });

  let canvasApiKey: string | null = null;

  if (
    validatedUserProfile.profile.isStudent &&
    validatedUserProfile.profile.canvasApiKey !== null
  ) {
    canvasApiKey = validatedUserProfile.profile.canvasApiKey;
  }

  await Profile.findByIdAndUpdate(profile._id, {
    canvasApiKey,
    isStudent: validatedUserProfile.profile.isStudent,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Profile Updated successfully"));
});

export { getUserProfile, updateUserProfile, useCredit };
