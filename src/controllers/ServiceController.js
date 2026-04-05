const Service = require("../models/ServiceModel");

// ✅ FIXED IMPORT (NO {})
const uploadToCloudinary = require("../utils/CloudinaryUtil");

// ✅ CREATE SERVICE
const createService = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let imageUrl = "";

    // ✅ IMAGE UPLOAD
    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary(req.file.path);
      imageUrl = cloudinaryResponse.secure_url;
    }

    // ✅ CREATE SERVICE
    const service = await Service.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      duration: req.body.duration,
      discount: Number(req.body.discount) || 0,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Service created ✅",
      data: service,
    });

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({
      message: "Error creating service ❌",
      error: err.message,
    });
  }
};

// ✅ GET ALL SERVICES
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({
      message: "Error fetching services ❌",
      error: err.message,
    });
  }
};

// ✅ UPDATE SERVICE
const updateService = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // ✅ NEW IMAGE UPLOAD
    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary(req.file.path);
      updateData.image = cloudinaryResponse.secure_url;
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Service updated ✅",
      data: updated,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      message: "Error updating service ❌",
      error: err.message,
    });
  }
};

// ✅ DELETE SERVICE
const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Service deleted ✅",
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      message: "Error deleting service ❌",
      error: err.message,
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};