const Course = require("../models/course");

const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send({ course });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getFacultyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ faculty: req.params.faculty });
    res.send(courses);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code });
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.send(course);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.send(course);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ code: req.params.code });
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.send(course);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCourse,
  getFacultyCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
