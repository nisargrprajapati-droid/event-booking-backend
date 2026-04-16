import express from "express";
import { adminLogin } from "../controller/adminController.js";
import { getDashboardStats } from "../controller/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/dashboard-stats", getDashboardStats);
export default router;