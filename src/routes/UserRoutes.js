const router = require("express").Router();

// 🔥 ALL CONTROLLERS IMPORT KARO
const {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword
} = require("../controllers/UserController");

// ✅ ROUTES
router.post("/login", loginUser);
router.post("/register", registerUser);

// 🔥 NEW ROUTES (FIXED)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;