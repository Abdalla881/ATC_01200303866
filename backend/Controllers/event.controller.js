import asyncHandler from "express-async-handler";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import Event from "../Models/event.model.js";
import Category from "../Models/category.model.js";

import {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} from "./handle-factory.controller.js";

import { uploadsMultiImage } from "../Middleware/upload-image.middleware.js";

export const FilterObject = (req, res, next) => {
  if (req.params.categoryId) {
    req.filterObject = { category: req.params.categoryId };
    console.log(req.filterObject);
  }
  next();
};
// This function enables uploading multiple images with different field names.
export const uploadEventImage = uploadsMultiImage([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

export const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverName = `event-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/Events/${imageCoverName}`);
    req.body.imageCover = imageCoverName;
  }
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (img, index) => {
        req.body.images = [];
        const imageName = `event-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(600, 600)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/Events/${imageName}`);
        req.body.images.push(imageName);
      })
    );
  }
  next();
});

// @desc    Create a new Event
// @route   POST /api/v1/events
// @access  privet (admin)
export const createEvent = createOne(Event);

// @desc    Get all Events
// @route   GET /api/v1/events
// @access  Public
export const getAllEvent = getAll(Event);

// @desc    Get a single Event by ID
// @route   GET /api/v1/events/:id
// @access  Public
export const getEventById = getOne(Event);

// @desc    Delete a Event by ID
// @route   DELETE /api/v1/events/:id
// @access  privet (admin)
export const deleteEvent = deleteOne(Event);

// @desc    Update a Event by ID
// @route   PUT /api/v1/events/:id
// @access  privet (admin)
export const updateEvent = updateOne(Event);

// @desc    Get all Events by category
// @route   GET /api/v1/events/category/:categoryName
// @access  Public

export const getEventsByCategory = asyncHandler(async (req, res, next) => {
  const { categoryName } = req.params;

  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }

  const events = await Event.find({ category: category._id });

  res.status(200).json({
    success: true,
    data: events,
  });
});
