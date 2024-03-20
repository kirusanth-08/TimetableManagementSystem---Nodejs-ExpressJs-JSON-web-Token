const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  faculty: {
    type: String,
    enum: ['IT', 'Eng'],
    required: true
  }
});

module.exports = mongoose.model('Course', courseSchema);
