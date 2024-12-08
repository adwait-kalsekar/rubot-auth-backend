import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware";

import { getUserProfile } from "../controllers/profile.controller";

const router = Router();

router.route("/").get(verifyJwt, getUserProfile);

export default router;
