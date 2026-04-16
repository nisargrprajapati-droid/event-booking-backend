import express from "express";

import {
  getNotifications,
  markAsRead
} from "../controller/NotificationController.js";

const router = express.Router();

router.get("/", getNotifications);

router.put("/read/:id", markAsRead);

export default router;