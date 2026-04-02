import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  createProduct,
  createProductRAMS,
  createProductSize,
  createProductWEIGHT,
  deleteMultipleProduct,
  
  deleteProduct,
  deleteProductRAMS,
  deleteProductSize,
  deleteProductWEIGHT,
  filters,
  getAllFeaturedProducts,
  getAllProducts,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsByPrice,
  getAllProductsByRating,
  getAllProductsBySubCatId,
  getAllProductsBySubCatName,
  getAllProductsByThirdLevelCatId,
  getAllProductsByThirdLevelCatName,
  getProduct,
  getProductRams,
  getProductRamsById,
  getProductsCount,
  getProductSize,
  getProductSizeById,
  getProductWeight,
  getProductWeightById,
  searchProductController,
  sortBy,
  // removeImageFromCloudinary,
  updateProduct,
  updateProductRams,
  updateProductSize,
  updateProductWeight,
  uploadBannerImages,
  uploadImages,
} from "../controllers/product.controller.js";
import { removeImageFromCloudinary } from "../controllers/category.controller.js";

const productRouter = Router();

productRouter.post("/uploadImages", auth, upload.array("images"), uploadImages);
productRouter.post("/uploadBannerImages", auth, upload.array("bannerimages"), uploadBannerImages);
productRouter.post("/create", auth, createProduct);
productRouter.get("/getAllProducts", getAllProducts);

productRouter.get("/getAllProductsByCatId/:id", getAllProductsByCatId);
productRouter.get("/getAllProductsByCatName", getAllProductsByCatName);

productRouter.get("/getAllProductsBySubCatId/:id", getAllProductsBySubCatId);
productRouter.get("/getAllProductsBySubCatName", getAllProductsBySubCatName);

productRouter.get(
  "/getAllProductsByThirdLevelCatId/:id",
  getAllProductsByThirdLevelCatId
);
productRouter.get(
  "/getAllProductsByThirdLevelCatName",
  getAllProductsByThirdLevelCatName
);
productRouter.get("/getAllProductsByPrice", getAllProductsByPrice);
productRouter.get("/getAllProductsByRating", getAllProductsByRating);
productRouter.get("/getAllProductsCount", getProductsCount);
productRouter.get("/getAllFeaturedProducts", getAllFeaturedProducts);

productRouter.delete("/deleteMultiple",auth, deleteMultipleProduct);
productRouter.delete("/:id",auth, deleteProduct);
productRouter.get("/:id", getProduct);
productRouter.post("/search/get", searchProductController);

productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.put("/updateProduct/:id", auth, updateProduct);

//rams
productRouter.post("/productRAMS/create", auth, createProductRAMS);
productRouter.delete("/productRAMS/:id",auth, deleteProductRAMS);
productRouter.put("/productRAMS/:id", auth, updateProductRams);
productRouter.get("/productRAMS/get", auth, getProductRams);
productRouter.get("/productRAMS/:id", auth, getProductRamsById);



//weight
productRouter.post("/productWeight/create", auth, createProductWEIGHT);
productRouter.delete("/productWeight/:id",auth, deleteProductWEIGHT);
productRouter.put("/productWeight/:id", auth, updateProductWeight);
productRouter.get("/productWeight/get", auth, getProductWeight);
productRouter.get("/productWeight/:id", auth, getProductWeightById);




//size
productRouter.post("/productSize/create", auth, createProductSize);
productRouter.delete("/productSize/:id",auth, deleteProductSize);
productRouter.put("/productSize/:id", auth, updateProductSize);
productRouter.get("/productSize/get", auth, getProductSize);
productRouter.get("/productSize/:id", auth, getProductSizeById);

//filter

productRouter.post("/filters", auth, filters);
productRouter.post("/sortBy", auth, sortBy);



export default productRouter;
