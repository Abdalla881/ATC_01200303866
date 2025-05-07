import slugify from "slugify";
import { check } from "express-validator";
import validatorMiddelwere from "../../Middleware/validators.middlewere.js";
import Category from "../../Models/category.model.js";
import ApiError from "../ApiError.js";

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Category name must be between 3 and 20 characters")
    .custom((value, { req }) => {
      if (value) {
        req.body.slug = slugify(value, { lower: true });
      }
      return true;
    })
    .custom((value, { req }) => {
      return Category.findOne({ slug: value }).then((category) => {
        if (category) {
          return Promise.reject("Category name already in use");
        }
      });
    }),
  check("image").optional().notEmpty().withMessage("Image is required"),
  validatorMiddelwere,
];

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  check("name")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Category name must be between 3 and 20 characters")
    .custom((value, { req }) => {
      if (value) {
        req.body.slug = slugify(value, { lower: true });
      }
      return true;
    })
    .custom((value, { req }) => {
      return Category.findOne({ slug: value }).then((category) => {
        if (category) {
          return Promise.reject("Category name already in use");
        }
      });
    }),
  check("image").optional().notEmpty().withMessage("Image is required"),
  validatorMiddelwere,
];

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  validatorMiddelwere,
];
export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  validatorMiddelwere,
];
