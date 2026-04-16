import User from "../model/UserModel.js";
import Event from "../model/EventModel.js";
import Booking from "../model/Booking.js";
import Contact from "../model/ContactModel.js";

export const getDashboardStats = async (req, res) => {
  try {

    const users = await User.countDocuments();
    const events = await Event.countDocuments();
    const bookings = await Booking.countDocuments();
    const contacts = await Contact.countDocuments();

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      users,
      events,
      bookings,
      contacts,
      recentBookings,
      recentContacts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};