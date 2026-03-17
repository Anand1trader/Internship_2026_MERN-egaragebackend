const Garage = require("../models/GarageModel");

// ➕ Add Garage
const addGarage = async (req, res) => {
  try {
    const garage = await Garage.create(req.body);
    res.status(201).json({ message: "Garage added ✅", data: garage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get All Garages
const getGarages = async (req, res) => {
  try {
    const data = await Garage.find().populate("owner");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete Garage
const deleteGarage = async (req, res) => {
  try {
    await Garage.findByIdAndDelete(req.params.id);
    res.json({ message: "Garage deleted ❌" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addGarage, getGarages, deleteGarage };