const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id },
      "secretkey", // ⚠️ later .env me shift karna
      { expiresIn: "1d" }
    );

    // 4. Send response
    res.status(200).json({
      message: "Login successful ✅",
      token,
      user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Login error",
      error: err.message
    });
  }
};

// ✅ REGISTER USER
const registerUser = async (req, res) => {
  try {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 2. Save user
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