const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/returnUserMiddleware');
const authorize = require('../middleware/authzMiddleware');

// Create a new user
router.post('/api/users', authenticate, authorize('admin'), userController.createUser);

// Get all users
router.get('/api/users', authenticate, authorize('admin', 'faculty'), userController.getUsers);

// Get all users facultywise
router.get('/api/users/faculty/:faculty', authenticate, authorize('admin', 'faculty'), userController.getUsersFacultywise);

// Get user by id
router.get('/api/users', authenticate, verifyUser, userController.getUser);

// Update a user
router.put('/api/users', authenticate, verifyUser, userController.updateUser);

// Delete a user
router.delete('/api/users/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;