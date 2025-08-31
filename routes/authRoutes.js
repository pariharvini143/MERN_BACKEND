// server/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
// Import all necessary controller functions, including register
const { register, googleCallback, sendOtp, verifyOtp } = require('../controllers/authController'); 

const router = express.Router();

// --- Traditional Register Route ---
// Re-enabling the traditional registration route
router.post('/register', register);
// --- Traditional Login Route (Still commented out as per previous request to use Google/OTP for login) ---
// router.post('/login', login);

// --- Google OAuth Routes ---
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false            
    }),
    googleCallback
);

// --- OTP Based Login/Registration Routes ---
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// --- Existing User Authentication Route (JWT verification) ---
// const auth = require('../middleware/auth');
// router.get('/verify', auth, (req, res) => res.json({ msg: 'Token is valid', user: req.user }));


module.exports = router;
