import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItem: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          required: true,
        },
        seats: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
