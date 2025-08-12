// server/models/MealPlan.js
const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tdee: {
        type: Number,
        default: 0
    },
    meals: [{
        mealType: String,
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    }]
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);






