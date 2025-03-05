const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const userRoutes = require("./routes/userRoutes");
const trackerRoutes = require("./routes/trackerRoutes"); // <-- Ensure this line exists
const moodTrackerRoutes = require("./routes/moodTracker");

const app = express();
app.use(express.json()); // <-- Required for parsing JSON request bodies
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/tracker", trackerRoutes); // <-- Ensure this line exists
app.use("/api/mood", moodTrackerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
