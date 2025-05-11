import asyncHandler from "express-async-handler";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import Event from "../Models/event.model.js";
import Category from "../Models/category.model.js";
import {
  uploadToCloudinary,
  deleteImageFromCloudinary,
} from "../Middleware/upload-image.middleware.js";

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
  // Handle imageCover: Delete old image and upload new one
  if (req.body.imageCover?.public_id) {
    // Delete old image
    await deleteOldImage(req.body.imageCover.public_id);
  }

  if (req.files.imageCover) {
    const filename = `event-${uuidv4()}-cover`;
    const buffer = await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .jpeg({ quality: 90 })
      .toBuffer();

    const uploadedCover = await uploadToCloudinary(buffer, filename, "Events");

    req.body.imageCover = uploadedCover.secure_url;
    req.body.imageCoverPublicId = uploadedCover.public_id;
  }

  // Handle images: Delete old images and upload new ones
  if (req.body.images?.length) {
    await Promise.all(
      req.body.images.map(async (img) => {
        if (img?.public_id) {
          // Delete old image
          await deleteOldImage(img.public_id);
        }
      })
    );
  }

  if (req.files.images) {
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (img, index) => {
        const filename = `event-${uuidv4()}-${index + 1}`;
        const buffer = await sharp(img.buffer)
          .resize(600, 600)
          .jpeg({ quality: 90 })
          .toBuffer();

        const uploadedImage = await uploadToCloudinary(
          buffer,
          filename,
          "Events"
        );

        req.body.images.push({
          url: uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
        });
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
