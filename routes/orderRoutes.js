const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// 🔹 POST /api/orders → Place new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, total, paymentMode, status, razorpayPaymentId } = req.body;

    //  Basic validation
    if (!userId || !Array.isArray(items) || items.length === 0 || !total || !paymentMode) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }

    //  Prepare items with valid ObjectId
    const formattedItems = items.map(item => {
      if (!item.productId) {
        console.warn('Missing productId for item:', item);
        return null;
      }
      return {
        productId: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity
      };
    }).filter(Boolean);

    //  Create new order
    const newOrder = new Order({
      userId,
      items: formattedItems,
      total,
      paymentMode,
      status: status || 'pending',
      razorpayPaymentId: razorpayPaymentId || null
    });

    const saved = await newOrder.save();
    console.log(' Order saved:', saved._id);
    res.status(201).json(saved);
  } catch (err) {
    console.error(' Order save failed:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// 🔹 GET /api/orders/user/:userId → Fetch user's orders with product names
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('items.productId');

    if (!orders || orders.length === 0) {
      return res.status(200).json([]);
    }

    console.log(' First productId:', orders[0]?.items[0]?.productId);
    console.log(' Product name:', orders[0]?.items[0]?.productId?.name);

    res.status(200).json(orders);
  } catch (err) {
    console.error(' Fetching orders failed:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// 🔹 PUT /api/orders/:id/cancel → Cancel an order
router.put('/:id/cancel', async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(' Cancel request received for:', orderId);

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (['delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({ error: `Order already ${order.status}, cannot be cancelled` });
    }

    order.status = 'cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    console.error(' Cancel order error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
