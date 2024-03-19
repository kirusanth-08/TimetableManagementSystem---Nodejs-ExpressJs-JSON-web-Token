const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserFromToken } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/authorizationMiddleware');


// Create a new course
router.post('/api/courses', verifyToken, authorize(['admin']), courseController.createCourse);

// Get all courses
router.get('/api/courses', courseController.getCourses);

// Get course by id
router.get('/api/courses/:id', courseController.getCourse);

// Update a course
router.put('/api/courses/:id', verifyToken, authorize(['admin']), courseController.updateCourse);

// Delete a course
router.delete('/api/courses/:id', verifyToken, authorize(['admin']), courseController.deleteCourse);

module.exports = router;