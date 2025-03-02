const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cycleStartDate: { type: Date, required: true },
  cycleEndDate: { type: Date, required: true },
  periodLength: { type: Number, required: true },
  FlowIntensity: { type: String, enum: ["light", "medium", "heavy"], required: true },
  Mood: { type: String, required: true },
  isDeleted: { type: Boolean, default: false }, // ✅ Added soft delete field
  expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }
});

// ✅ Ensure TTL Index is created
trackerSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 });

const Tracker = mongoose.model("Tracker", trackerSchema);
module.exports = Tracker;
