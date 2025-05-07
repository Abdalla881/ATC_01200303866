import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxLength: [20, "Name should not exceed 20 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
  },
  {
    timestamps: true,
  }
);

const model = new mongoose.model("cateory", categorySchema);
export default model;
