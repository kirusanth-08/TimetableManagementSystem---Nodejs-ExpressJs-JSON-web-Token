const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Middleware for role-based authorization
const authorize = (allowedRoles) => (req, res, next) => {
    // Extract token from request headers
    const token = req.headers.authorization;

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        
        // Check if user has the required role
        const { role } = decoded;
        if (allowedRoles.includes(role)) {
            next(); // User has the required role, proceed to the next middleware
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    });
};

module.exports = { authorize };
