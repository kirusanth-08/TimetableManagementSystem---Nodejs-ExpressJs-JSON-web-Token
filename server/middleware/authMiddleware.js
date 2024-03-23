const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const authenticate = (req, res, next) => {
  // Extract token from request headers
  // const token = req.headers.authorization;

  //getting token from cookie
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Decode the JWT token
  // const decodedToken = jwt.decode(token);
  // // Extract the expiration time from the decoded token
  // const expirationTime = decodedToken.exp;
  // console.log(Math.ceil(expirationTime - Math.floor(Date.now() / 1000)));

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Session timeout' });
      }
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    // If token is valid, attach decoded user information to request object
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
