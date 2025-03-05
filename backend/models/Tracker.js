const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  lastPeriodDate: { type: Date, required: true },
  periodDuration: { type: Number, required: true, min: 1, max: 10 },
  flowIntensity: { type: String, enum: ["Low", "Medium", "High"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Tracker", TrackerSchema);
