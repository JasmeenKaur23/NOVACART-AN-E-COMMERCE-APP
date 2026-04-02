import BannerList2Model from "../models/bannerList2.model.js";
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
//add
export async function addBannerV2(request, response) {
  try {
    let banner = new BannerList2Model({
      // bannerTitle: request.body.bannerTitle,
      images: imagesArr,
      // color:req.body.color,
      // catId: request.body.catId,
      // subCatId: request.body.subCatId,
      // thirdSubCatId: request.body.thirdSubCatId,
      // price: request.body.price,
      // alignInfo:request?.body?.alignInfo
    });
    if (!banner) {
      return response.status(500).json({
        message: "Banner  not cretaed ",
        error: true,
        success: false,
      });
    }
    banner = await banner.save();
    imagesArr = [];

    return response.status(200).json({
      message: "Banner V2 created",
      success: true,
      error: false,
      banner: banner,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getBanners(request, response) {
  try {
    const banners = await BannerList2Model.find();

    if (!banners) {
      return response.status(500).json({
        message: "Banner V2  not found ",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Banners V2 fetched successfully",
      data: banners,
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

export async function deleteBanner(request, response) {
  try {
    // 1️⃣ Find category by ID
    const banner = await BannerList2Model.findById(request.params.id);
    if (!banner) {
      return response.status(404).json({
        message: "Banner V2 not found",
        error: true,
        success: false,
      });
    }

    // 2️⃣ Delete images from Cloudinary (if exist)
    const images = banner.images || [];
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

    const deletedBanner = await BannerList2Model.findByIdAndDelete(
      request.params.id
    );
    console.log("Deleted deletedBanner");

    if (!deletedBanner) {
      response.status(404).json({
        message: "Banner v2 Not Found",
        error: true,
        success: false,
      });
    }

    response.status(200).json({
      error: false,
      success: true,
      message: "Banner Deleted",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

export async function updatedBanner(request, response) {
  const banner = await BannerList2Model.findByIdAndUpdate(
    request.params.id,
    {
      // bannerTitle: request.body.bannerTitle,
      // images: imagesArr.length > 0 ? imagesArr[0] : request.body.images,
      images: imagesArr.length > 0 ? imagesArr : request.body.images


      // color:req.body.color,
      // catId: request.body.catId,
      // subCatId: request.body.subCatId,
      // thirdSubCatId: request.body.thirdSubCatId,
      // price: request.body.price,
      //  alignInfo:request?.body?.alignInfo
    },
    {
      new: true,
    }
  );

  if (!banner) {
    return response.status(500).json({
      message: "Bnner cannot be updated",
      success: false,
      error: true,
    });
  }

  imagesArr = [];
  response.status(200).json({
    error: false,
    success: true,
    banner: banner,
    message: "banner Updated Successfully",
  });
}
//single Banner
export async function getBanner(request, response) {
  try {
    const banner = await BannerList2Model.findById(request.params.id);
    if (!banner) {
      response.status(500).json({
        message: "The banner with given id was not found",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      banner: banner,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteMultipleProduct(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(404).json({
      message: "Invalid Input",
      success: false,
      error: true,
    });
  }

  for (let i = 0; i < ids?.length; i++) {
    const banner = await BannerList2Model.findById(ids[i]);

    const images = banner.images || [];

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
    await BannerList2Model.deleteMany({
      _id: {
        $in: ids,
      },
    });

    response.status(200).json({
      message: "banner deleted Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    // 4️⃣ Handle any server/database error
    return response.status(500).json({
      message: error.message || "Something went wrong while fetching products",
      success: false,
      error: true,
    });
  }
}