import express from "express";
const router = express.Router();
import {
  createCart,
  getLoggedCart,
  updateLoggedCart,
  removeItemFromCart,
  clearCart,
} from "../Controllers/cart.controller.js";

import { protect, AllowTo } from "../Controllers/auth.controller.js";

router.use(protect, AllowTo("user"));
router
  .route("/")
  .post(createCart)
  .get(getLoggedCart)
  .put(updateLoggedCart)
  .delete(removeItemFromCart);
router.route("/clear").delete(clearCart);

export default router;
