// server/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['Razorpay', 'Cash on Delivery'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending'
  },
  razorpayPaymentId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
});



const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
