const Enrollment = require("../models/enrollment");
const User = require("../models/User");

const enrollmentController = {
  enrollCourse: async (req, res) => {
    try {
      const enroller = await User.findById(req.body.student);

      if (enroller.role !== "student") {
        return res.status(403).json({ message: "Enroller is not a student" });
      }

      const existingEnrollment = await Enrollment.findOne({
        course: req.body.course,
        student: req.body.student,
      });

      if (existingEnrollment) {
        return res
          .status(400)
          .json({ message: "You are already enrolled in this course" });
      }

      const enrollment = new Enrollment({
        course: req.body.course,
        student: req.body.student,
      });
      await enrollment.save();

      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Error enrolling course", error });
    }
  },

  getEnrolledCourses: async (req, res) => {
    try {
      const enrollments = await Enrollment.find({
        student: req.params.studentId,
      }).populate("course student");
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching enrollments", error });
    }
  },

  getEnrolledStudents: async (req, res) => {
    try {
      const enrollments = await Enrollment.find({
        course: req.params.courseId,
      }).populate("course student");
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching enrollments", error });
    }
  },

  deleteEnrollment: async (req, res) => {
    try {
      await Enrollment.findByIdAndDelete(req.params.id);
      res.json({ message: "Enrollment deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting enrollment", error });
    }
  },
};

module.exports = enrollmentController;
