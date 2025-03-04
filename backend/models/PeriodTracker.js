const mongoose = require("mongoose");

const PeriodTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  periodDates: [{ type: Date, required: true }], // Stores past period dates
  cycleLength: { type: Number }, // Avg cycle length
  flowIntensity: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  mood: { type: String, default: "Normal" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PeriodTracker", PeriodTrackerSchema);

