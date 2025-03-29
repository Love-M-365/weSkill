// paymentController.js

// Mock database (Replace this with an actual database)
const orders = {
    "order123": { amount: 1, paid: false },
  };
  
  // Payment verification logic
  const verifyPayment = (req, res) => {
    const orderId = req.params.orderId;
  
    // Mock Payment Verification (Replace with actual UPI verification API)
    const paymentSuccess = Math.random() > 0.5; // Simulate success or failure
  
    if (orders[orderId]) {
      if (paymentSuccess) {
        orders[orderId].paid = true;
        return res.json({ success: true, message: "Payment Verified" });
      } else {
        return res.json({ success: false, message: "Payment Not Received" });
      }
    } else {
      return res.status(404).json({ success: false, message: "Order Not Found" });
    }
  };
  
  module.exports = { verifyPayment };
  