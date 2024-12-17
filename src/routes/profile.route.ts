import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware";

import { getUserProfile, useCredit } from "../controllers/profile.controller";

const router = Router();

router.route("/").get(verifyJwt, getUserProfile);
router.route("/use-credit").post(verifyJwt, useCredit);

export default router;
