const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "20m" }
      );

      // Set JWT token as a cookie in the response
      res.cookie("accessToken", token, {
        maxAge: 25 * 60 * 1000, // Expiration time in milliseconds (20 minutes)
        httpOnly: true, // Cookie is accessible only through HTTP requests
        secure: true, // Cookie is sent only over HTTPS (if your application uses HTTPS)
        sameSite: "strict", // Restricts cookie to be sent only with same-site requests
      });

      res.json({ token });
    } else {
      return res.status(401).json({ message: "Invalid  password" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (res) => {
  res.clearCookie("accessToken");
  res.json({ message: "Logged out successfully" });
};

module.exports = { login, logout };
