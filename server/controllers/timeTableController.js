const Timetable = require("../models/timetable");

// Create a new timetable entry
const createEntry = async (req, res) => {
  try {
    // Find the room and add the booking
    const room = await Room.findOne({
      name: "Room for " + timetableEntry.name,
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if there is already a booking at the same time
    const existingBooking = await Room.findOne({
      "roomId": room._id,
      "bookings.date": req.body.date,
    });

    if (existingBooking) {
      // Loop through existing bookings to check for overlap
      const overlappingBooking = existingBooking.bookings.find((booking) => {
        return (
          (booking.startTime < req.body.endTime &&
            booking.endTime > req.body.startTime) ||
          (booking.startTime < req.body.endTime &&
            booking.endTime > req.body.startTime)
        );
      });

      if (overlappingBooking) {
        return res
          .status(400)
          .json({ message: "There is already a booking at this time" });
      }
    }
    // Create a new timetable entry
    const timetableEntry = new Timetable(req.body);
    await timetableEntry.save();

    room.bookings.push({
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    await room.save();

    res.status(201).json({ timetableEntry, room });
  } catch (error) {
    res.status(500).json({
      message: "Error creating timetable entry and adding booking",
      error,
    });
  }
};

// Get all timetable entries
const getEntries = async (req, res) => {
  try {
    const timetable = await Timetable.find({});
    res.send(timetable);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get timetable entry by id
const getEntry = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).send();
    }
    res.send(timetable);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a timetable entry
const updateEntry = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!timetable) {
      return res.status(404).send();
    }
    res.send(timetable);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a timetable entry
const deleteEntry = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) {
      return res.status(404).send();
    }
    res.send(timetable);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
};
