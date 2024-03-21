const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const verifyUser = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.accessToken;

  // Verify token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if user is the same as the one in the token
    if (req.body.userId === decoded.userId || req.params.id === decoded.userId) {
      next(); // User is the same, proceed to the next middleware
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  });
};

module.exports = verifyUser;