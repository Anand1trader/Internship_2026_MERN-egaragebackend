const router = require("express").Router();
const serviceController = require("../controllers/ServiceController");
const upload = require("../middleware/UploadMiddleware");

// CLEAN ROUTES
router.get("/services", serviceController.getAllServices);
router.post("/services", upload.single("image"), serviceController.createService);
router.put("/services/:id", upload.single("image"), serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

module.exports = router;