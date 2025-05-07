import asyncHandler from "express-async-handler";
import jswt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../Models/user.model.js";
import ApiError from "../Utils/ApiError.js";
import { transporter } from "../Utils/sent-email.js";

const createToken = (payload) => {
  return jswt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc signup a new user
// @route POST /api/v1/auth/signup
// @access Public
export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });
  if (!user) {
    return next(new ApiError("User creation failed", 400));
  }

  const token = createToken({ id: user._id });
  res.status(201).json({
    success: true,
    data: user,
    token,
  });
});

// @desc login a user
// @route POST /api/v1/auth/login
// @access Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Invalid email or password", 401));
  }

  const token = createToken({ id: user._id });
  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});

// @desc protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(
      new ApiError("You are not logged in! Please log in to get access", 401)
    );
  }

  const decoded = jswt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new ApiError("The user belonging to this token does no longer exist", 401)
    );
  }
  if (currentUser.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (changedTimeStamp > decoded.iat) {
      return next(
        new ApiError("User recently changed password! Please login again", 401)
      );
    }
  }

  req.user = currentUser;
  next();
});

// #desc Authencation
// #Access  Public
export const AllowTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });

// @desc forgot password
// @route POST /api/v1/auth/forgotpassword
// @access Public

export const forgotPassword = asyncHandler(async (req, res, next) => {
  // get user by email ,check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  // genrate resetcode and send email and save in database
  const ResetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const resetCodeExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  const secret = "abcdefg";
  const resetCodeHash = crypto
    .createHmac("sha256", secret)
    .update(ResetCode)
    .digest("hex");

  user.resetCode = resetCodeHash;
  user.resetCodeExpired = resetCodeExpire;
  await user.save();

  // send email
  const message = `Dear ${user.name} \n
  You recently requested to reset your password. Use the following code to complete the process: \n
  ${ResetCode}
  If you did not request this, please ignore this email. For security reasons, this code will expire in [ 10 min ].\n
  Best regards,\n
  Egy Events \n
  `;

  const mailOptions = {
    from: "chat-app",
    to: user.email,
    subject: "Password Reset Code",
    text: message,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      user.resetCode = undefined;
      user.resetCodeExpired = undefined;
      user.save();
      return next(new ApiError("Error sending email", 500));
    }
    res.status(200).json({
      status: "success",
      message: "Reset code sent to email",
    });
  });
});

// @desc verify reset code
// @route POST /api/v1/auth/verifyresetcode
// @access Public
export const verifyResetCode = asyncHandler(async (req, res, next) => {
  const secret = "abcdefg";
  const resetCodeHash = crypto
    .createHmac("sha256", secret)
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    resetCode: resetCodeHash,
    resetCodeExpired: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Invalid or expired reset code", 400));
  }
  // reset code is valid
  user.isverified = true;

  await user.save();
  res.status(200).json({
    status: "success",
    message: "Reset code is valid",
  });
});

// @desc reset password
// @route Put /api/v1/auth/resetpassword
// @access Public

export const resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  // check if reset code is valid
  if (!user.isverified) {
    return next(new ApiError("Reset code is not verified", 400));
  }

  user.password = req.body.password;
  user.passwordChangedAt = Date.now();

  user.resetCode = undefined;
  user.resetCodeExpired = undefined;
  user.isverified = false;

  //send email after password reset
  const message = `Your password has been reset successfully.`;
  const mailOptions = {
    from: "chat-app",
    to: user.email,
    subject: "Password Reset Successfully",
    text: message,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(new ApiError("Error sending email", 500));
    }
  });

  await user.save();
  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
});
