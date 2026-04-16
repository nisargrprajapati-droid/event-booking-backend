import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    tickets: {
      type: Number,
      required: true,
      min: 1,
    },
    seats: {
    type: [String],   // ✅ FIXED
    required: true
  },
    totalPrice: {
      type: Number,
      required: true,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;