import express from "express";
const router = express.Router();

import {
  uploadCategoryImage,
  resizeImage,
  createCateory,
  getAllCategory,
  getCategoriesById,
  deleteCategory,
  updateCategory,
} from "../Controllers/category.controller.js";

import {
  createCategoryValidator,
  updateCategoryValidator,
  getCategoryValidator,
  deleteCategoryValidator,
} from "../Utils/validators/categories.validators.js";

import { protect, AllowTo } from "../Controllers/auth.controller.js";

router
  .route("/")
  .post(
    protect,
    AllowTo("admin"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCateory
  )
  .get(getAllCategory);

router
  .route("/:id")
  .get(protect, AllowTo("admin"), getCategoryValidator, getCategoriesById)
  .delete(protect, AllowTo("admin"), deleteCategoryValidator, deleteCategory)
  .put(
    protect,
    AllowTo("admin"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  );

export default router;
