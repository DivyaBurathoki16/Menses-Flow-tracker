const express = require("express");
const MoodTracker = require("../models/MoodTracker");

const router = express.Router();

// Add Mood Entry
router.post("/", async (req, res) => {
    try {
        console.log("Incoming Mood Entry Data:", req.body); // Debugging
        
        const { userId, mood, energyLevel, stressLevel, sleepHours, exerciseActivity, diet, waterIntake, socialInteraction, journalEntry } = req.body;

        if (!userId || !mood || !energyLevel || !stressLevel || !sleepHours || !exerciseActivity || !diet || !waterIntake || !socialInteraction) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        const newMoodEntry = new MoodTracker({
            userId,
            mood,
            energyLevel,
            stressLevel,
            sleepHours,
            exerciseActivity,
            diet,
            waterIntake,
            socialInteraction,
            journalEntry: journalEntry || "" // Default to empty string if not provided
        });

        await newMoodEntry.save();
        res.status(201).json({ message: "Mood entry recorded successfully!" });
    } catch (error) {
        console.error("Error saving mood entry:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get User's Mood Data
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const moodEntries = await MoodTracker.find({ userId }).sort({ createdAt: -1 }); // Ensure sorting by createdAt field

        res.status(200).json(moodEntries);
    } catch (error) {
        console.error("Error fetching mood data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Analyze Mood Patterns
router.get("/analyze/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const moodEntries = await MoodTracker.find({ userId }).sort({ createdAt: -1 }).limit(30);

        if (moodEntries.length < 7) {
            return res.status(400).json({ message: "Need at least 7 days of data for analysis." });
        }

        const moodCounts = moodEntries.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
        }, {});

        const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => (moodCounts[a] > moodCounts[b] ? a : b));

        res.status(200).json({
            totalEntries: moodEntries.length,
            mostFrequentMood,
            moodCounts,
        });
    } catch (error) {
        console.error("Error analyzing mood data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Mood Entry
router.delete("/:entryId", async (req, res) => {
    try {
        const { entryId } = req.params;
        const deletedEntry = await MoodTracker.findByIdAndDelete(entryId);

        if (!deletedEntry) {
            return res.status(404).json({ message: "Mood entry not found." });
        }

        res.status(200).json({ message: "Mood entry deleted successfully!" });
    } catch (error) {
        console.error("Error deleting mood entry:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
