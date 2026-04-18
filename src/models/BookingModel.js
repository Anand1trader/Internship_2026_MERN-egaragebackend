// models/BookingModel.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  garage: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);


