import express from "express";
const router = express.Router();

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changePassword,
} from "../Controllers/user.controller.js";
import {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserByIdValidator,
  changePasswordValidator,
} from "../Utils/validators/user.validators.js";

import { protect, AllowTo } from "../Controllers/auth.controller.js";

router.put(
  "/change-password",
  protect,
  changePasswordValidator,
  changePassword
);

router
  .route("/")
  .post(uploadUserImage, resizeImage, createUserValidator, createUser)
  .get(protect, AllowTo("admin"), getAllUsers);

router
  .route("/:id")
  .get(protect, AllowTo("admin"), getUserByIdValidator, getUserById)
  .delete(deleteUserValidator, deleteUser)
  .put(protect, uploadUserImage, resizeImage, updateUserValidator, updateUser);

export default router;
