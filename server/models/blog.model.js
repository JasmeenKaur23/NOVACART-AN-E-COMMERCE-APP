import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    //   min: [1, "Quantity must be at least 1"],
    default: "",
  },
  images: [
      {
      type: String, // Array of image URLs
    //  default:'#ffffff'
    }],
  description: {
    type: String,
    required: true,
    //   min: [1, "Quantity must be at least 1"],
    default: "",
  },
  
}, {
    timestamps: true, // adds createdAt & updatedAt
  });

const BlogModel = mongoose.model("blog", blogSchema);

export default BlogModel;
