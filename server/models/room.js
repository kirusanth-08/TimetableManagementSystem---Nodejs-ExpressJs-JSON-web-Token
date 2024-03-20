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
  availabilitySchedule: [
    {
      day: {
        type: String,
        required: true
      },
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      }
    }
  ],
  details: {
    type: String
  }
});

module.exports = mongoose.model('Room', RoomSchema);