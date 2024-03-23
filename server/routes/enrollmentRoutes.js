const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/authzMiddleware');

// Create a new enrollment
router.post('/api/enrollment', authenticate, authorize("admin"), enrollmentController.enrollCourse);

// Get all enrolled students of a course
router.get('/api/enrolledStudents/:id', authenticate, authorize('admin'), enrollmentController.getEnrolledStudents);

// Get all enrolled courses of a student
router.get('/api/enrolledCourses/:id', authenticate, enrollmentController.getEnrolledCourses);

// Delete an enrollment
router.delete('/api/enrollment/:id', authenticate, authorize('admin'), enrollmentController.deleteEnrollment);

module.exports = router;