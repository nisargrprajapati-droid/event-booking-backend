import express from "express";
import Booking from "../model/Booking.js";

const router = express.Router();

router.get("/analytics", async (req, res) => {

  try {

    const bookings = await Booking.find().populate("eventId");

    const monthly = {};
    const eventStats = {};
    let revenue = 0;

    bookings.forEach((b) => {

      const month = new Date(b.createdAt).toLocaleString("default", { month: "short" });

      monthly[month] = (monthly[month] || 0) + 1;

      const event = b.eventId?.title || "Unknown";

      eventStats[event] = (eventStats[event] || 0) + b.tickets;

      revenue += b.totalPrice;

    });

    res.json({
      monthly,
      eventStats,
      revenue
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

export default router;