const Notification = require("../models/notification");
const user = require("../models/user");

const getNotification = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a URL parameter

    const user = await user.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Find all notifications for the user that match the given faculty, year, and semester
    const notifications = await Notification.find({
      faculty: user.faculty,
      year: user.year,
      semester: user.semester,
    });

    if (!notifications) {
      return res.status(404).json({
        success: false,
        error: "No notifications found",
      });
    }

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const createNotification = async (req, res) => {
  const { title, message, faculty, year, semester } = req.body;

  try {
    const notification = new Notification({
      title,
      message,
      faculty,
      year,
      semester,
    });

    await notification.save();

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id; // Assuming the notification ID is passed as a URL parameter

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: "Notification not found",
      });
    }

    await notification.remove();

    res.status(200).json({
      success: true,
      data: {},
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  getNotification,
  createNotification,
  deleteNotification,
};