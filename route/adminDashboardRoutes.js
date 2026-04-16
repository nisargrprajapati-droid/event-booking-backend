import express from "express";
import { getDashboardStats } from "../controller/DashboardController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);

export default router;