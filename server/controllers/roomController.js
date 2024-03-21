const Room = require('../models/room');

const roomController = {
  createRoom: async (req, res) => {
    try {
      const room = new Room(req.body);
      await room.save();
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ message: 'Error creating room', error });
    }
  },

  getRooms: async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rooms', error });
    }
  },

  getRoom: async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching room', error });
    }
  },

  updateRoom: async (req, res) => {
    try {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: 'Error updating room', error });
    }
  },

  deleteRoom: async (req, res) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.json({ message: 'Room deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting room', error });
    }
  }
};

module.exports = roomController;