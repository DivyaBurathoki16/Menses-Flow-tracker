const mongoose = require("mongoose");

const healthTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  flowIntensity: { type: String, required: true }, // e.g., light, moderate, heavy
  periodLength: { type: Number, required: true }, // Number of days period lasted
  mood: { type: String, required: true },
  crampIntensity: { type: String, required: true }, // e.g., mild, moderate, severe
  recommendedExercises: { type: [String] },
  recommendedDiet: { type: [String] },
  mentalWellBeing: { type: String }, // Summary of mood patterns
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HealthTracker", healthTrackerSchema);
