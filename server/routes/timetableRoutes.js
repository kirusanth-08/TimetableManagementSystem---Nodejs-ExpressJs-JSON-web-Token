const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timeTableController");
const bookingController = require('../controllers/bookingController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/authzMiddleware');
const verifyUser = require('../middleware/returnUserMiddleware');

// get the timetable for specific faculty, year, and semester
router.get('/api/timetable/:faculty/:year/:semester', timetableController.getTimetable);

// get the timetable for specific student
router.get('/api/timetable/user', authenticate, verifyUser, timetableController.getStudentTimetable);

// get the designed/**************************************************************************** */
router.get('/api/timetableF/:faculty/:year/:semester', timetableController.getTimetableForStudent);

// Route for get single timetable entry details
router.get('/api/timetable/:id', bookingController.getTimetableEntry);

// Route for create a timetable for a course
router.post('/api/timetable', authenticate, authorize("admin", "faculty"), bookingController.addTimetableEntry);

// Route for update timetable entry time
router.put('/api/timetable/timechange/:id', authenticate, authorize("admin", "faculty"), bookingController.updateTimetableTime);

//Route for update timetable entry location
router.put('/api/timetable/locationChange/:id', authenticate, authorize("admin", "faculty"), bookingController.updateLocation);

// Route for delete a timetable entry
router.delete('/api/timetable/:id', authenticate, authorize("admin", "faculty"), bookingController.deleteBooking);

module.exports = router;