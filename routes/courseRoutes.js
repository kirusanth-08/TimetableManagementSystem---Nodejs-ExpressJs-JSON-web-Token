const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Create a new course
router.post('/api/courses', courseController.createCourse);

// Get all courses
router.get('/api/courses', courseController.getCourses);

// Get course by id
router.get('/api/courses/:id', courseController.getCourse);

// Update a course
router.put('/api/courses/:id', courseController.updateCourse);

// Delete a course
router.delete('/api/courses/:id', courseController.deleteCourse);

module.exports = router;