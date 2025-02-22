const mongoose = require('mongoose');




// MongoDB connection URI - using environment variable or default to localhost
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/health_tracker';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB.');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1);
});

// Export mongoose connection
module.exports = mongoose;
