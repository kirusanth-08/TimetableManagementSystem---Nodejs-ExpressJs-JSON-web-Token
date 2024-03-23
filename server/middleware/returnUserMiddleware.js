const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const verifyUser = async (req, res, next) => {
  try {
    
    const token = req.cookies.accessToken;
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).send({ error: 'Failed to authenticate ' + error});
  }
};

module.exports = verifyUser;