import { QRCodeCanvas } from "qrcode.react";
import React from "react";
const PaymentPage = ({ orderId }) => {
  const upiId = "ishmalikbps@oksbi"; 
  const paymentURL = `upi://pay?pa=${upiId}&pn=WeSkill&am=1&cu=INR&tid=${orderId}`;

  const handlePaymentVerification = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/placeOrder//verify-payment/${orderId}`);
      const data = await response.json();
      if (data.success) {
        alert("Payment Successful! Order Placed.");
        
      } else {
        alert("Payment Pending or Failed.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  return (
    <div>
      <h1>Scan to Pay</h1>
      <p>Amount: ₹1</p>
      <QRCodeCanvas value={paymentURL} size={256} />
      <p>Scan the QR code using your UPI app.</p>
      <button onClick={handlePaymentVerification}>Verify Payment</button>
    </div>
  );
};

export default PaymentPage;
