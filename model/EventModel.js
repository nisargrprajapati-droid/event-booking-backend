import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  // ✅ ADMIN PRICE
  adminPrice: {
    type: Number,
    required: true
  },

  // ✅ USER FINAL PRICE
  userPrice: {
    type: Number
  },

  // ✅ FLAG (VERY IMPORTANT)
  isUserPriceManual: {
    type: Boolean,
    default: false
  },

  image: {
    type: String
  },

  category: {
    type: String,
    required: true
  },

  date: {
    type: String
  },

  time: {
    type: String
  },

   // ✅ NEW FIELD (ADMIN CONTROL)
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
  
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

export default Event;