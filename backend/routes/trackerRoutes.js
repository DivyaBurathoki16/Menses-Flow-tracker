const express = require("express");
const Tracker = require("../models/Tracker");

const router = express.Router();

// ✅ Add Period Tracking Data
router.post("/", async (req, res) => {
  try {
    const { userId, lastPeriodDate, periodDuration, flowIntensity } = req.body;

    // 🛑 Validate input
    if (!userId || !lastPeriodDate || !periodDuration || !flowIntensity) {
      return res.status(400).json({ message: "All fields are required", received: req.body });
    }

    console.log("Received data:", req.body);

    const newTracker = new Tracker({ userId, lastPeriodDate, periodDuration, flowIntensity });

    await newTracker.save();
    res.status(201).json({ message: "Period tracking data saved successfully", tracker: newTracker });
  } catch (error) {
    console.error("Server error saving period tracking data:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Tracker Data for a User
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const trackerData = await Tracker.find({ userId });

    if (!trackerData.length) {
      return res.status(404).json({ message: "No tracking data found" });
    }

    res.status(200).json(trackerData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a Period Entry
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 🛑 Check if ID exists
    const deletedEntry = await Tracker.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting period entry:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
