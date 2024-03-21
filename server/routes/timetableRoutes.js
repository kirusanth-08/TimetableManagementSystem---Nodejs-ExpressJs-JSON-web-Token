// const express = require("express");
// const router = express.Router();
// const timetableController = require("../controllers/timeTableController");
// const authenticate = require("../middleware/authMiddleware");
// const authorize = require("../middleware/authzMiddleware");

// // Create a new timetable entry
// router.post('/api/timetable', timetableController.createEntry);

// // router.post("/api/timetable", authenticate, authorize('admin', 'faculty'), timetableController.createEntry);

// // Get all timetable entries
// router.get("/api/timetable", authenticate , timetableController.getEntries);

// // Get timetable entry by id
// router.get("/api/timetable/:id", authenticate, authorize('admin'), timetableController.getEntry);

// // Update a timetable entry
// router.put("/api/timetable/:id", authenticate, authorize('admin'), timetableController.updateEntry);

// // Delete a timetable entry
// router.delete("/api/timetable/:id", authenticate, authorize('admin'), timetableController.deleteEntry);

// module.exports = router;