// server/models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    ingredients: [String],
    instructions: [String],
    nutritionInfo: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number
    },
    geminiId: String, // Gemini से जेनरेटेड रेसिपी के लिए
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema);






