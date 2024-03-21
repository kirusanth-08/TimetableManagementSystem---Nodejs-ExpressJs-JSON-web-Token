const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/api/booking/:id', bookingController.getTimetableEntry);
router.post('/api/booking', bookingController.addTimetableEntry);
router.delete('/api/booking/:id', bookingController.deleteBooking);

module.exports = router;