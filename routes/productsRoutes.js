const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// server/routes/productsRoutes.js
const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Product fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Debug route to verify seeded product data
router.get('/debug', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error('Debug fetch failed:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
