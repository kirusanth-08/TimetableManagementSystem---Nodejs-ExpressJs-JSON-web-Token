const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  bookingType: {
    type: String,
    enum: ["event", "course"],
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
