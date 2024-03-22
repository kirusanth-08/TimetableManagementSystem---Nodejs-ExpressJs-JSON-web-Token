const Booking = require("../models/booking");
const Timetable = require("../models/Timetable");
const Notification = require("../models/notification");
const Course = require("../models/course");
const notificationController = require("../controllers/notificationController");

const bookingController = {
  getTimetableEntry: async (req, res) => {
    try {
      const timetableEntry = await Timetable.findById(req.params.id).populate(
        "course booking"
      );
      res.json(timetableEntry);
    } catch (error) {
      res.status(500).json({ message: "Error getting timetable entry", error });
    }
  },

  addTimetableEntry: async (req, res) => {
    try {
      const { location, date, startTime, endTime, course } = req.body;

      const sameDayBookings = await Booking.find({
        location,
        date,
      });

      for (let sameDay of sameDayBookings) {
        if (
          (sameDay.startTime <= startTime && sameDay.endTime > startTime) ||
          (sameDay.startTime < endTime && sameDay.endTime >= endTime) ||
          (sameDay.startTime >= startTime && sameDay.endTime <= endTime) ||
          (sameDay.startTime <= startTime && sameDay.endTime >= endTime)
        ) {
          return res
            .status(409)
            .json("Already a booking found, Booking failed");
        }
      }

      
      const courseObj = await Course.findById(course);

      const notification = new Notification({
        title: "New timetable entry",
        content: `A timetable entry has been created for ${courseObj.name} on ${date} from ${startTime} to ${endTime}`,
        faculty: courseObj.faculty,
        year: courseObj.year,
        semester: courseObj.semester,
      });

      await notification.save();

      const booking = new Booking(req.body);
      await booking.save();

      // Create a new timetable entry with the booking's ID and the courseId
      const timetableEntry = new Timetable({
        booking: booking._id,
        course: course,
      });
      await timetableEntry.save();



      res.status(201).send({ booking });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  //update the time of an entry in the timetable
  updateTimetableTime: async (req, res) => {
    try {
      const {  date, startTime, endTime } = req.body;
      const bookingId = req.params.id; // Assuming the booking ID is passed as a URL parameter
      const course = await Timetable.findById(bookingId).populate("course");
      const { location } = await Booking.findById(bookingId);
  
      const sameDayBookings = await Booking.find({
        _id: { $ne: bookingId },
        location,
        date,
      });


      for (let sameDay of sameDayBookings) {
        if (
          (sameDay.startTime <= startTime && sameDay.endTime > startTime) ||
          (sameDay.startTime < endTime && sameDay.endTime >= endTime) ||
          (sameDay.startTime >= startTime && sameDay.endTime <= endTime) ||
          (sameDay.startTime <= startTime && sameDay.endTime >= endTime)
        ) {
          return res
            .status(409)
            .json("Already a booking found, Booking failed");
        }
      }

      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { date, startTime, endTime },
        { new: true, runValidators: true }
      );
      if (!booking) {
        return res.status(404).send("Booking not found");
      }

// Update the timetable entry with the new courseId
// const timetableEntry = await Timetable.findOneAndUpdate(
//   { booking: booking._id },
//   { course: course },
//   { new: true, runValidators: true }
// );

// if (!timetableEntry) {
//   return res.status(404).send();
// }
      const courseObj = await Course.findById(course);
      
      const notification = new Notification({
        title: "Timetable updated",
        content: `Time for ${courseObj.name} is changed to ${date}, ${startTime} - ${endTime}`,
        faculty: courseObj.faculty,
        year: courseObj.year,
        semester: courseObj.semester,
      });

      await notification.save();

      res.send({ booking });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  
  
  //update the location of an entry in the timetable
 updateLocation: async (req, res) => {
  try {
    const { location } = req.body;
    const bookingId = req.params.id; // Assuming the timetable ID is passed as a URL parameter

    const course = await Timetable.findById(bookingId).populate("course");

    const { date, startTime, endTime } = await Booking.findById(bookingId);

    
    const sameDayBookings = await Booking.find({
      _id: { $ne: bookingId },
      location,
      date,
    });

    for (let sameDay of sameDayBookings) {
      if (
        (sameDay.startTime <= startTime && sameDay.endTime > startTime) ||
        (sameDay.startTime < endTime && sameDay.endTime >= endTime) ||
        (sameDay.startTime >= startTime && sameDay.endTime <= endTime) ||
        (sameDay.startTime <= startTime && sameDay.endTime >= endTime)
      ) {
        return res
          .status(409)
          .json("Already a booking found, Booking failed");
      }
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { location },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).send();
    }


    const courseObj = await Course.findById(course);
      
    const notification = new Notification({
      title: `Location changed for ${courseObj.name}`,
      content: `Location for ${courseObj.name} is changed to ${location}`,
      faculty: courseObj.faculty,
      year: courseObj.year,
      semester: courseObj.semester,
    });

    await notification.save();

    res.send({ booking });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
},

  deleteBooking: async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      await Timetable.findOneAndDelete({ booking: req.params.id });
      res.json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting booking", error });
    }
  },
};

module.exports = bookingController;
