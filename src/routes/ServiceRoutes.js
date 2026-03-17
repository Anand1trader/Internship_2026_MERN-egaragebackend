const router = require("express").Router();
const serviceController = require("../controllers/ServiceController");

// CRUD routes
router.post("/", serviceController.createService);
router.get("/", serviceController.getAllServices);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;