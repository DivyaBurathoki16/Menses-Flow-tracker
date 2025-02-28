const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import "./Profile.css";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from storage
    setUser(null); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Welcome, {user.username || "User"}!</h2>
        <div className="profile-info">
          <p><strong>Age:</strong> {user.age}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

// 📝 Sign-up route
router.post("/signup", async (req, res) => {
  try {
    const { username, age, email, password } = req.body;  // Get data from request

    const hashedPassword = await bcrypt.hash(password, 10);  // Hash password

    const newUser = new User({ username, age, email, password: hashedPassword });  
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
