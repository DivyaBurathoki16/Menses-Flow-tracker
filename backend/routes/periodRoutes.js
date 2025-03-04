const express = require("express");
const axios = require("axios");
const PeriodTracker = require("../models/PeriodTracker");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Get AI/ML-Based Predictions for Logged-in User
router.get("/predict", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const periodData = await PeriodTracker.findOne({ userId });

    if (!periodData) return res.status(404).json({ message: "No period data found for this user." });

    // Send data to Flask AI model
    const response = await axios.post("http://localhost:5001/predict", {
      lastPeriodDate: periodData.lastPeriodDate,
      cycleLength: periodData.cycleLength
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error getting prediction", error: error.message });
  }
});

module.exports = router;
