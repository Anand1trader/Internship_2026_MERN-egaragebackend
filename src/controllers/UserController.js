const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSend = require("../utils/MailUtil");

// ✅ LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }
    console.log("🚀 Login success, sending email to:", user.email);

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    // 🔥 4. SEND EMAIL (LOGIN ALERT)
    mailSend(
      user.email,
      "🚨 New Login Alert - eGarage",
      `
      <div style="font-family: Arial; padding:20px;">
        <h2 style="color:#2563eb;">eGarage Login Alert</h2>
        <p>Hello <b>${user.name}</b>,</p>
        <p>Your account was successfully logged in.</p>

        <table style="margin-top:10px;">
          <tr><td><b>Time:</b></td><td>${new Date().toLocaleString()}</td></tr>
          <tr><td><b>Device:</b></td><td>Web Browser</td></tr>
        </table>

        <p style="margin-top:15px;">
          If this wasn't you, please reset your password immediately.
        </p>

        <hr/>
        <p style="font-size:12px; color:gray;">
          © 2026 eGarage. All rights reserved.
        </p>
      </div>
      `
    );

    // 5. Send response
    res.status(200).json({
      message: "Login success",
      token: token, // ✅ FIX (dummy-token hata diya)
      role: user.role,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Login error",
      error: err.message
    });
  }
};

// ✅ REGISTER USER (same)
const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const savedUser = await User.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully ✅",
      data: savedUser
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error while registering user",
      error: err.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};