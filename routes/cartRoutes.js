const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const verifyUser = require('../middleware/verifyUser'); //  import here


router.post('/', (req, res) => {
  console.log(' Cart POST hit');
  res.json({ message: 'Cart item added' });
});




// GET /api/cart
router.get('/', verifyUser, async (req, res) => {
  const items = await CartItem.find({ userId: req.user._id });
  res.json(items);
});

// POST /api/cart
router.post('/', verifyUser, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const existing = await CartItem.findOne({ userId, productId });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.json(existing);
  }

  const newItem = await CartItem.create({ userId, productId, quantity });
  res.json(newItem);
});

// DELETE /api/cart/:productId
router.delete('/:productId', verifyUser, async (req, res) => {
  await CartItem.deleteOne({ userId: req.user._id, productId: req.params.productId });
  res.json({ success: true });
});

// DELETE /api/cart/clear
router.delete('/clear', verifyUser, async (req, res) => {
  await CartItem.deleteMany({ userId: req.user._id });
  res.json({ success: true });
});

module.exports = router;
