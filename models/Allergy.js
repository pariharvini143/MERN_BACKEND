// server/models/Allergy.js
const mongoose = require('mongoose');

const AllergySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Allergy', AllergySchema);



