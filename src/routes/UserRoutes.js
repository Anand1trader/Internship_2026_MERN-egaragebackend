const router = require("express").Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserDashboard,
} = require("../controllers/UserController");

const validateToken = require("../middleware/AuthMiddleware");

// ✅ REGISTER
router.post("/register", registerUser);

// ✅ LOGIN
router.post("/login", loginUser);

// ✅ FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);

// ✅ RESET PASSWORD
router.post("/reset-password/:token", resetPassword);

// ✅ USER DASHBOARD
router.get("/dashboard", validateToken, getUserDashboard);

module.exports = router;