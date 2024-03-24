const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  semester: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  faculty: {
    type: String,
    enum: ["IT", "Eng"],
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
