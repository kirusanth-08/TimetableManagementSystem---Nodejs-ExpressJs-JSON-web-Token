const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticate = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/returnUserMiddleware');
const authorize = require('../middleware/authzMiddleware');

// get notifications for a user
router.get('/api/notifications', authenticate, verifyUser, notificationController.getNotification);

// Route for deleting a notification
router.delete('/api/notifications/:id', authenticate, authorize("admin", "faculty"), notificationController.createNotification);


module.exports = router;