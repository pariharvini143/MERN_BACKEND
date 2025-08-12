// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

module.exports = mongoose.model('User', UserSchema);