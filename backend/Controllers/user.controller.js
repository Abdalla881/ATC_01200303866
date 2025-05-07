import asyncHandler from "express-async-handler";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import ApiError from "../Utils/ApiError.js";
import User from "../Models/user.model.js";
import {
  createOne,
  getAll,
  getOne,
  deleteOne,
} from "../Controllers/handle-factory.controller.js";
import { uploadSingleImage } from "../Middleware/upload-image.middleware.js";

export const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);
    req.body.profileImg = filename;
  }

  next();
});

// @desc    Upload user image
export const uploadUserImage = uploadSingleImage("profileImg");

// @desc    Create a new user
// @route   POST /api/v1/users
// @access  Public
export const createUser = createOne(User);

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
export const getAllUsers = getAll(User);

// @desc    Get a single user by ID
// @route   GET /api/v1/users/:id
// @access  Public
export const getUserById = getOne(User);

// @desc    Update a user by ID
// @route   PUT /api/v1/users/:id
// @access  Public
export const updateUser = asyncHandler(async (req, res, next) => {
  const { profileImg, name, email, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { profileImg, email, name, phone },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  user.password = req.body.password;
  user.passwordChangedAt = Date.now();
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Delete a user by ID
// @route   DELETE /api/v1/users/:id
// @access  Public
export const deleteUser = deleteOne(User);
