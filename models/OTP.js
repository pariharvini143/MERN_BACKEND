// server/models/OTP.js
const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Only one active OTP per email at a time
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: process.env.OTP_EXPIRATION_MINUTES * 60 || 300, // OTP expires after X minutes (default 5 minutes = 300 seconds)
    },
});

module.exports = mongoose.model('OTP', OTPSchema);