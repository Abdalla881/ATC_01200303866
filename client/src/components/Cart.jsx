// components/Cart.jsx
import React from "react";
import UnderProcessingPage from "./UnderProcessingPage"; // Correct import

const Cart = () => {
  return (
    <div className="flex justify-center">
      <UnderProcessingPage /> {/* Use the component here */}
    </div>
  );
};

export default Cart;
