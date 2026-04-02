import HomeSliderModel from "../models/homeSlider.model.js";

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
    console.log("Image ", image);

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

export async function addHomeSlide(request, response) {
  try {
    let slide = new HomeSliderModel({
      images: imagesArr,
    });

    if (!slide) {
      return response.status(500).json({
        message: "Slide Not Created ",
        error: true,
        success: false,
      });
    }

    slide = await slide.save();
    imagesArr = [];

    return response.status(200).json({
      message: "slide created",
      success: true,
      error: false,
      category: slide,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getHomeSlides(request, response) {
  try {
    const slides = await HomeSliderModel.find();
    // const categoryMap = {};

    if (!slides) {
      return response.status(404).json({
        message: "Slides Not Found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Slides fetched successfully",
      data: slides,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Server Error",
      error: true,
      success: false,
    });
  }
}

export async function getSlide(request, response) {
  try {
    const slide = await HomeSliderModel.findById(request.params.id);
    if (!slide) {
      response.status(500).json({
        message: "The slide with given id was not found",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      slide: slide,
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

export async function deleteSlide(request, response) {
  try {
    // 1️⃣ Find category by ID
    const slide = await HomeSliderModel.findById(request.params.id);
    if (!slide) {
      return response.status(404).json({
        message: "slide not found",
        error: true,
        success: false,
      });
    }

    // 2️⃣ Delete images from Cloudinary (if exist)
    const images = slide.images || [];
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

   

    const deletedSlide = await HomeSliderModel.findByIdAndDelete(request.params.id);
    console.log("Deleted Slide");

    if (!deletedSlide) {
      response.status(404).json({
        message: "Slide Not Found",
        error: true,
        success: false,
      });
    }

  return  response.status(200).json({
      error: false,
      success: true,
      message: "Slide Deleted",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}
export async function updatedSlide(request, response) {
  const slide = await HomeSliderModel.findByIdAndUpdate(
    request.params.id,
    {
     
      images: imagesArr.length > 0 ? imagesArr : request.body.images,

     
    },
    {
      new: true,
    }
  );

  if (!slide) {
    return response.status(500).json({
      message: "slide cannot be updated",
      success: false,
      error: true,
    });
  }

  imagesArr = [];
  response.status(200).json({
    error: false,
    success: true,
    slide: slide,
    message:"Slide Updated Successfully"
  });
}
export async function deleteMultipleSlides(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(404).json({
      message: "Invalid Input",
      success: false,
      error: true,
    });
  }

  for (let i = 0; i < ids?.length; i++) {
    const product = await HomeSliderModel.findById(ids[i]);

    const images = product.images || [];

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
  }

  try {
    await HomeSliderModel.deleteMany({
      _id: {
        $in: ids,
      },
    });

    response.status(200).json({
      message: "Slide  deleted Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    // 4️⃣ Handle any server/database error
    return response.status(500).json({
      message: error.message || "Something went wrong while delting slide  products",
      success: false,
      error: true,
    });
  }
}