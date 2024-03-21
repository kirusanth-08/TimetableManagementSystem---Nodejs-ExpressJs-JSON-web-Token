const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timeTableController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authzMiddleware");

// Create a new timetable entry
router.get('/api/timetable/:faculty/:year/:semester', timetableController.getTimetable);

module.exports = router;