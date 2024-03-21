const Booking = require("../models/booking");
const Timetable = require("../models/Timetable");

const bookingController = {

  getTimetableEntry: async (req, res) => {
    try {
      const timetableEntry = await Timetable.findById(req.params.id).populate('course booking');
      res.json(timetableEntry);
    } catch (error) {
      res.status(500).json({ message: 'Error getting timetable entry', error });
    }
  },


  addTimetableEntry: async (req, res) => {
    try {
      const { location, date, startTime, endTime, course, bookingType } = req.body;
      const sameDay = await Booking.findOne({
        location,
        date
      });


      if (sameDay) {
        if((sameDay.startTime <= startTime && sameDay.endTime >= startTime) || (sameDay.startTime <= endTime && sameDay.endTime >= endTime) || (sameDay.startTime >= startTime && sameDay.endTime <= endTime)){
          return res.status(409).json("Already a booking found, Booking failed");
        }
      }

      const booking = new Booking(req.body);
      await booking.save();

      
      // Create a new timetable entry with the booking's ID and the courseId
      const timetableEntry = new Timetable({ booking: booking._id, course: course });
      await timetableEntry.save();


      res.status(201).send({ booking });
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

      res.json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting booking", error });
    }
  },
};

module.exports = bookingController;
