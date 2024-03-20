const Enrollment = require('../models/enrollment');

const enrollmentController = {
  createEnrollment: async (req, res) => {
    try {
      const enrollment = new Enrollment(req.body);
      await enrollment.save();
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating enrollment', error });
    }
  },

  getEnrollments: async (req, res) => {
    try {
      const enrollments = await Enrollment.find().populate('course student');
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching enrollments', error });
    }
  },

  getEnrollment: async (req, res) => {
    try {
      const enrollment = await Enrollment.findById(req.params.id).populate('course student');
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching enrollment', error });
    }
  },

  updateEnrollment: async (req, res) => {
    try {
      const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: 'Error updating enrollment', error });
    }
  },

  deleteEnrollment: async (req, res) => {
    try {
      await Enrollment.findByIdAndDelete(req.params.id);
      res.json({ message: 'Enrollment deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting enrollment', error });
    }
  }
};

module.exports = enrollmentController;