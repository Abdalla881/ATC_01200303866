import slugify from "slugify";

import { check } from "express-validator";
import validatorMiddelwere from "../../Middleware/validators.middlewere.js";
import User from "../../Models/user.model.js";
import ApiError from "../ApiError.js";

export const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .custom((value, { req }) => {
      if (value) {
        req.body.slug = slugify(value, { lower: true });
      }
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage(
      "Please provide a valid phone number in Egypt or Saudi Arabia"
    ),

  validatorMiddelwere,
];

export const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  check("name")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .custom((value, { req }) => {
      if (value) {
        req.body.slug = slugify(value, { lower: true });
      }
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Please provide a valid phone number"),
  validatorMiddelwere,
];

export const deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  validatorMiddelwere,
];
export const getUserByIdValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  validatorMiddelwere,
];

export const changePasswordValidator = [
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        return Promise.reject("Passwords do not match");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .isLength({ min: 6 })
    .withMessage("Password confirmation must be at least 6 characters"),
  validatorMiddelwere,
];
