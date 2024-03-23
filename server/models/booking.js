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
    type: String,
    required: true,
    set: v => parseFloat(v).toFixed(2)
  },
  endTime: {
    type: String,
    required: true,
    set: v => parseFloat(v).toFixed(2)
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
