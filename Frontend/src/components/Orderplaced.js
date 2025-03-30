import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import WeSkillNavbar from "./MainNavbar";

const SuccessPage = () => {
  const location = useLocation();
  const { userId, profileId, orderId, amount } = location.state || {};

  useEffect(() => {
    if (userId && profileId && orderId && amount) {
      placeOrder();
    }
  }, [userId, profileId, orderId, amount]);

  const placeOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/place-order", {
        userId,
        profileId,
        orderId,
        amount,
      });

      console.log("Order Placed Successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <WeSkillNavbar />
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        <div className="card p-4">
          <h1 className="text-success mb-4">Payment Successful!</h1>
          <p>Your order has been placed successfully. You can check your order in the orders section.</p>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
