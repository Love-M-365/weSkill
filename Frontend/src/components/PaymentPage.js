
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate, useLocation } from "react-router-dom";
import WeSkillNavbar from "./MainNavbar";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();


  // Get UPI ID and payment details from props or query params
  const { upiId = "ishmalikbps@oksbi", paymentAmount = 1, orderId = "order123" ,userId,profileId ,userName , profileName } =
    location.state || {};

  const [isVerifying, setIsVerifying] = useState(false);

  const paymentURL = `upi://pay?pa=ishmalikbps@oksbi&pn=Love%20Maggo&am=1&cu=INR&tn=Payment%20for%20WeSkill`;

  const handlePaymentVerification = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch(`https://weskill.onrender.com/api/placeOrder/verify-payment/${orderId}`);
      const data = await response.json();
      if (data.success) {
        navigate("/success",{
          state: {
            amount: 1,
            userName,
            profileName,
            profileId,
            userId
          },
        });
      } else {
        alert("Payment Pending or Failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("There was an error verifying the payment.");
    }
    setIsVerifying(false);
  };

  return (
    <>
    <WeSkillNavbar></WeSkillNavbar>
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <div className="card p-4">
        <h1 className="mb-4">Scan to Pay</h1>
        <p>Amount: ₹{paymentAmount}</p>
        <QRCodeCanvas value={paymentURL} size={256} className="my-3" />
        <p>Scan the QR code using your UPI app.</p>
        <button
          onClick={handlePaymentVerification}
          className="btn btn-primary mt-3"
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying Payment..." : "Verify Payment"}
        </button>
      </div>
    </div>
    </>
  );
};

export default PaymentPage;
