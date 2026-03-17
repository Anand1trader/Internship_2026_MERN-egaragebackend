const router = require("express").Router();
const garageController = require("../controllers/GarageController");

router.post("/", garageController.addGarage);
router.get("/", garageController.getGarages);

module.exports = router;