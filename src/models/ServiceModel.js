const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String }, // e.g., "2 hours"
});

module.exports = mongoose.model("Service", serviceSchema);