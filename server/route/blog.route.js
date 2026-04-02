import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  addBlog,
  deleteBlog,
  deleteMultipleBlogs,
  getBlog,
  getBlogs,
  updatedBlog,
  uploadImages,
} from "../controllers/blog.controller.js";
const blogRouter = Router();

blogRouter.post("/uploadImages", auth, upload.array("images"), uploadImages);
blogRouter.post("/add", auth, addBlog);
blogRouter.get("/", getBlogs);
// blogRouter.delete("/deleteImage",auth, removeImageFromCloudinary);
blogRouter.delete("/:id", auth, deleteBlog);
blogRouter.put("/:id", auth, updatedBlog);
blogRouter.get("/:id",  getBlog);

blogRouter.post("/deleteMultiple",auth, deleteMultipleBlogs);
export default blogRouter