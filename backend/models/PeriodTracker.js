const mongoose = require("mongoose");

const periodTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  lastPeriodDate: { type: Date, required: true },
  cycleLength: { type: Number, required: true }, // Example: 28 days cycle
});

const PeriodTracker = mongoose.model("PeriodTracker", periodTrackerSchema);
module.exports = PeriodTracker;
