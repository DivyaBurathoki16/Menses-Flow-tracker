const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);

// Test route to check MongoDB connection
router.get('/test', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ 
      success: true, 
      message: 'MongoDB is connected',
      userCount: count 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'MongoDB connection failed',
      error: error.message 
    });
  }
});

module.exports = router; 