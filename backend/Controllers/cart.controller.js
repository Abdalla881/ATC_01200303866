import asyncHandler from "express-async-handler";

import Cart from "../Models/cart.model.js";
import Event from "../Models/event.model.js";

const totalPrice = (cartItem) => {
  return cartItem.reduce((total, item) => total + item.seats * item.price, 0);
};

// @desc Create cart
// @route Post api/v1/carts
// @access privet(user)
export const createCart = asyncHandler(async (req, res) => {
  // Check if the user already has a cart
  let existingCart = await Cart.findOne({ user: req.user._id });
  const event = await Event.findById(req.body.eventId);
  if (!existingCart) {
    // If no cart exists, create a new one
    existingCart = await Cart.create({
      user: req.user._id,
      cartItem: [
        {
          eventId: req.body.eventId,
          seats: req.body.seats,
          price: event.price,
        },
      ],
    });
  } else {
    const eventIndex = existingCart.cartItem.findIndex(
      (item) => item.eventId.toString() === req.body.eventId
    );
    if (eventIndex !== -1) {
      // If the event already exists in the cart, update the quantity
      existingCart.cartItem[eventIndex].seats += req.body.seats;
    } else {
      // If the event doesn't exist, add it to the cart
      existingCart.cartItem.push({
        eventId: req.body.eventId,
        seats: req.body.seats,
        price: event.price,
      });
    }
    // Calculate the total price
    existingCart.totalPrice = totalPrice(existingCart.cartItem);
    // Save the updated cart
    await existingCart.save();
  }
  res.status(201).json({
    status: "success",
    data: {
      cart: existingCart,
    },
  });
});

// @desc Get logged cart
// @route Get api/v1/carts
// @access privet(user)
export const getLoggedCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "No cart found for this user",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

// @desc Update logged cart
// @route Put api/v1/carts
// @access privet(user)
export const updateLoggedCart = asyncHandler(async (req, res, next) => {
  const { eventId, seats } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "No cart found for this user",
    });
  }
  const eventIndex = cart.cartItem.findIndex(
    (item) => item.eventId.toString() === eventId
  );
  if (eventIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Event not found in cart",
    });
  }
  cart.cartItem[eventIndex].seats = seats;
  // Calculate the total price
  cart.totalPrice = totalPrice(cart.cartItem);
  await cart.save();
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

// @desc remove item from cart
// @route DELETE api/v1/carts
// @access privet(user)
export const removeItemFromCart = asyncHandler(async (req, res, next) => {
  const { eventId } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItem: { eventId } } },
    { new: true }
  );
  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "No cart found for this user",
    });
  }
  // Calculate the total price
  cart.totalPrice = totalPrice(cart.cartItem);
  await cart.save();
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

// @desc Clear cart
// @route DELETE api/v1/carts/clear
// @access privet(user)

export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "No cart found for this user",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
