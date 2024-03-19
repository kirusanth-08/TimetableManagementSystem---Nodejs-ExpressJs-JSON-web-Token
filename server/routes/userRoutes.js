const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/api/users', userController.createUser);

// Get all users
router.get('/api/users', userController.getUsers);

// Get user by id
router.get('/api/users/:id', userController.getUser);

// Update a user
router.put('/api/users/:id', userController.updateUser);

// Delete a user
router.delete('/api/users/:id', userController.deleteUser);

module.exports = router;