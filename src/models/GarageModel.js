const mongoose = require("mongoose");

const garageSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  phone: String,
  services: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Garage", garageSchema);