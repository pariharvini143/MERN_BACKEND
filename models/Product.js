// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  description:   String,
  price:         { type: Number, required: true },
  imageUrl:      String,
  category:      String,
  stockQuantity: { type: Number, default: 100 },

   nutrition: {
    calories: Number,
    protein: String,
    fiber: String,
    carbs: String,
    fat: String
  },
  ingredients: [String],
  benefits: [String]
});





module.exports = mongoose.model('Product', productSchema);
