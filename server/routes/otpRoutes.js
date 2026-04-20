const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/otpController');
const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: 'Too many OTP requests from this IP, please try again after 10 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/send', otpLimiter, sendOTP);
router.post('/verify', verifyOTP);

module.exports = router;
