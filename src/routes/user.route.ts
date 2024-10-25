import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware";

import {
  getLoggedInUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/users.controller";
import upload from "../middlewares/multer.middleware";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser,
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logoutUser);

router.route("/tokenRefresh").post(refreshAccessToken);

router.route("/getUser").get(verifyJwt, getLoggedInUser);

export default router;
