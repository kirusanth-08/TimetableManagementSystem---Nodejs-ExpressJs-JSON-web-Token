const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timeTableController");

// Create a new timetable entry
router.post("/api/timetable", timetableController.createEntry);

// Get all timetable entries
router.get("/api/timetable", timetableController.getEntries);

// Get timetable entry by id
router.get("/api/timetable/:id", timetableController.getEntry);

// Update a timetable entry
router.put("/api/timetable/:id", timetableController.updateEntry);

// Delete a timetable entry
router.delete("/api/timetable/:id", timetableController.deleteEntry);

module.exports = router;
