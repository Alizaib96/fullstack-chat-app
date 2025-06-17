import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  getUserForSidebarController,
  getMessagesController,
  sendMessageController,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectedRoute, getUserForSidebarController);
router.get("/:id", protectedRoute, getMessagesController);
router.post("/send/:id", protectedRoute, sendMessageController);
export default router;
