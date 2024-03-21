// const Timetable = require("../models/timetable");
// const bookingController = require("./bookingController");
// // const roomController = require("./roomController");

// // Create a new timetable entry
// const createEntry = async (req, res) => {
//   try {
//     // Find the room and add the booking
//     // const room = await roomController.getRoom(req.body.room);

//     // if (!room) {
//     //   return res.status(404).json({ message: "Room not found" });
//     // }

//     // Create a new booking
//     const booking = await bookingController.createBooking(req.body.location, req.body.date, req.body.startTime, req.body.endTime, req.body.type);

//     // Create a new timetable entry with the bookingId of the created booking
//     const timetableEntry = new Timetable({ bookingId: booking._id, ...req.body.course });
//     await timetableEntry.save();

//     // Send the booking in the response
//     res.json(booking);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({message: "Error creating timetable entry and adding booking" , err});
//   }
// };

// // Get all timetable entries
// const getEntries = async (req, res) => {
//   try {
//     const timetable = await Timetable.find({});
//     res.send(timetable);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Get timetable entry by id
// const getEntry = async (req, res) => {
//   try {
//     const timetable = await Timetable.findById(req.params.id);
//     if (!timetable) {
//       return res.status(404).send();
//     }
//     res.send(timetable);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Update a timetable entry
// const updateEntry = async (req, res) => {
//   try {
//     const timetable = await Timetable.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!timetable) {
//       return res.status(404).send();
//     }
//     res.send(timetable);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // Delete a timetable entry
// const deleteEntry = async (req, res) => {
//   try {
//     const timetable = await Timetable.findByIdAndDelete(req.params.id);
//     if (!timetable) {
//       return res.status(404).send();
//     }
//     res.send(timetable);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// module.exports = {
//   createEntry,
//   getEntries,
//   getEntry,
//   updateEntry,
//   deleteEntry,
// };
