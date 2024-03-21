const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/api/booking/:id', bookingController.getTimetableEntry);
router.post('/api/booking', bookingController.addTimetableEntry);
router.put('/api/booking/timechange/:id', bookingController.updateTimetableTime);
router.put('/api/booking/locationChange/:id', bookingController.updateLocation);
router.delete('/api/booking/:id', bookingController.deleteBooking);

module.exports = router;