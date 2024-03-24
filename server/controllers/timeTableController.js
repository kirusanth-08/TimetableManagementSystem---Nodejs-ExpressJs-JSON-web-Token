const Timetable = require("../models/Timetable");
const Course = require("../models/course");
const User = require("../models/User");

// Get timetable entry by faculty, year, semester
const getTimetable = async (req, res) => {
  try {
    const { faculty, year, semester } = req.params;
    const courses = await Course.find({ faculty, year, semester });

    if (!courses.length) {
      return res.status(404).send("No courses found");
    }

    // Extract the courseIds from the courses
    const courseIds = courses.map((course) => course._id);

    // Find all timetable entries where the courseId matches one of the courseIds
    const timetable = await Timetable.find({ course: { $in: courseIds } })
      .populate("course", "name faculty year semester -_id")
      .populate({
        path: "booking",
        select: "location date startTime endTime -_id",
        populate: {
          path: "location",
          select: "code -_id",
        },
      });

    if (!timetable) {
      return res.status(404).send("No timetable available");
    }
    res.send(timetable);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get timetable entry for a student
const getStudentTimetable = async (req, res) => {
  try {
    const student = req.user._id;
    const user = await User.findById(student);
    const courses = await Course.find({
      faculty: user.faculty,
      year: user.year,
      semester: user.semester,
    });

    // If no courses are found, send a 404 response
    if (!courses.length) {
      return res.status(404).send("No courses found");
    }

    // Extract the courseIds from the courses
    const courseIds = courses.map((course) => course._id);

    // Find all timetable entries where the courseId matches one of the courseIds
    const timetable = await Timetable.find({ course: { $in: courseIds } })
      .populate("course", "name faculty year semester -_id")
      .populate({
        path: "booking",
        select: "location date startTime endTime -_id",
        populate: {
          path: "location",
          select: "code -_id",
        },
      });

    if (!timetable) {
      return res.status(404).send("No timetable available");
    }
    res.send(timetable);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTimetableForStudent = async (req, res) => {
  try {
    const { faculty, year, semester } = req.params;
    const course = await Course.find({ faculty, year, semester });
    const courseIds = course.map((course) => course._id);

    const table = await Timetable.find({ course: { $in: courseIds } }).populate(
      "booking"
    );

    const sortedTable = table.sort((a, b) => {
      const dateA = new Date(a.booking.date);
      const dateB = new Date(b.booking.date);
      const startTimeA = parseFloat(a.booking.startTime);
      const startTimeB = parseFloat(b.booking.startTime);

      // If the dates are different, sort by date
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA - dateB;
      }
      // If the dates are the same, sort by start time
      else {
        return startTimeA - startTimeB;
      }
    });

    const result = sortedTable.map((entry) => {
      return {
        date: entry.booking.date,
        details: {
          course: entry.course,
          location: entry.booking.location,
          startTime: entry.booking.startTime,
          endTime: entry.booking.endTime,
        },
      };
    });

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getTimetable,
  getStudentTimetable,
  getTimetableForStudent,
};
