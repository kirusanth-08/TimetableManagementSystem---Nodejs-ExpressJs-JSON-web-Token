const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Middleware for role-based authorization
const authorize = (allowedRoles) => (req, res, next) => {
  //getting token from header
    // const token = req.headers.authorization;

    //getting token from cookie
    const token = req.cookies.accessToken;

    // Verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        
        // Check if user has the required role
        const { role } = decoded;
        if (allowedRoles.includes(role)) {
            next(); // User has the required role, proceed to the next middleware
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    });
};

module.exports = authorize;
