const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  amount: Number,
  status: { type: String, default: "pending" },
  method: String
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);