const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/authzMiddleware');

// Create a new course
router.post('/api/courses', authenticate, authorize(['admin']), courseController.createCourse);

// Get all courses
router.get('/api/courses/faculty/:faculty', courseController.getFacultyCourses);

// Get course by course code
router.get('/api/courses/:code', courseController.getCourse);

// Update a course by course code
router.put('/api/courses/:code', authenticate, authorize(['admin']), courseController.updateCourse);

// Delete a course
router.delete('/api/courses/:code', authenticate, authorize(['admin']), courseController.deleteCourse);

module.exports = router;
