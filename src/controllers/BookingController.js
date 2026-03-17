const Booking = require("../models/BookingModel");

const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json({ message: "Booking created", data: booking });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings: async (req, res) => {
        try {
            const bookings = await Booking.find();
            res.json(bookings);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateBooking: async (req, res) => {
        try {
            const updatedBooking = await Booking.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json({ message: "Booking updated", data: updatedBooking });
        } catch (err) {
            res.status(500).json({ message: "Update error", error: err.message });
        }
    },
    deleteBooking: async (req, res) => {
        try {
            await Booking.findByIdAndDelete(req.params.id);
            res.json({ message: "Booking deleted" });
        } catch (err) {
            res.status(500).json({ message: "Delete error", error: err.message });
        }
    },
};