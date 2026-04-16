import express from "express";
import Booking from "../model/Booking.js";

const router = express.Router();

/* ================= CREATE BOOKING ================= */

router.post("/", async (req, res) => {
  try {

    const { name, email, phone, tickets, seats, totalPrice, eventId } = req.body;

    if (!name || !email || !phone || !eventId) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const booking = new Booking({
      name,
      email,
      phone,
      tickets,
      seats,
      totalPrice,
      eventId
    });

    await booking.save();

    const populatedBooking = await booking.populate("eventId");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: populatedBooking
    });

  } catch (err) {

    console.log("CREATE BOOKING ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});


/* ================= GET ALL BOOKINGS ================= */

router.get("/", async (req, res) => {
  try {

    const bookings = await Booking
      .find()
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings
    });

  } catch (err) {

    console.log("GET BOOKINGS ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});


/* ================= GET BOOKED SEATS ================= */

router.get("/seats/:eventId", async (req, res) => {
  try {

    const bookings = await Booking.find({
      eventId: req.params.eventId
    });

    const bookedSeats = bookings.flatMap(b => b.seats);

    res.json({
      success: true,
      seats: bookedSeats
    });

  } catch (err) {

    console.log("GET SEATS ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});


/* ================= DELETE BOOKING ================= */

router.delete("/:id", async (req, res) => {
  try {

    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully"
    });

  } catch (err) {

    console.log("DELETE BOOKING ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

export default router;