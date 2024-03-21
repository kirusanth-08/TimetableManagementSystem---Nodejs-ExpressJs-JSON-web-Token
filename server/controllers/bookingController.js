const Booking = require("../models/booking");

const bookingController = {
  createBooking: async (location, date, startTime, endTime, type) => {
    // Check for overlapping bookings
    const overlap = await Booking.findOne({
      location,
      date,
      $or: [
        { startTime: { $gte: startTime, $lt: endTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (overlap) {
      return res.status(409).json("Already a booking found, Booking failed");
    }

    // Create a new booking
    const newBooking = new Booking({
      location,
      date,
      startTime,
      endTime,
      type,
    });
    await newBooking.save();
    return res.status(200).json("Booking scheduled successfully.");
  },

  getBookings: async (res) => {
    try {
      const bookings = await Booking.find();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings", error });
    }
  },

  getBooking: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Error fetching booking", error });
    }
  },

  updateBooking: async (id, location, date, startTime, endTime, type) => {
    // Check for overlapping bookings
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const overlap = await Booking.findOne({
      location,
      date,
      $or: [
        { startTime: { $gte: startTime, $lt: endTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (overlap) {
      return res.status(409).json("Already a booking found, update failed");
    }

    // Create a new booking
    booking.findByIdAndUpdate(id, {  location, date, startTime, endTime, type});
    return res.status(200).json("Booking updated successfully.");
  },

  deleteBooking: async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json({ message: "Booking deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting booking", error });
    }
  },
};

module.exports = bookingController;
