const User = require("../models/UserModel");
const Booking = require("../models/BookingModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/MailUtil");
const crypto = require("crypto");

// ✅ REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ❌",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully ✅",
      data: newUser,
    });

  } catch (err) {
    res.status(500).json({
      message: "Register error ❌",
      error: err.message,
    });
  }
};

// ✅ LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      "secretkey",
      { expiresIn: "1d" }
    );

    // 🔥 LOGIN ALERT EMAIL
    try {
      await sendEmail(
        user.email,
        "🚨 Login Alert - eGarage",
        `
        <h2>Login Alert</h2>
        <p>Hello ${user.name},</p>
        <p>Your account was logged in.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
        `
      );
    } catch (err) {
      console.log("Mail failed:", err.message);
    }

    res.status(200).json({
      message: "Login success ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: "Login error ❌",
      error: err.message,
    });
  }
};

// ✅ FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found ❌",
      });
    }

    // 🔥 generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // 🔥 SEND EMAIL
    await sendEmail(
      user.email,
      "🔑 Reset Password",
      `
      <h2>Password Reset</h2>
      <p>Click link below:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>Valid for 10 minutes</p>
      `
    );

    res.json({
      message: "Reset link sent to email ✅",
    });

  } catch (err) {
    res.status(500).json({
      message: "Error ❌",
      error: err.message,
    });
  }
};

// ✅ RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token ❌",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({
      message: "Password reset successful ✅",
    });

  } catch (err) {
    res.status(500).json({
      message: "Error ❌",
      error: err.message,
    });
  }
};

// ✅ DASHBOARD (NEW ADD)
const getUserDashboard = async (req, res) => {
  try {
    console.log("USER:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User not found in token ❌",
      });
    }

    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const activeServices = bookings.filter(b => b.status === "Pending").length;
    const completedServices = bookings.filter(b => b.status === "Completed").length;

    res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
      bookings,
      stats: {
        totalBookings,
        activeServices,
        completedServices
      }
    });

  } catch (err) {
    console.error("Dashboard ERROR:", err.message);
    res.status(500).json({
      message: "Dashboard error ❌",
      error: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserDashboard
};