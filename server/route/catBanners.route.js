import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {  addBannerV2, deleteBanner, deleteMultipleProduct, getBanner, getBanners, updatedBanner, uploadImages } from "../controllers/catBanner.controller.js";
import { removeImageFromCloudinary } from "../controllers/category.controller.js";

const catBannerRouter=Router()



catBannerRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  uploadImages
);
catBannerRouter.post("/add", auth, addBannerV2);
catBannerRouter.get("/", getBanners);
catBannerRouter.delete("/deleteImage",auth, removeImageFromCloudinary);
catBannerRouter.delete("/:id", auth,deleteBanner);
catBannerRouter.put("/:id", auth,updatedBanner);
catBannerRouter.get("/:id", auth,getBanner);

catBannerRouter.delete("/deleteMultiple",auth, deleteMultipleProduct);


export default catBannerRouter;