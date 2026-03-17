const Service = require("../models/ServiceModel");

// ✅ CREATE (agar chaho future me add karna ho)
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ message: "Service created ✅", data: service });
  } catch (err) {
    res.status(500).json({ message: "Error creating service ❌", error: err.message });
  }
};

// ✅ READ (ALL)
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services ❌", error: err.message });
  }
};

// ✅ UPDATE
const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Service updated ✅", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update error ❌", error: err.message });
  }
};

// ✅ DELETE
const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted ❌" });
  } catch (err) {
    res.status(500).json({ message: "Delete error ❌", error: err.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService
};