import express from "express";
import {
  checkAuthController,
  loginController,
  logoutController,
  signupController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.put("/update-profile", protectedRoute, updateProfileController);

router.get("/check-auth", protectedRoute, checkAuthController);

export default router;
