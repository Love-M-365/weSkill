import React, { useEffect } from 'react';

const PaymentPage = () => {
  useEffect(() => {
    // Load the Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    // Fetch Razorpay order ID from your backend
    const response = await fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Amount in INR (1 INR = 100 paise)
    });
    const data = await response.json();

    // Initialize Razorpay payment modal
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Your Razorpay key ID
      amount: 1000 * 100, // Amount in paise
      currency: 'INR',
      order_id: data.orderId,
      handler: function (response) {
        // Handle successful payment
        console.log('Payment successful', response);
        // Notify your backend about the payment success (for verification)
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9876543210',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
