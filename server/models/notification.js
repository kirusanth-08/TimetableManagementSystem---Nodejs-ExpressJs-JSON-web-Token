const e = require('express');
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    faculty: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    },
    semester: {
        type: Number,
        enum: [1, 2],
        required: true
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);