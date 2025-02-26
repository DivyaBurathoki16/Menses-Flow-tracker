const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 📝 Sign-up route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;  // Get data from request

    const hashedPassword = await bcrypt.hash(password, 10);  // Hash password

    const newUser = new User({ username, email, password: hashedPassword });  
    await newUser.save();  // Save to database

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// 📝 Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;  
    const user = await User.findOne({ email });  

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
