const express = require("express");
const PeriodTracker = require("../models/PeriodTracker");
const router = express.Router();

// 📌 Log a new period date
router.post("/log", async (req, res) => {
  try {
    const { userId, periodDate } = req.body;

    let userPeriodData = await PeriodTracker.findOne({ userId });

    if (!userPeriodData) {
      userPeriodData = new PeriodTracker({ userId, periodDates: [new Date(periodDate)] });
    } else {
      userPeriodData.periodDates.push(new Date(periodDate));
    }

    await userPeriodData.save();
    res.json({ message: "Period logged successfully!" });
  } catch (error) {
    console.error("❌ Error logging period:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 Fetch user's period history
router.get("/:userId", async (req, res) => {
  try {
    const userPeriodData = await PeriodTracker.findOne({ userId: req.params.userId });

    if (!userPeriodData) {
      return res.status(404).json({ message: "No period data found" });
    }

    res.json(userPeriodData);
  } catch (error) {
    console.error("❌ Error fetching period data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 Predict Next Period & Phases using AI/ML
router.get("/predict/:userId", async (req, res) => {
  try {
    const userPeriodData = await PeriodTracker.findOne({ userId: req.params.userId });

    if (!userPeriodData || userPeriodData.periodDates.length < 2) {
      return res.status(400).json({ message: "Not enough data for prediction" });
    }

    // Convert to Date objects and sort (just in case)
    const periods = userPeriodData.periodDates.map(date => new Date(date)).sort((a, b) => a - b);
    
    // Calculate cycle lengths
    let cycleLengths = [];
    for (let i = 1; i < periods.length; i++) {
      cycleLengths.push((periods[i] - periods[i - 1]) / (1000 * 60 * 60 * 24)); // Convert to days
    }

    // Ensure there's enough data for averaging
    if (cycleLengths.length === 0) {
      return res.status(400).json({ message: "Not enough data to calculate cycle length" });
    }

    const avgCycleLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);

    // Predict next period
    const lastPeriodDate = new Date(periods[periods.length - 1]);
    const predictedNextPeriod = new Date(lastPeriodDate);
    predictedNextPeriod.setDate(lastPeriodDate.getDate() + avgCycleLength);

    // Predict Menstrual Phases
    const follicularPhaseStart = new Date(lastPeriodDate);
    const follicularPhaseEnd = new Date(predictedNextPeriod);
    follicularPhaseEnd.setDate(predictedNextPeriod.getDate() - 14); // Ends at ovulation

    const ovulationDay = new Date(predictedNextPeriod);
    ovulationDay.setDate(predictedNextPeriod.getDate() - 14);

    const lutealPhaseStart = new Date(ovulationDay);
    lutealPhaseStart.setDate(ovulationDay.getDate() + 1);

    const lutealPhaseEnd = new Date(predictedNextPeriod);
    lutealPhaseEnd.setDate(predictedNextPeriod.getDate() - 1); // Ends before next period

    res.json({
      avgCycleLength,
      predictedNextPeriod: predictedNextPeriod.toISOString().split('T')[0],
      phases: {
        follicularPhase: {
          start: follicularPhaseStart.toISOString().split('T')[0],
          end: follicularPhaseEnd.toISOString().split('T')[0],
        },
        ovulationDay: ovulationDay.toISOString().split('T')[0],
        lutealPhase: {
          start: lutealPhaseStart.toISOString().split('T')[0],
          end: lutealPhaseEnd.toISOString().split('T')[0],
        },
      },
    });
  } catch (error) {
    console.error("❌ Error predicting period:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
