import BlogModel from "../models/blog.model.js";
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

export async function addBlog(request, response) {
  try {
    let blog = new BlogModel({
      title: request.body.title,
      images: imagesArr,
      // color:req.body.color,
      description: request.body.description,
    
    });
    if (!blog) {
      return response.status(500).json({
        message: "Category not cretaed ",
        error: true,
        success: false,
      });
    }
    blog = await blog.save();
    imagesArr = [];

    return response.status(200).json({
      message: "blog created",
      success: true,
      error: false,
      blog: blog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getBlogs(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10;
        const totalPosts = await BlogModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

          if (page > totalPages) {
      return response.json(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }
 const blogs = await BlogModel.find()
    
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    // 2️⃣ If no products found
    if (!blogs || blogs.length === 0) {
      return response.status(404).json({
        message: "No blogs found",
        success: false,
        error: true,
      });
    }

    // 3️⃣ Return success response
    return response.status(200).json({
      message: "blogs fetched successfully",
      success: true,
      error: false,
      count: blogs.length,
      blogs: blogs,
      page: page,
      totalPages: totalPages,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Server Error",
      error: true,
      success: false,
    });
  }
}
//single
export async function getBlog(request, response) {
  try {
    
    const blog = await BlogModel.findById(request.params.id);
    if (!blog) {
      response.status(500).json({
        message: "The blog with given id was not found",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      blog: blog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function deleteBlog(request, response) {
  try {
    // 1️⃣ Find category by ID
    const blog = await BlogModel.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({
        message: "blog not found",
        error: true,
        success: false,
      });
    }

    // 2️⃣ Delete images from Cloudinary (if exist)
    const images = blog.images || [];
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

   
   

    const deletedBlog = await BlogModel.findByIdAndDelete(request.params.id);
    console.log("Deleted blog");

    if (!deleteBlog) {
      response.status(404).json({
        message: "blog Not Found",
        error: true,
        success: false,
      });
    }

    response.status(200).json({
      error: false,
      success: true,
      message: "blog Deleted",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}
export async function updatedBlog(request, response) {
  const blog = await BlogModel.findByIdAndUpdate(
    request.params.id,
    {
      title: request.body.title,
      images: imagesArr.length > 0 ? imagesArr[0] : request.body.images,
      // color:request.body.color,
   description: request.body.description,
    },
    {
      new: true,
    }
  );

  if (!blog) {
    return response.status(500).json({
      message: "blog cannot be updated",
      success: false,
      error: true,
    });
  }

  imagesArr = [];
  response.status(200).json({
    error: false,
    success: true,
    blog: blog,
      message:"blog Updated Successfully"
  });
}
export async function deleteMultipleBlogs(request, response) {
  try {
    const { ids } = request.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return response.status(400).json({
        message: "No IDs provided",
        error: true,
        success: false,
      });
    }

    // Validate all IDs are valid ObjectIds
    const invalidIds = ids.filter(id => !BlogModel.schema.isValidObjectId(id));
    if (invalidIds.length > 0) {
      return response.status(400).json({
        message: "Invalid ObjectId(s) provided",
        error: true,
        success: false,
      });
    }

    const deletedCount = 0;
    for (const id of ids) {
      const blog = await BlogModel.findById(id);
      if (blog) {
        // Delete images from Cloudinary (if exist)
        const images = blog.images || [];
        for (const imgUrl of images) {
          const urlArr = imgUrl.split("/");
          const image = urlArr[urlArr.length - 1];
          const imageName = image.split(".")[0];
          if (imageName) {
            await new Promise((resolve, reject) => {
              cloudinary.uploader.destroy(imageName, (error, result) => {
                if (error) {
                  console.error("Error deleting image:", error);
                }
                resolve(result);
              });
            });
          }
        }

        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        if (deletedBlog) {
          deletedCount++;
        }
      }
    }

    return response.status(200).json({
      message: `${deletedCount} blog(s) deleted successfully`,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}