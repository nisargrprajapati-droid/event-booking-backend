import Booking from "../models/BookingModel.js";
import Notification from "../model/NotificationModel.js";

// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {
  try {

    const booking = new Booking(req.body);
    await booking.save();

    // populate event details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("eventId");

    // CREATE ADMIN NOTIFICATION
    await Notification.create({
      title: "New Ticket Booking",
      message: `${booking.name} booked ${booking.tickets} ticket(s)`,
      type: "booking"
    });

    res.status(201).json({
      success: true,
      message: "Ticket booked successfully",
      data: populatedBooking   // ✅ keep as data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ================= GET ALL BOOKINGS =================
export const getBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("eventId");

    res.status(200).json({
      success: true,
      data: bookings   // ✅ FIX: change bookings → data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};