require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/authRoutes"); 
app.use("/api/auth", authRoutes); 
const periodRoutes = require("./routes/periodRoutes");
app.use("/api/period", periodRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
