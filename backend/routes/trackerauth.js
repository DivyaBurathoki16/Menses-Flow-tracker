const express = require("express");
const Tracker = require("../models/tracker");
const router = express.Router();

// ✅ Confirm API is working
router.get("/test", (req, res) => res.send("✅ Tracker routes are working!"));

// ✅ Add a new cycle
router.post("/track", async (req, res) => {
  try {
    const { userId, cycleStartDate, cycleEndDate, periodLength, FlowIntensity, Mood } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const newCycle = new Tracker({ userId, cycleStartDate, cycleEndDate, periodLength, FlowIntensity, Mood });
    await newCycle.save();
    
    res.status(201).json({ message: "Tracking data added", newCycle });
  } catch (error) {
    console.error("❌ Error saving tracking data:", error);
    res.status(500).json({ error: "Failed to add tracking data" });
  }
});

// ✅ Get the latest cycle (excluding deleted ones)
router.get("/latest/:userId", async (req, res) => {
  try {
    console.log("🔍 Fetching latest cycle for:", req.params.userId);

    const latestCycle = await Tracker.findOne({
      userId: req.params.userId,
      isDeleted: false,
    }).sort({ cycleStartDate: -1 });

    if (!latestCycle) {
      console.log("⚠️ No cycle found for this user.");
      return res.status(404).json({ error: "No cycle data found" });
    }

    console.log("✅ Latest cycle found:", latestCycle);
    res.status(200).json(latestCycle);
  } catch (error) {
    console.error("❌ Error fetching latest cycle:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});



// ✅ Get all past cycles (excluding deleted ones)
router.get("/history/:userId", async (req, res) => {
  try {
    const history = await Tracker.find({ userId: req.params.userId, isDeleted: false }).sort({ cycleStartDate: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("❌ Error fetching history:", error);
    res.status(500).json({ error: "Failed to retrieve history" });
  }
});

// ✅ Update an existing cycle
router.put("/update/:cycleId", async (req, res) => {
  try {
    const updatedCycle = await Tracker.findOneAndUpdate(
      { _id: req.params.cycleId, isDeleted: false }, 
      req.body, 
      { new: true }
    );
    if (!updatedCycle) return res.status(404).json({ error: "Cycle not found or deleted" });
    res.status(200).json({ message: "Cycle updated", updatedCycle });
  } catch (error) {
    console.error("❌ Error updating cycle:", error);
    res.status(500).json({ error: "Failed to update cycle" });
  }
});

// ✅ Soft delete a cycle
router.delete("/delete/:cycleId", async (req, res) => {
  try {
    const deletedCycle = await Tracker.findOneAndUpdate(
      { _id: req.params.cycleId, isDeleted: false }, 
      { isDeleted: true }, 
      { new: true }
    );
    if (!deletedCycle) return res.status(404).json({ error: "Cycle not found or already deleted" });
    res.status(200).json({ message: "Cycle marked as deleted", deletedCycle });
  } catch (error) {
    console.error("❌ Error deleting cycle:", error);
    res.status(500).json({ error: "Failed to delete cycle" });
  }
});

module.exports = router;