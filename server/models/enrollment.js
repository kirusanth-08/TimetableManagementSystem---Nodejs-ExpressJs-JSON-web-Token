const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateEnrolled: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);