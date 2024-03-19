const jwt = require('jsonwebtoken');
// require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Middleware function for token verification
const verifyToken = (req, res, next) => {
  // Extract token from request headers
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token', err });
    }

    // If token is valid, attach decoded user information to request object
    req.user = decoded;
    next(); // Pass control to the next middleware
  });
};


// Middleware function to get user from token
const getUserFromToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken, getUserFromToken };

