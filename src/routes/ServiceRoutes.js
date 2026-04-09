const router = require("express").Router();
const serviceController = require("../controllers/ServiceController");
const upload = require("../middleware/UploadMiddleware");
const validateToken = require("../middleware/AuthMiddleware");

// ✅ PUBLIC (sab dekh sakte hai)
router.get("/services", serviceController.getAllServices);

// 🔒 PROTECTED (sirf logged in)
router.post("/services", validateToken, upload.single("image"), serviceController.createService);
router.put("/services/:id", validateToken, upload.single("image"), serviceController.updateService);
router.delete("/services/:id", validateToken, serviceController.deleteService);

module.exports = router;