import express from "express";
import multer from "multer";
import { updateEvent } from "../controller/EventController.js";

import {
  createEvent,
  getEvents,
  getByCategory,
  getSingle,
  deleteEvent,
  updateAdminPrice,
  updateUserPrice,
  toggleEventStatus
  
} from "../controller/EventController.js";

const router = express.Router();

/* ================= MULTER STORAGE ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ================= EVENT ROUTES ================= */

// CREATE EVENT
router.post("/", upload.single("image"), createEvent);

// GET ALL EVENTS
router.get("/", getEvents);

// GET EVENTS BY CATEGORY
router.get("/category/:category", getByCategory);

//update event 
router.put("/:id", upload.single("image"), updateEvent);
// ✅ STATUS CONTROL (PUT THIS BEFORE /:id)
router.put("/status/:id", toggleEventStatus);
router.put("/admin-price/:id", updateAdminPrice);
router.put("/user-price/:id", updateUserPrice);


// DELETE EVENT
router.delete("/:id", deleteEvent);

// GET SINGLE EVENT
router.get("/:id", getSingle);

export default router;