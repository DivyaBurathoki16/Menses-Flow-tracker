const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = { authenticateUser };
