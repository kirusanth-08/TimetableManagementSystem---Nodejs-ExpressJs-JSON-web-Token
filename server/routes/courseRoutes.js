const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/authzMiddleware');

// Create a new course
router.post('/api/courses', authenticate, authorize(['admin']), courseController.createCourse);

// Get all courses
router.get('/api/courses/faculty/:faculty', courseController.getFacultyCourses);

// Get course by id
router.get('/api/courses/:id', courseController.getCourse);

// Update a course
router.put('/api/courses/:id', authenticate, authorize(['admin']), courseController.updateCourse);

// Delete a course
router.delete('/api/courses/:id', authenticate, authorize(['admin']), courseController.deleteCourse);

module.exports = router;
