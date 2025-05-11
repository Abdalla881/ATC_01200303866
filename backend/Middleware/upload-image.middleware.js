import multer from "multer";
import ApiError from "../Utils/ApiError.js";
import cloudinary from "../Config/cloudinary.js";
import streamifier from "streamifier";

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

export const uploadToCloudinary = (buffer, filename, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename,
        resource_type: "image",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const deleteImageFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Error deleting image:", err);
  }
};

// This function enables uploading single image
export const uploadSingleImage = (field) => multerOption().single(field);

// This function enables uploading multiple images with different field names.
export const uploadsMultiImage = (arryOfField) =>
  multerOption().fields(arryOfField);
