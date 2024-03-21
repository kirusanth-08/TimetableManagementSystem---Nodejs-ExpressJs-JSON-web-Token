const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  bookings: [
    {
      date: {
        type: Date,
        required: true
      },
      startTime: {
        type: Date, // Storing time as a Date object
        required: true
      },
      endTime: {
        type: Date, // Storing time as a Date object
        required: true
      }
    }
  ],
  details: {
    type: String
  }
});

module.exports = mongoose.model('Room', RoomSchema);