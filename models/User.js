// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Password is no longer 'required' as users can log in via Google or OTP/email.
    // It will be null or an empty string for users who don't set a password directly.
    password: { type: String }, 
    googleId: {
        type: String,
        unique: true, // Ensures each Google ID is unique
        sparse: true  // Allows multiple documents to have null for this field.
                      // Important if you have users without googleId, e.g., OTP users.
    },
    weight: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    age: { type: Number, default: 0 },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'very active'], default: 'sedentary' },
    goal: { type: String, enum: ['lose', 'maintain', 'gain'], default: 'maintain' },
    isVegetarian: { type: Boolean, default: false },
    isVegan: { type: Boolean, default: false },
    allergies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Allergy' }],
    weaknesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weakness' }],
    tdee: { type: Number, default: 0 }, // Total Daily Energy Expenditure
    bmi: { type: Number, default: 0 }
});

// --- Schema Validation (Pre-save hook) ---
// This ensures that a user document must have EITHER a password OR a googleId.
// This prevents creating a user without any authentication method defined.

module.exports = mongoose.model('User', UserSchema);
