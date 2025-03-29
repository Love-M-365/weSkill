// paymentRoutes.js
const express = require("express");
const router = express.Router();
const { verifyPayment } = require("../controllers/paymentController");

// Define the route for verifying payments
router.get("/verify-payment/:orderId", verifyPayment);

module.exports = router;
