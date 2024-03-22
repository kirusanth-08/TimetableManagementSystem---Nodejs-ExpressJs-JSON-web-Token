const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticate = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const authorize = require('../middleware/authzMiddleware');

// Route for creating a notification
router.get('/notifications/:id', authenticate, verifyUser, notificationController.getNotification);

// Route for deleting a notification
router.delete('/notifications/:id', authenticate, authorize("admin", "faculty"), notificationController.createNotification);


module.exports = router;