const router = require("express").Router();
const serviceController = require("../controllers/ServiceController");
const upload = require("../middleware/UploadMiddleware");
const testMiddleware = require("../middleware/TestMiddleware");
// CRUD routes

router.get("/services", testMiddleware, serviceController.getAllServices);
router.post("/service", upload.single("image"), serviceController.createService);
router.put("/services/:id", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);
router.post("/", serviceController.createService);
router.get("/", serviceController.getAllServices);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;