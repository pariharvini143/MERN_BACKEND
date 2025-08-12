// server/models/Weakness.js
const mongoose = require('mongoose');

const WeaknessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Weakness', WeaknessSchema);