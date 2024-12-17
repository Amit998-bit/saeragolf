const express = require('express');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Razorpay instance
const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
key_id:"rzp_live_xxMqs6bYK7A4kz",
key_secret:"4WIV2N1yxzjWlvr5vUaWnsEP"
});

// Default Route: Check if the server is running
app.get('/', (req, res) => {
  res.send('Razorpay Payment Integration Server is Up and Running!');
});

// Endpoint to create an order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: 9000, // Amount in smallest currency unit (e.g., 1000 = ₹10)
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1 // Automatically capture payment
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Unable to create order' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
