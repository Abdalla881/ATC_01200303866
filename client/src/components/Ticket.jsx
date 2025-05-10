import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Ticket = ({ title, desc, price, imageCover }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("userToken") !== null;
  const imageUrl = `http://localhost:5001/uploads/${imageCover}`;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("You must be logged in to add items to the cart.");
      navigate("/login");
      return;
    }

    console.log("Added to cart:", { title, price, quantity });
    // Add your actual cart logic here
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 max-w-xs w-full flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{desc}</p>
      <p className="text-sm font-medium mb-4">Price: ${price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={handleDecrement}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
        >
          −
        </button>
        <span className="text-sm font-semibold">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Ticket;
