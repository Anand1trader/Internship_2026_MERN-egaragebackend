const router = require("express").Router();
const adminController = require("../controllers/AdminController");
const validateToken = require("../middleware/AuthMiddleware");

router.get("/stats", validateToken, adminController.getDashboardStats);

module.exports = router;