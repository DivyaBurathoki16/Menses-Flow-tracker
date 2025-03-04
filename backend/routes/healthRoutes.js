const express = require("express");
const axios = require("axios");
const { authenticateUser } = require("../middleware/authMiddleware"); // If using auth middleware

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { flowIntensity, periodLength, mood, crampIntensity } = req.body;

    // Send user data to Flask AI model
    const response = await axios.post("http://127.0.0.1:5002/predict-health", {
      flowIntensity,
      periodLength,
      mood,
      crampIntensity
    });

    console.log("🚀 AI Response:", response.data); // Debugging log

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error from Flask AI:", error.response?.data || error.message);
    res.status(500).json({ 
      message: "Error analyzing health data", 
      error: error.response?.data || error.message 
    });
  }
});

module.exports = router;
