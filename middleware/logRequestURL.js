
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

module.exports = (req, res, next) => {
    console.log(`Request Url: ${req.url}`);
    next();
};