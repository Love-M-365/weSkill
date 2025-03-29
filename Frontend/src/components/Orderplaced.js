import React from "react";

const SuccessPage = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <div className="card p-4">
        <h1 className="text-success mb-4">Payment Successful!</h1>
        <p>Your order has been placed successfully. You can check your order in the orders section.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
