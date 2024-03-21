const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/authzMiddleware');

// Create a new room
router.post('/api/room', authenticate, authorize('admin'), roomController.createRoom);

// Get all rooms
router.get('/api/room', authenticate, authorize('admin'), roomController.getRooms);

// Get room by id
router.get('/api/room/:id', authenticate, authorize('admin'), roomController.getRoom);

// Update a room
router.put('/api/room/:id', authenticate, authorize('admin'), roomController.updateRoom);

// Delete a room
router.delete('/api/room/:id', authenticate, authorize('admin'), roomController.deleteRoom);

module.exports = router;