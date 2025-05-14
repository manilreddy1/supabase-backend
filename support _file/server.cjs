require('dotenv').config();

const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use hardcoded Razorpay test key and secret
const razorpay = new Razorpay({
  key_id: 'rzp_test_52SseWITb2EXYA',
  key_secret: 'QLdBx6egY9rFIYC2wbbhb6Gn'
});

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      payment_capture: 1
    });
    res.json({ success: true, orderId: order.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// (Optional) Payment verification endpoint
app.post('/api/verify-payment', (req, res) => {
  // You can implement signature verification here if needed
  res.json({ success: true });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 