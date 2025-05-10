import express from "express";
const router = express.Router();

import {
  createEvent,
  getAllEvent,
  getEventById,
  deleteEvent,
  updateEvent,
  uploadEventImage,
  resizeImage,
  FilterObject,
  getEventsByCategory,
} from "../Controllers/event.controller.js";

import { protect, AllowTo } from "../Controllers/auth.controller.js";

router
  .route("/")
  .post(protect, AllowTo("admin"), uploadEventImage, resizeImage, createEvent)
  .get(getAllEvent);

router.get("/category/:categoryId", FilterObject, getAllEvent); // ✅ this line

router
  .route("/:id")
  .get(protect, AllowTo("admin"), getEventById)
  .delete(protect, AllowTo("admin"), deleteEvent)
  .put(protect, AllowTo("admin"), uploadEventImage, resizeImage, updateEvent);
export default router;
