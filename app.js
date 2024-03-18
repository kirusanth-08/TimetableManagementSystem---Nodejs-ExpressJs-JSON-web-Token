const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Import routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const timetableRoutes = require('./routes/timetableRoutes');

const User = require('./models/user');

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

// Use imported routes
app.use(userRoutes);
app.use(courseRoutes);
app.use(timetableRoutes);


// Protected route that requires authentication
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username in the database
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Define the getCourses function
const getCourses = async (req, res) => {
    try {
      // Your logic for retrieving courses
      const courses = await Course.find({});
      res.json({ courses });
    } catch (error) {
      console.error('Error retrieving courses:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Register the '/courses' route with the getCourses function and authMiddleware.verifyToken middleware
  app.get('/courses', authMiddleware.verifyToken, getCourses);
  

// Use the verifyToken middleware from authMiddleware
// app.get('/protected', authMiddleware, (req, res) => {
//     // Access user information from req.user
//     res.json({ message: 'Authenticated user', user: req.user });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
