const Timetable = require("../models/Timetable");
const Course = require("../models/course");
const bookingController = require("./bookingController");

// Get timetable entry by id
const getTimetable = async (req, res) => {
  try {
    const { faculty, year, semester } = req.params;
    const courses = await Course.find({ faculty, year, semester });

    // If no courses are found, send a 404 response
    if (!courses.length) {
      return res.status(404).send("No courses found");
    }

    // Extract the courseIds from the courses
    const courseIds = courses.map((course) => course._id);

    // Find all timetable entries where the courseId matches one of the courseIds
    const timetable = await Timetable.find({ course: { $in: courseIds } })
  .populate('course', 'name faculty year semester -_id') // Replace 'course' with the actual Course document and only include the 'name' field
  .populate({
    path: 'booking', // Replace 'booking' with the actual Booking document
    select: 'location date startTime endTime -_id', // Include the 'location', 'date', 'startTime', and 'endTime' fields
    populate: {
      path: 'location', // Replace 'location' with the actual Location document
      select: 'name -_id' // Only include the 'name' field
    }
  });


    if (!timetable) {
      return res.status(404).send("No timetable available");
    }
    res.send(timetable);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getTimetable,
};
