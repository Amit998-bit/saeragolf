const express = require('express');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON payloads

// Razorpay instance with key_id and key_secret
const razorpay = new Razorpay({
  key_id: "rzp_live_xxMqs6bYK7A4kz",
  key_secret: "4WIV2N1yxzjWlvr5vUaWnsEP"
});

// Default Route: Check if the server is running
app.get('/', (req, res) => {
  res.send('Razorpay Payment Integration Server is Up and Running!');
});

// Endpoint to create an order
app.post('/create-order', async (req, res) => {
  /*
   This endpoint handles the creation of Razorpay orders.
   - Receives 'amount' in the request body (optional in your case).
   - Creates an order on Razorpay with fixed options.
   - Returns the created order's ID in response.
  */

  const { amount } = req.body;

  const options = {
    amount: 9000, // Fixed amount: 9000 paise = ₹90
    currency: 'INR',
    receipt: `receipt_${Date.now()}`, // Unique receipt ID
    payment_capture: 1 // Automatically capture the payment
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ 
      message: 'Order created successfully',
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Unable to create order', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
