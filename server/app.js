const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// Import routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const loginRoute = require('./routes/loginRoute');
const enrollmentRoute = require('./routes/enrollmentRoutes');
const roomRoutes = require('./routes/roomRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
});

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Use imported routes
app.use(loginRoute);
app.use(userRoutes);
app.use(courseRoutes);
app.use(timetableRoutes);
app.use(notificationRoutes);
app.use(enrollmentRoute);
app.use(roomRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
