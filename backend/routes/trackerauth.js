// Express Router for Menstrual Cycle Tracking
const express = require("express");
const Tracker = require("../models/tracker");
const router = express.Router();

// Test route to confirm API is working
router.get("/test", (req, res) => {
  res.send("✅ Tracker routes are working!");
});

// Add a new cycle tracking entry
router.post("/track", async (req, res) => {
  try {
    console.log("🛠 Received request at /track:", req.body);
    const { userId, cycleStartDate, cycleEndDate, PeriodLengths, FlowIntensity, Mood } = req.body;

    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const newCycle = new Tracker({ userId, cycleStartDate, cycleEndDate, PeriodLengths, FlowIntensity, Mood });
    await newCycle.save();
    
    res.status(201).json({ message: "Tracking data added", newCycle });
  } catch (error) {
    console.error("❌ Error saving tracking data:", error);
    res.status(500).json({ error: "Failed to add tracking data" });
  }
});

// Get the latest cycle data for a user
router.get("/latest/:userId", async (req, res) => {
  try {
    const latestCycle = await Tracker.findOne({ userId: req.params.userId }).sort({ cycleStartDate: -1 });
    if (!latestCycle) return res.status(404).json({ error: "No cycle data found" });
    res.status(200).json(latestCycle);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tracking data" });
  }
});

// Update an existing cycle
router.put("/update/:cycleId", async (req, res) => {
  try {
    const updatedCycle = await Tracker.findByIdAndUpdate(req.params.cycleId, req.body, { new: true });
    if (!updatedCycle) return res.status(404).json({ error: "Cycle not found" });
    res.status(200).json({ message: "Cycle updated", updatedCycle });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cycle" });
  }
});

// Get all past cycles for a user
router.get("/history/:userId", async (req, res) => {
  try {
    const history = await Tracker.find({ userId: req.params.userId }).sort({ cycleStartDate: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve history" });
  }
});

// Delete a cycle
router.delete("/delete/:cycleId", async (req, res) => {
  try {
    const deletedCycle = await Tracker.findByIdAndDelete(req.params.cycleId);
    if (!deletedCycle) return res.status(404).json({ error: "Cycle not found" });
    res.status(200).json({ message: "Cycle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cycle" });
  }
});

module.exports = router;
