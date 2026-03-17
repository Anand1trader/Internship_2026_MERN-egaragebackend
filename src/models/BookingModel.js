const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  garage: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model("Booking", bookingSchema);const Booking = require("../models/BookingModel");
// ...existing code... // "Booking" → collection name: "bookings"