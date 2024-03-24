const Booking = require("../models/booking");
const Timetable = require("../models/Timetable");
const Notification = require("../models/notification");
const Course = require("../models/course");
const Room = require("../models/room");

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

      let start = parseFloat(startTime);
      let end = parseFloat(endTime);

      if (end - start < 0) {
        return res
          .status(400)
          .json("End time cannot be earlier than start time");
      } else if (end - start > 5) {
        return res
          .status(400)
          .json("A timetable allocation can't' be more than 5 hours");
      } else if (start < 8 || start > 19 || end < 8 || end > 19) {
        return res
          .status(400)
          .json(
            "A timetable allocation can only be set between 8am and 7pm (choose between 9.00 to 19.00)"
          );
      } else if (end - start < 1) {
        return res
          .status(400)
          .json("A timetable allocation can't be less than 1 hour");
      } else if (start % 1 > 0.6 || end % 1 > 0.6) {
        return res.status(400).json("Invalid time");
      }

      for (let sameDay of sameDayBookings) {
        // Convert strings to numbers
        let sameDayStart = parseFloat(sameDay.startTime);
        let sameDayEnd = parseFloat(sameDay.endTime);

        if (
          (sameDayStart <= start && sameDayEnd > start) ||
          (sameDayStart < end && sameDayEnd >= end) ||
          (sameDayStart >= start && sameDayEnd <= end) ||
          (sameDayStart <= start && sameDayEnd >= end)
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
      const { date, startTime, endTime } = req.body;
      const bookingId = req.params.id;
      const { course } = await Timetable.findOne({ booking: bookingId });
      const { location } = await Booking.findById(bookingId);
      const sameDayBookings = await Booking.find({
        _id: { $ne: bookingId },
        location,
        date,
      });

      let start = parseFloat(startTime);
      let end = parseFloat(endTime);

      if (end - start < 0) {
        return res
          .status(400)
          .json("End time cannot be earlier than start time");
      } else if (end - start > 5) {
        return res
          .status(400)
          .json("A timetable allocation can't' be more than 5 hours");
      } else if (start < 8 || start > 19 || end < 8 || end > 19) {
        return res
          .status(400)
          .json(
            "A timetable allocation can only be set between 8am and 7pm (choose between 9.00 to 19.00)"
          );
      } else if (end - start < 1) {
        return res
          .status(400)
          .json("A timetable allocation can't be less than 1 hour");
      } else if (start % 1 > 0.6 || end % 1 > 0.6) {
        return res.status(400).json("Invalid time");
      }

      for (let sameDay of sameDayBookings) {
        // Convert strings to numbers
        let sameDayStart = parseFloat(sameDay.startTime);
        let sameDayEnd = parseFloat(sameDay.endTime);

        if (
          (sameDayStart <= start && sameDayEnd > start) ||
          (sameDayStart < end && sameDayEnd >= end) ||
          (sameDayStart >= start && sameDayEnd <= end) ||
          (sameDayStart <= start && sameDayEnd >= end)
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
      const courseObj = await Course.findById(course);
      console.log(course);
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
      const bookingId = req.params.id;

      const { course } = await Timetable.findOne({ booking: bookingId });

      const { date, startTime, endTime } = await Booking.findById(bookingId);
      const sameDayBookings = await Booking.find({
        _id: { $ne: bookingId },
        location,
        date,
      });

      let start = parseFloat(startTime);
      let end = parseFloat(endTime);

      for (let sameDay of sameDayBookings) {
        // Convert strings to numbers
        let sameDayStart = parseFloat(sameDay.startTime);
        let sameDayEnd = parseFloat(sameDay.endTime);

        if (
          (sameDayStart <= start && sameDayEnd > start) ||
          (sameDayStart < end && sameDayEnd >= end) ||
          (sameDayStart >= start && sameDayEnd <= end) ||
          (sameDayStart <= start && sameDayEnd >= end)
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
      const { code } = await Room.findById(location);

      const notification = new Notification({
        title: `Location changed for ${courseObj.name}`,
        content: `Location for ${courseObj.name} is changed to ${code}`,
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

      const course = Course.findById(booking.course);
      const courseObj = await Course.findById(course);

      const notification = new Notification({
        title: `Session cancelled for ${courseObj.name}`,
        content: `Session for ${courseObj.name} is cancelled!`,
        faculty: courseObj.faculty,
        year: courseObj.year,
        semester: courseObj.semester,
      });

      await notification.save();

      await Timetable.findOneAndDelete({ booking: req.params.id });
      res.json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting booking", error });
    }
  },
};

module.exports = bookingController;
