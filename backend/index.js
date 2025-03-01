require("dotenv").config();  // Load environment variables from .env file
const express = require("express");  // Import Express
const mongoose = require("mongoose"); // Import Mongoose for MongoDB
const cors = require("cors"); // Import CORS to allow frontend access

const app = express();  // Initialize Express app
app.use(express.json());  // Allows app to read JSON data from requests
app.use(cors());  // Enable CORS for frontend-backend communication
 
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected!"))
.catch(err => console.log("❌ MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
