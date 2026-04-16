import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./route/UserRoute.js";
import galleryRouters from "./route/galleryRoutes.js";
import adminRoutes from "./route/adminRoutes.js";
import adminDashboardRoutes from "./route/adminDashboardRoutes.js";
import adminAnalyticsRoutes from "./route/adminAnalyticsRoutes.js";
import notificationRoutes from "./route/NotificationRoutes.js";

import eventRoutes from "./route/EventRoutes.js";
import bookingRoutes from "./route/bookingRoutes.js";
import categoryRoutes from "./route/categoryRoutes.js";
import contactRoutes from "./route/contactRoutes.js";

import { dbConnection } from "./dbConnection.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// STATIC FOLDER
app.use("/upload", express.static("upload"));

// DATABASE
dbConnection();

// ROUTES
app.use("/api/user", userRouter);
app.use("/api/gallery", galleryRouters);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminDashboardRoutes);   // ✅ dashboard route
app.use("/api/admin", adminAnalyticsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/notifications", notificationRoutes);


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});