const User = require("../models/UserModel");
const Garage = require("../models/GarageModel");
const Booking = require("../models/BookingModel");
const Service = require("../models/ServiceModel");

const getDashboardStats = async (req, res) => {
  try {

    const users = await User.countDocuments();
    const garages = await Garage.countDocuments();
    const bookings = await Booking.countDocuments();
    const services = await Service.countDocuments();

    // revenue calculate
    const bookingData = await Booking.find();

    let revenue = 0;

    bookingData.forEach((b) => {
      revenue += b.price || 0;
    });

    res.status(200).json({
      users,
      garages,
      bookings,
      services,
      revenue,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};