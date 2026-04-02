import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {  addBannerV2, deleteBanner, deleteMultipleProduct, getBanner, getBanners, updatedBanner, uploadImages } from "../controllers/bannerList2.controller.js";
import { removeImageFromCloudinary } from "../controllers/category.controller.js";

const bannerV2Router=Router()



bannerV2Router.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  uploadImages
);
bannerV2Router.post("/add", auth, addBannerV2);
bannerV2Router.get("/", getBanners);
bannerV2Router.delete("/deleteImage",auth, removeImageFromCloudinary);
bannerV2Router.delete("/:id", auth,deleteBanner);
bannerV2Router.put("/:id", auth,updatedBanner);
bannerV2Router.get("/:id", auth,getBanner);

bannerV2Router.delete("/deleteMultiple",auth, deleteMultipleProduct);


export default bannerV2Router;