const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  period: {
    date: Date,
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  subject: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Timetable', timetableSchema);
