const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, required: true }, // e.g. 'Cardio', 'Strength'
  duration:    { type: Number, required: true }, // in minutes
  equipment:   { type: String },                 // e.g. 'Dumbbells', 'None'
  imageUrl:    { type: String },
  description: { type: String },
  benefits:    [String],
  level:       { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
