import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware";

import {
  getUserProfile,
  updateUserProfile,
  useCredit,
} from "../controllers/profile.controller";

const router = Router();

router.route("/").get(verifyJwt, getUserProfile);
router.route("/").put(verifyJwt, updateUserProfile);
router.route("/use-credit").post(verifyJwt, useCredit);

export default router;
