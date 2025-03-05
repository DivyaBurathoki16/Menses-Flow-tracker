const mongoose = require("mongoose");

const MoodTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true, default: Date.now },
  mood: { type: String, required: true },
  energyLevel: { type: Number, required: true },
  stressLevel: { type: Number, required: true },
  sleepHours: { type: Number, required: true },

  exerciseActivity: {
    type: String,
    enum: ["Yoga", "Walking", "Running", "Stretching", "No Exercise"],
    required: true,
  },

  diet: {
    type: String,
    enum: ["Balanced Meal", "Vegetarian", "High Protein", "Junk Food"],
    required: true,
  },

  waterIntake: {
    type: String,
    enum: ["0.5 L", "1.0 L", "1.5 L", "2.0 L", "2.5+ L"],
    required: true,
  },

  socialInteraction: {
    type: String,
    enum: ["None", "Minimal (Online/Texting)", "In-person Chat", "Group Hangout"],
    required: true,
  },

  journalEntry: { type: String, default: "" },
});

const MoodTracker = mongoose.model("MoodTracker", MoodTrackerSchema);
module.exports = MoodTracker;
