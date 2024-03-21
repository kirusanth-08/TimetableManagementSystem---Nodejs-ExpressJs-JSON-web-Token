const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/authzMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Create a new enrollment
router.post('/api/enrollment', authenticate, verifyUser, enrollmentController.enrollCourse);

// Get all enrollments
router.post('/api/enrollment/:', authenticate, authorize('admin'), enrollmentController.getEnrolledStudents);

// Get enrollment by id
router.get('/api/enrollment/:id', authenticate, enrollmentController.getEnrolledCourses);

// Update an enrollment
router.put('/api/enrollment/:id', authenticate, authorize('admin'), enrollmentController.updateEnrollment);

// Delete an enrollment
router.delete('/api/enrollment/:id', authenticate, authorize('admin'), enrollmentController.deleteEnrollment);

module.exports = router;