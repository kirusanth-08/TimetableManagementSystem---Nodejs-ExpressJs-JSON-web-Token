const Timetable = require('../models/timetable');

// Create a new timetable entry
const createEntry = async (req, res) => {
  try {
    const timetable = new Timetable(req.body);
    await timetable.save();
    res.status(201).send({ timetable });
  } catch (error) {
    res.status(400).send(error);
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
    const timetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
  deleteEntry
};