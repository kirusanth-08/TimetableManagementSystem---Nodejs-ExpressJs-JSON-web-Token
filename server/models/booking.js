const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  bookingType: {
    type: String,
    enum: ["event", "course"],
    // required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
