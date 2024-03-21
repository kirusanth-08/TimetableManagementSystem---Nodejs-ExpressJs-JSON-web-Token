const Enrollment = require("../models/enrollment");

const enrollmentController = {
  enrollCourse: async (req, res) => {
    try {
      // Check if the user is already enrolled in the course
      const existingEnrollment = await Enrollment.findOne({
        course: req.body.course,
        student: req.user.id,
      });
      if (existingEnrollment) {
        return res
          .status(400)
          .json({ message: "You are already enrolled in this course" });
      }

      // Create a new enrollment
      const enrollment = new Enrollment({
        course: req.body.course,
        student: req.user.id,
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
        course: req.body.courseId,
      }).populate("course student");
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching enrollments", error });
    }
  },

  updateEnrollment: async (req, res) => {
    try {
      const enrollment = await Enrollment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Error updating enrollment", error });
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
