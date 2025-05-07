import multer from "multer";
import ApiError from "../Utils/ApiError.js";

// This function sets up the configuration for multer (file upload)
const multerOption = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError(`just image allowed`, 400));
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

// This function enables uploading single image
export const uploadSingleImage = (field) => multerOption().single(field);

// This function enables uploading multiple images with different field names.
export const uploadsMultiImage = (arryOfField) =>
  multerOption().fields(arryOfField);
