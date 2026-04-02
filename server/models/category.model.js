import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
      type: String, // Array of image URLs
    //  default:'#ffffff'
    }],
    // color: {
    //   type: String,
    //   // Optional default color
    // },
    parentCatName: {
      type: String,
     
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Refers to another category (self-reference)
      default: null,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
