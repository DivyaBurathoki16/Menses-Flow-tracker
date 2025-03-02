require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const trackerRoutes = require("./routes/trackerauth"); 


const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/api/tracking", trackerRoutes);


// Test route to check server status
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
