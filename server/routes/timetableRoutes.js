const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timeTableController");
const authenticate = require("../middleware/authMiddleware");

// get the timetable for specific faculty, year, and semester
router.get('/api/timetable/:faculty/:year/:semester', authenticate, timetableController.getTimetable);

module.exports = router;