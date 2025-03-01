const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Changed from ObjectId to String for consistency
  cycleStartDate: { type: Date, required: true },
  cycleEndDate: { type: Date, required: true },
  PeriodLengths: { type: Number, required: true },
  FlowIntensity: { type: String, enum: ["light", "medium", "heavy"], required: true },
  Mood: { type: String, required: true }
});

const Tracker = mongoose.model("Tracker", trackerSchema);
module.exports = Tracker;

