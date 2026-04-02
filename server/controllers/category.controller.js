import CategoryModel from "../models/category.model.js";
import { v2 as cloudinary } from "cloudinary";
import { error, log } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

var imagesArr = [];
export async function uploadImages(request, response) {
  try {
    imagesArr = [];
    const image = request.files;
    console.log("Image ",image);

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < request.files?.length; i++) {
      const img = await cloudinary.uploader.upload(
        request.files[i].path,
        options,
        function (error, result) {
          // console.log(result);

          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
          console.log(request.files[i].filename);
        }
      );
    }

    return response.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function createCategory(request, response) {
  try {
    let category = new CategoryModel({
      name: request.body.name,
      images: imagesArr,
      // color:req.body.color,
      parentId: request.body.parentId,
      parentCatName: request.body.parentCatName,
    });
    if (!category) {
      return response.status(500).json({
        message: "Category not cretaed ",
        error: true,
        success: false,
      });
    }
    category = await category.save();
    imagesArr = [];

    return response.status(200).json({
      message: "Category created",
      success: true,
      error: false,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//geimport CategoryModel from "../models/category.model.js";

export async function getCategories(request, response) {
  try {
    const categories = await CategoryModel.find();
    const categoryMap = {};

    // Step 1: Create a map of all categories
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });

    // Step 2: Create array for root categories
    const rootCategories = [];

    // Step 3: Link each category to its parent if available
    categories.forEach((cat) => {
      if (cat.parentId) {
        const parent = categoryMap[cat.parentId];
        if (parent) {
          console.log("Parent");

          parent.children.push(categoryMap[cat._id]);
        }
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    return response.status(200).json({
      message: "Categories fetched successfully",
      data: rootCategories,
      success: true,
      error:false
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Server Error",
      error: true,
      success: false,
    });
  }
}

export async function getCategoriesCount(request, response) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      parentId: undefined,
    });

    if (!categoryCount) {
      response.status(500).json({
        success: false,
        error: true,
      });
    } else {
      response.send({ categoryCount: categoryCount });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function getSubCategoriesCount(request, response) {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      response.status(500).json({
        success: false,
        error: true,
      });
    } else {
      const subCatList = [];
      for (let cat of categories) {
        if (cat.parentId !== undefined) {
          subCatList.push(cat);
        }
      }
      response.send({ subCategoryCount: subCatList.length });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get single category
export async function getCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);
    if (!category) {
      response.status(500).json({
        message: "The category with given id was not found",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function removeImageFromCloudinary(request, response) {
  try {
    const imgUrl = request.query.img; // get ?img=... from query params

    if (!imgUrl) {
      return response.status(400).json({
        message: "Image URL not provided",
        success: false,
        error: true,
      });
    }

    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1]; // sample_image.jpg
    // const folderName = urlArr[urlArr.length - 2]; // user_avatars

    const imageName = image.split(".")[0]; // sample_image

    if (imageName) {
      const res = await cloudinary.uploader.destroy(imageName);

      if (res.result === "ok") {
        return response.status(200).json({
          message: "Image deleted successfully",
          success: true,
          error:false
        });
      } else {
        return response.status(400).json({
          message: "Failed to delete image from Cloudinary",
          success: false,
        });
      }
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error while deleting image",
      success: false,
      error: true,
    });
  }
}

export async function deleteCategory(request, response) {
  try {
    // 1️⃣ Find category by ID
    const category = await CategoryModel.findById(request.params.id);
    if (!category) {
      return response.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    // 2️⃣ Delete images from Cloudinary (if exist)
    const images = category.images || [];
    let img = "";
    for (img of images) {
      const imgUrl = img; // handle if only URLs are stored

      // Extract public_id from URL (assuming format: https://res.cloudinary.com/xxx/image/upload/v1729/filename.jpg)
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      console.log("Image name ", imageName);

      if (imageName) {
        cloudinary.uploader.destroy(imageName, (error, result) => {
          //console.log(error,result);
        });
      }
    }

    const subCategory = await CategoryModel.find({
      parentId: request.params.id,
    });
    for (let i = 0; i < subCategory.length; i++) {
      console.log(subCategory[i]._id);

      const thirdSubCategory = await CategoryModel.find({
        parentId: subCategory[i]._id,
      });

      for (let j = 0; j < thirdSubCategory.length; j++) {
        await CategoryModel.findByIdAndDelete(thirdSubCategory[j]._id);
      }

      await CategoryModel.findByIdAndDelete(subCategory[i]._id);
    }

    const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
    console.log("Deleted Cat");

    if (!deletedCat) {
      response.status(404).json({
        message: "Category Not Found",
        error: true,
        success: false,
      });
    }

    response.status(200).json({
      error: false,
      success: true,
      message: "Category Deleted",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

export async function updatedCategory(request, response) {
  const category = await CategoryModel.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
      images: imagesArr.length > 0 ? imagesArr[0] : request.body.images,
      // color:request.body.color,
      parentId: request.body.parentId,
      parentCatName: request.body.parentCatName,
    },
    {
      new: true,
    }
  );

  if (!category) {
    return response.status(500).json({
      message: "Category cannot be updated",
      success: false,
      error: true,
    });
  }

  imagesArr = [];
  response.status(200).json({
    error: false,
    success: true,
    category: category,
      message:"Category Updated Successfully"
  });
}
