const router = require("express").Router();

const {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  getUserDashboard
} = require("../controllers/UserController");

const validateToken = require("../middleware/AuthMiddleware");

// ✅ AUTH ROUTES
router.post("/login", loginUser);
router.post("/register", registerUser);

// ✅ PASSWORD ROUTES
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ DASHBOARD ROUTE (NEW)
router.get("/dashboard", validateToken, getUserDashboard);

module.exports = router;