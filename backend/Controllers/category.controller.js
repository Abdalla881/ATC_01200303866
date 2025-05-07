import asyncHandler from "express-async-handler";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import Category from "../Models/category.model.js";
import {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} from "./handle-factory.controller.js";
import { uploadSingleImage } from "../Middleware/upload-image.middleware.js";

// @desc    Upload user image
export const uploadCategoryImage = uploadSingleImage("image");

export const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `Category-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/Categories/${filename}`);
    req.body.image = filename;
  }

  next();
});

// @desc    Create a new Category
// @route   POST /api/v1/Categories
// @access  privet (admin)
export const createCateory = createOne(Category);

// @desc    Get all Categories
// @route   GET /api/v1/Categories
// @access  Public
export const getAllCategory = getAll(Category);

// @desc    Get a single Category by ID
// @route   GET /api/v1/Categories/:id
// @access  Public
export const getCategoriesById = getOne(Category);

// @desc    Delete a Category by ID
// @route   DELETE /api/v1/Categories/:id
// @access  privet (admin)
export const deleteCategory = deleteOne(Category);

// @desc    Update a Category by ID
// @route   PUT /api/v1/Categories/:id
// @access  privet (admin)

export const updateCategory = updateOne(Category);
