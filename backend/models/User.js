const mongoose = require("mongoose"); // Import Mongoose

// Define User Schema (structure of data)
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username (unique)
  age:{type: Number, required: true, unique: false},
  email: { type: String, required: true, unique: true }, // Email (unique)
  password: { type: String, required: true }, // Password (hashed)
});

// Export User Model
module.exports = mongoose.model("User", UserSchema);
