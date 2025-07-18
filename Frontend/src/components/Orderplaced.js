import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import WeSkillNavbar from "./MainNavbar";

const SuccessPage = () => {
  const location = useLocation();
  const { userId, profileId, userName, profileName, amount } = location.state || {};
  
  const orderPlaced = useRef(false); // Track if order is already placed

  useEffect(() => {
    if (!orderPlaced.current && userId && profileId && userName && profileName && amount) {
      orderPlaced.current = true; // Set flag to prevent duplicate calls
      placeOrder();
    }
  }, [userId, profileId, userName, profileName, amount]);

  const placeOrder = async () => {
    try {
      const response = await axios.post("https://weskill-8iso.onrender.com/api/orders/place-order", {
        userId,
        profileId,
        userName,
        profileName,
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
