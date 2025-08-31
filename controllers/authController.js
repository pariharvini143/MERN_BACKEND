// server/controllers/authController.js
const User = require('../models/User');
const OTP = require('../models/OTP'); // Import the new OTP model
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/emailService'); 

// Load environment variables 
require('dotenv').config();

// Helper function to generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};

// @desc    Send OTP to user's email for login/registration
// @route   POST /api/auth/send-otp
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Email is required.' });
    }

    try {
        const otp = generateOTP();
        const otpExpirationMinutes = parseInt(process.env.OTP_EXPIRATION_MINUTES || '5', 10);

        await OTP.findOneAndUpdate(
            { email },
            { otp, createdAt: new Date() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,                     
            subject: 'Your AI Fit MealPlanner OTP',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50;">Your One-Time Password (OTP)</h2>
                    <p>Hello,</p>
                    <p>You have requested to login to AI Fit MealPlanner. Your OTP is:</p>
                    <h1 style="color: #008CBA; background-color: #f2f2f2; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px;">${otp}</h1>
                    <p>This OTP is valid for ${otpExpirationMinutes} minutes.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Thanks,<br/>AI Fit MealPlanner Team</p>
                </div>
            `,
        };

        await sendEmail(mailOptions); 

        res.status(200).json({ msg: 'OTP sent successfully to your email.', otpExpirationMinutes });

    } catch (err) {
        console.error('Error in sendOtp:', err.message);
        res.status(500).json({ msg: 'Failed to send OTP. Please try again later. Check SMTP config.' });
    }
};

// @desc    Verify OTP and log in/register user
// @route   POST /api/auth/verify-otp
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ msg: 'Email and OTP are required.' });
    }

    try {
        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord) {
            console.log(`OTP not found or invalid for email: ${email}, OTP: ${otp}`);
            return res.status(400).json({ msg: 'Invalid or expired OTP.' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            const defaultName = email.split('@')[0] || 'New User'; 
            user = new User({
                email,
                name: defaultName, 
                password: '', 
            });
            try {
                await user.save();
                console.log('New user registered via OTP:', user.email);
            } catch (saveErr) {
                console.error('Error saving new user during OTP verification:', saveErr); 
                const validationErrors = Object.values(saveErr.errors || {}).map(e => e.message).join(', ');
                return res.status(500).json({ 
                    msg: `Error registering user: ${validationErrors || saveErr.message || 'Unknown error.'}` 
                });
            }
        } else {
            console.log('Existing user logged in via OTP:', user.email);
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            async (err, token) => {
                if (err) {
                    console.error('Error signing JWT for OTP user:', err.message);
                    return res.status(500).json({ msg: 'Failed to generate authentication token. Check JWT_SECRET.' });
                }

                try {
                    await OTP.deleteOne({ email });
                    console.log(`OTP deleted for email: ${email}`);
                } catch (deleteErr) {
                    console.error('Error deleting OTP record:', deleteErr.message);
                }

                res.status(200).json({
                    token,
                    user: { id: user.id, name: user.name, email: user.email }
                });
            }
        );

    } catch (err) {
        console.error('Unhandled error in verifyOtp main block:', err.message);
        res.status(500).json({ msg: 'Server Error during OTP verification.' });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ 
                    token, 
                    user: { id: user.id, name: user.name, email: user.email } 
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Authenticate user & get token (Commented out as per request for Google Auth only)
// @route   POST /api/auth/login
/*
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token, 
                    user: { id: user.id, name: user.name, email: user.email } 
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
*/

// @desc    Google OAuth Callback Handler
// @route   GET /api/auth/google/callback (handled by Passport middleware)
exports.googleCallback = async (req, res) => {
    try {
        if (!req.user) {
            console.error('Google callback: req.user is null, authentication failed or user not found/created.');
            return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
        }

        const user = req.user;

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('Error signing JWT:', err.message);
                    return res.redirect(`${process.env.CLIENT_URL}/login?error=jwt_sign_failed`);
                }

                res.redirect(`${process.env.CLIENT_URL}/login?token=${token}&userId=${user.id}&userName=${encodeURIComponent(user.name)}&userEmail=${encodeURIComponent(user.email || '')}`);
            }
        );

    } catch (err) {
        console.error('Error in googleCallback:', err.message);
        res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
    }
};
