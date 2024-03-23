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
          select: "name -_id",
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
      .populate("course", "name faculty year semester -_id") // Replace 'course' with the actual Course document and only include the 'name' field
      .populate({
        path: "booking", // Replace 'booking' with the actual Booking document
        select: "location date startTime endTime -_id", // Include the 'location', 'date', 'startTime', and 'endTime' fields
        populate: {
          path: "location", // Replace 'location' with the actual Location document
          select: "name -_id", // Only include the 'name' field
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

    const bookings = await Timetable.find({ course: { $in: courseIds } })
      .populate("course", "name faculty year semester -_id")
      .populate({
        path: "booking",
        select: "location date startTime endTime -_id",
        populate: {
          path: "location",
          select: "code -_id",
        },
      });

    // Sort bookings by date and then by startTime
    const sortedBookings = bookings.sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      if (dateComparison !== 0) {
        return dateComparison;
      } else {
        return parseFloat(a.startTime) - parseFloat(b.startTime);
      }
    });

    // console.log(sortedBookings);

    // const timetable = bookings.sort((a, b) => new Date(a.date) - new Date(b.date));

    // const timetable = sortedBookings.map(booking => {
    //   return {
    //     day: booking.date,
    //     couse: booking.course.name,
    //     startTime: booking.startTime,
    //     endTime: booking.endTime,
    //     location: booking.location.name
    //   }
    // });

    res.send(sortedBookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getTimetable,
  getStudentTimetable,
  getTimetableForStudent,
};
