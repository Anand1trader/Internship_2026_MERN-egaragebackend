const router = require("express").Router();
const paymentController = require("../controllers/PaymentController");

router.post("/", paymentController.addPayment);
router.get("/", paymentController.getPayments);

module.exports = router;