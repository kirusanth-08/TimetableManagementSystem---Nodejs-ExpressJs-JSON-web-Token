const User = require('../models/user'); // Assuming your User model is in a 'models' directory
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username in the database
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      } else {
        return res.status(401).json({ message: 'Invalid  password' });
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login };
