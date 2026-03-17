const Payment = require("../models/PaymentModel");

// ➕ Add Payment
const addPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ message: "Payment done 💰", data: payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get Payments
const getPayments = async (req, res) => {
  try {
    const data = await Payment.find().populate({
      path: "booking",
      populate: ["user", "garage"]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addPayment, getPayments };