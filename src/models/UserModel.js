// src/routes/AdminRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password hide
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

module.exports = router;