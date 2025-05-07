import express from "express";
const router = express.Router();

import {
  signup,
  login,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "../Controllers/auth.controller.js";

import { changePasswordValidator } from "../Utils/validators/user.validators.js";

import { createUserValidator } from "../Utils/validators/user.validators.js";

router.post("/signup", createUserValidator, signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyresetcode", verifyResetCode);
router.post("/resetpassword", changePasswordValidator, resetPassword);

export default router;
