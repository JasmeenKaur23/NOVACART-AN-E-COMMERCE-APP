import ProductModel from "../models/product.model.js";
import ProductRAMSModel from "../models/productRAMS.js";
import { v2 as cloudinary } from "cloudinary";
import { error, log } from "console";
import fs from "fs";
import ProductWEIGHTModel from "../models/productWEIGHT.js";
import ProductSIZEModel from "../models/productSIZE.js";

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
    console.log(image);

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
var bannerImage = [];
export async function uploadBannerImages(request, response) {
  try {
    bannerImage = [];
    const image = request.files;
    console.log(image);

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

          bannerImage.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
          console.log(request.files[i].filename);
        }
      );
    }

    return response.status(200).json({
      images: bannerImage,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function createProduct(request, response) {
  try {
    const {
      name,
      description,
      bannerTitleName,
      brand,
      price,
      oldPrice,
      catName,
      catId,
      subCatId,
      subCat,
      thirdSubCat,
      thirdSubCatId,
      thirdsubCatName,
      category,
      countInStock,
      rating,
      isFeatured,
      discount,
      productRam,
      size,
      productWeight,
      isDisplayOnHomeBanner,
    } = request.body;

    const product = new ProductModel({
      name,
      description,
      images: imagesArr, // from uploadImages()
      bannerImages: bannerImage,
      bannerTitleName,
      brand,
      price,
      oldPrice,
      catName,
      catId,
      subCatId,
      subCat,
      thirdSubCat,
      thirdSubCatId,
      thirdsubCatName,
      category,
      countInStock,
      rating,
      isFeatured,
      discount,
      productRam,
      size,
      productWeight,
      isDisplayOnHomeBanner,
    });
    console.log(product);

    const savedproduct = await product.save();
    if (!savedproduct) {
      return response.status(400).json({
        message: "Product Not Created",
        error: true,
        success: false,
      });
    }
    imagesArr = [];

    return response.status(201).json({
      message: "Product created successfully",
      success: true,
      error: false,
      product: savedproduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProducts(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.json(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    // 1️⃣ Fetch all products from MongoDB
    const products = await ProductModel.find()
      .populate("category")

      // .skip((page - 1) * perPage)
      // .limit(perPage)
      // .exec();

    // 2️⃣ If no products found
    if (!products || products.length === 0) {
      return response.status(404).json({
        message: "No products found",
        success: false,
        error: true,
      });
    }
    

    // 3️⃣ Return success response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
           products: products,
      // count: products.length,
 
      // page: page,
      // totalPages: totalPages,
      count: products.length,
page: 1,
totalPages: 1,

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
//by cat Id
// export async function getAllProductsByCatId(request, response) {
//   try {
//     const page = parseInt(request.query.page) || 1;
//     const perPage = parseInt(request.query.perPage) || 10;
//     const totalPosts = await ProductModel.countDocuments();
//     const totalPages = Math.ceil(totalPosts / perPage);

//     if (page > totalPages) {
//       return response.status(404).json({
//         message: "Page not found",
//         success: false,
//         error: true,
//       });
//     }

//     // 1️⃣ Fetch all products from MongoDB
//     const products = await ProductModel.find({
//       catId: request.params.id,
//     })
//       .populate("category")
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .exec();

//     // 2️⃣ If no products found
//     if (!products || products.length === 0) {
//       return response.status(404).json({
//         message: "No products found",
//         success: false,
//         error: true,
//       });
//     }

//     // 3️⃣ Return success response
//     return response.status(200).json({
//       message: "Products fetched successfully",
//       success: true,
//       error: false,
//       count: products.length,
//       products: products,
//       page: page,
//       totalPages: totalPages,
//     });
//   } catch (error) {
//     // 4️⃣ Handle any server/database error
//     return response.status(500).json({
//       message: error.message || "Something went wrong while fetching products",
//       success: false,
//       error: true,
//     });
//   }
// }
export async function getAllProductsByCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const totalPosts = await ProductModel.countDocuments({
      catId: request.params.id
    });

    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages && totalPosts > 0) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      catId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    // ✅ Not an error — just empty
    return response.status(200).json({
      message: products.length === 0 ? "No products found" : "Products fetched",
      success: true,
      error: false,
      products: products,
      count: products.length,
      page,
      totalPages
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Server error",
      success: false,
      error: true,
    });
  }
}

//by cat anme
export async function getAllProductsByCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    // 1️⃣ Fetch all products from MongoDB
    const products = await ProductModel.find({
      catName: request.query.catName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    // 2️⃣ If no products found
    if (!products || products.length === 0) {
      return response.status(404).json({
        message: "No products found",
        success: false,
        error: true,
        products: products,
      });
    }

    // 3️⃣ Return success response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      count: products.length,
      products: products,
      page: page,
      totalPages: totalPages,
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
//by subcat Id
export async function getAllProductsBySubCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    // 1️⃣ Fetch all products from MongoDB
    const products = await ProductModel.find({
      subCatId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    // 2️⃣ If no products found
    if (!products || products.length === 0) {
      return response.status(404).json({
        message: "No products found",
        success: false,
        error: true,
      });
    }

    // 3️⃣ Return success response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      count: products.length,
      products: products,
      page: page,
      totalPages: totalPages,
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
//by subcat name
export async function getAllProductsBySubCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    // 1️⃣ Fetch all products from MongoDB
    const products = await ProductModel.find({
      subCat: request.query.subCat,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    // 2️⃣ If no products found
    if (!products || products.length === 0) {
      return response.status(404).json({
        message: "No products found",
        success: false,
        error: true,
        products: products,
      });
    }

    // 3️⃣ Return success response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      count: products.length,
      products: products,
      page: page,
      totalPages: totalPages,
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
//by 3rd subcat Id
export async function getAllProductsByThirdLevelCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    // 1️⃣ Fetch all products from MongoDB
    const products = await ProductModel.find({
      thirdSubCatId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    // 2️⃣ If no products found
    if (!products || products.length === 0) {
      return response.status(404).json({
        message: "No products found",
        success: false,
        error: true,
      });
    }

    // 3️⃣ Return success response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      count: products.length,
      products: products,
      page: page,
      totalPages: totalPages,
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
//by 3rd subcat name
export async function getAllProductsByThirdLevelCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    // 1️⃣ Fetch all products from MongoDB
    const products = await ProductModel.find({
      thirdsubCat: request.query.thirdSubCat,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    // 2️⃣ If no products found
    if (!products || products.length === 0) {
      return response.status(404).json({
        message: "No products found",
        success: false,
        error: true,
        products: products,
      });
    }

    // 3️⃣ Return success response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      count: products.length,
      products: products,
      page: page,
      totalPages: totalPages,
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
//get all products by price
export async function getAllProductsByPrice(request, response) {
  try {
    const { catId, subCatId, thirdsubCatId, minPrice, maxPrice } =
      request.query;
    let productList = [];

    // 🟩 Determine filter base
    if (catId) {
      productList = await ProductModel.find({ catId }).populate("category");
    } else if (subCatId) {
      productList = await ProductModel.find({ subCatId }).populate("category");
    } else if (thirdsubCatId) {
      productList = await ProductModel.find({ thirdsubCatId }).populate(
        "category"
      );
    } else {
      productList = await ProductModel.find().populate("category");
    }

    // 🟨 Price filtering logic (corrected)
    const filteredProducts = productList.filter((product) => {
      const price = product.price;
      if (minPrice && price < parseInt(minPrice)) return false;
      if (maxPrice && price > parseInt(maxPrice)) return false;
      return true;
    });

    // 🟦 Response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      count: filteredProducts.length,
      products: filteredProducts,
      page: 1,
      totalPages: 1,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message ||
        "Something went wrong while filtering products by price",
      success: false,
      error: true,
    });
  }
}
//by rating bit changed video 33 if any issue
export async function getAllProductsByRating(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    // 🧠 Build filter dynamically
    const filter = {};

    if (request.query.rating) {
      filter.rating = { $gte: parseFloat(request.query.rating) }; // get products >= rating
    }
    if (request.query.catId) {
      filter.catId = request.query.catId;
    }
    if (request.query.subCatId) {
      filter.subCatId = request.query.subCatId;
    }
    if (request.query.thirdsubCatId) {
      filter.thirdsubCatId = request.query.thirdsubCatId;
    }

    // 📊 Count only filtered documents
    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages && totalPosts > 0) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    // 📦 Fetch filtered + paginated products
    const products = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    // 🧩 No products found
    if (products.length === 0) {
      return response.status(404).json({
        message: "No products found for given rating/filter",
        success: false,
        error: true,
        products: [],
      });
    }

    // ✅ Success response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      count: products.length,
      products,
      page,
      totalPages,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Something went wrong while fetching products",
      success: false,
      error: true,
    });
  }
}

//get all products count
export async function getProductsCount(request, response) {
  try {
    const productsCount = await ProductModel.countDocuments();

    if (!productsCount) {
      return response.status(500).json({
        message: error.message || "products count error",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "Success",
      productsCount: productsCount,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Something went wrong while fetching products",
      success: false,
      error: true,
    });
  }
}
//get all featured products
export async function getAllFeaturedProducts(request, response) {
  try {
    // 1️⃣ Fetch all products from MongoDB
    const products = await ProductModel.find({
      isFeatured: true,
    }).populate("category");

    // 2️⃣ If no products found
    if (!products || products.length === 0) {
      return response.status(404).json({
        message: "No products found",
        success: false,
        error: true,
        products: products,
      });
    }

    // 3️⃣ Return success response
    return response.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      count: products.length,
      products: products,
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
//delete roduct
export async function deleteProduct(request, response) {
  try {
    const product = await ProductModel.findById(request.params.id).populate(
      "category"
    );

    if (!product) {
      return response.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }
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

    const deletedProduct = await ProductModel.findByIdAndDelete(
      request.params.id
    );
    // const MyListItems=await myList.find({productId:request.params.id})
    //       for(var i=0;i<myListItems.length;i++)
    //       {
    //         await MyList.findByIdAndDelete(myListItems[i].id)
    //       }
    //       const cartItems=await Cart.find({productId:request.params.id})
    //       for(var i=0;i<cartItems.length;i++)
    //       {
    //         await Cart.findByIdAndDelete(cartItems[i].id)
    //       }
    if (!deletedProduct) {
      response.status(404).json({
        message: "Product not fodeletedund",
        success: false,
        error: true,
      });
    }
    response.status(200).json({
      message: "Product deleted",
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
    const product = await ProductModel.findById(ids[i]);

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
    await ProductModel.deleteMany({
      _id: {
        $in: ids,
      },
    });

    response.status(200).json({
      message: "Product deleted Successfully",
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
//get product single
export async function getProduct(request, response) {
  try {
    const product = await ProductModel.findById(request.params.id).populate(
      "category"
    );
    if (!product) {
      return response.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "success get product",
      success: true,
      error: false,
      product: product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Something went wrong while fetching products",
      success: false,
      error: true,
    });
  }
}
//delete images
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
          error: false,
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

//put update
export async function updateProduct(request, response) {
  try {
    const { id } = request.params;

    // 1️⃣ Check if product exists
    const product = await ProductModel.findById(id);
    if (!product) {
      return response.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    // 2️⃣ Update product details
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        name: request.body.name,
        description: request.body.description,
        brand: request.body.brand,
        bannerTitleName: request.body.bannerTitleName,
        price: request.body.price,
        oldPrice: request.body.oldPrice,
        newPrice: request.body.newPrice,
        catName: request.body.catName,
        catId: request.body.catId,
        subCatId: request.body.subCatId,
        subCat: request.body.subCat,
        subCatName: request.body.subCatName,
        thirdSubCatId: request.body.thirdSubCatId,
        thirdsubCatName: request.body.thirdsubCatName,
        thirdSubCat: request.body.thirdSubCat,
        countInStock: request.body.countInStock,
        rating: request.body.rating,
        isFeatured: request.body.isFeatured,
        discount: request.body.discount,
        productRam: request.body.productRam,
        size: request.body.size,
        productWeight: request.body.productWeight,
        images: request.body.images,
        bannerImages: request.body.bannerImages,
        isDisplayOnHomeBanner: request.body.isDisplayOnHomeBanner,
      },
      { new: true } // ✅ returns the updated document
    );
    imagesArr = [];
    // 3️⃣ Return updated product
    return response.status(200).json({
      message: "Product updated successfully",
      success: true,
      error: false,
      product: updatedProduct,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Something went wrong while updating product",
      success: false,
      error: true,
    });
  }
}

export async function createProductRAMS(request, response) {
  try {
    let productRAMS = ProductRAMSModel({
      name: request.body.name,
    });
    const savedproductRAMS = await productRAMS.save();
    if (!savedproductRAMS) {
      return response.status(400).json({
        message: "RAMS  Not Created",
        error: true,
        success: false,
      });
    }

    return response.status(201).json({
      message: "Product RAMS created successfully",
      success: true,
      error: false,
      product: savedproductRAMS,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while Creating rams products",
      success: false,
      error: true,
    });
  }
}
export async function deleteProductRAMS(request, response) {
  try {
    const productRams = await ProductRAMSModel.findById(request.params.id);
    if (!productRams) {
      return response.status(404).json({
        message: "Product RAMS not found",
        success: false,
        error: true,
      });
    }

    const deletedProductRams = await ProductRAMSModel.findByIdAndDelete(
      request.params.id
    );
    // const MyListItems=await myList.find({productId:request.params.id})
    //       for(var i=0;i<myListItems.length;i++)
    //       {
    //         await MyList.findByIdAndDelete(myListItems[i].id)
    //       }
    //       const cartItems=await Cart.find({productId:request.params.id})
    //       for(var i=0;i<cartItems.length;i++)
    //       {
    //         await Cart.findByIdAndDelete(cartItems[i].id)
    //       }
    if (!deletedProductRams) {
      response.status(404).json({
        message: "Rams Not deleted",
        success: false,
        error: true,
      });
    }
    response.status(200).json({
      message: "Product RAMS deleted",
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

export async function updateProductRams(request, response) {
  try {
    const { id } = request.params;

    // 1️⃣ Check if product exists
    const productRams = await ProductRAMSModel.findById(id);
    if (!productRams) {
      return response.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    // 2️⃣ Update product details
    const updatedProduct = await ProductRAMSModel.findByIdAndUpdate(
      id,
      {
        name: request.body.name,
      },
      { new: true } // ✅ returns the updated document
    );

    // 3️⃣ Return updated product
    return response.status(200).json({
      message: "Product Rams updated successfully",
      success: true,
      error: false,
      product: updatedProduct,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while updating rams products",
      success: false,
      error: true,
    });
  }
}
export async function getProductRams(request, response) {
  try {
    const productRam = await ProductRAMSModel.find();
    if (!productRam) {
      return response.status(500).json({
        message:
          error.message || "Something went wrong while updating rams products",
        success: false,
        error: true,
      });
    }
    return response.status(200).json({
      message: "Product Rams get request successfully",
      success: true,
      error: false,
      data: productRam,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while updating rams products",
      success: false,
      error: true,
    });
  }
}

export async function getProductRamsById(request, response) {
  try {
    const productRam = await ProductRAMSModel.findById({
      _id: request.params.id,
    });
    if (!productRam) {
      return response.status(500).json({
        message:
          error.message || "Something went wrong while updating rams products",
        success: false,
        error: true,
      });
    }
    return response.status(200).json({
      message: "Product Rams Single get request successfully",
      success: true,
      error: false,
      data: productRam,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while updating rams products",
      success: false,
      error: true,
    });
  }
}

//weight routes

export async function createProductWEIGHT(request, response) {
  try {
    let productWeight = ProductWEIGHTModel({
      name: request.body.name,
    });
    const savedproductWEIGHT = await productWeight.save();
    if (!savedproductWEIGHT) {
      return response.status(400).json({
        message: "WEIGHT  Not Created",
        error: true,
        success: false,
      });
    }

    return response.status(201).json({
      message: "Product WEIGHT created successfully",
      success: true,
      error: false,
      product: savedproductWEIGHT,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while Creating rams products",
      success: false,
      error: true,
    });
  }
}
export async function deleteProductWEIGHT(request, response) {
  try {
    const productWeight = await ProductWEIGHTModel.findById(request.params.id);
    if (!productWeight) {
      return response.status(404).json({
        message: "Product WEIGHT not found",
        success: false,
        error: true,
      });
    }

    const deletedProductWeight = await ProductWEIGHTModel.findByIdAndDelete(
      request.params.id
    );
    // const MyListItems=await myList.find({productId:request.params.id})
    //       for(var i=0;i<myListItems.length;i++)
    //       {
    //         await MyList.findByIdAndDelete(myListItems[i].id)
    //       }
    //       const cartItems=await Cart.find({productId:request.params.id})
    //       for(var i=0;i<cartItems.length;i++)
    //       {
    //         await Cart.findByIdAndDelete(cartItems[i].id)
    //       }
    if (!deletedProductWeight) {
      response.status(404).json({
        message: "weight Not deleted",
        success: false,
        error: true,
      });
    }
    response.status(200).json({
      message: "Product weight deleted",
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

export async function updateProductWeight(request, response) {
  try {
    const { id } = request.params;

    // 1️⃣ Check if product exists
    const productWeight = await ProductWEIGHTModel.findById(id);
    if (!productWeight) {
      return response.status(404).json({
        message: "Product weight not found",
        success: false,
        error: true,
      });
    }

    // 2️⃣ Update product details
    const updatedProduct = await ProductWEIGHTModel.findByIdAndUpdate(
      id,
      {
        name: request.body.name,
      },
      { new: true } // ✅ returns the updated document
    );

    // 3️⃣ Return updated product
    return response.status(200).json({
      message: "Product weight updated successfully",
      success: true,
      error: false,
      product: updatedProduct,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while updating rams products",
      success: false,
      error: true,
    });
  }
}
export async function getProductWeight(request, response) {
  try {
    const productWeight = await ProductWEIGHTModel.find();
    if (!productWeight) {
      return response.status(500).json({
        message:
          error.message ||
          "Something went wrong while updating weight products",
        success: false,
        error: true,
      });
    }
    return response.status(200).json({
      message: "Product weight get request successfully",
      success: true,
      error: false,
      data: productWeight,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while updating rams products",
      success: false,
      error: true,
    });
  }
}

export async function getProductWeightById(request, response) {
  try {
    const productWeight = await ProductWEIGHTModel.findById({
      _id: request.params.id,
    });
    if (!productWeight) {
      return response.status(500).json({
        message:
          error.message || "Something went wrong while updating rams products",
        success: false,
        error: true,
      });
    }
    return response.status(200).json({
      message: "Product productWeight Single get request successfully",
      success: true,
      error: false,
      data: productWeight,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while updating rams products",
      success: false,
      error: true,
    });
  }
}

//size routes

export async function createProductSize(request, response) {
  try {
    let productSize = ProductSIZEModel({
      name: request.body.name,
    });
    const savedproductSize = await productSize.save();
    if (!savedproductSize) {
      return response.status(400).json({
        message: "productSize  Not Created",
        error: true,
        success: false,
      });
    }

    return response.status(201).json({
      message: "Product productSize created successfully",
      success: true,
      error: false,
      product: savedproductSize,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while Creating rams products",
      success: false,
      error: true,
    });
  }
}
export async function deleteProductSize(request, response) {
  try {
    const productSize = await ProductSIZEModel.findById(request.params.id);
    if (!productSize) {
      return response.status(404).json({
        message: "Product productSize not found",
        success: false,
        error: true,
      });
    }

    const deletedProductSize = await ProductSIZEModel.findByIdAndDelete(
      request.params.id
    );

    if (!deletedProductSize) {
      response.status(404).json({
        message: "productSize Not deleted",
        success: false,
        error: true,
      });
    }
    response.status(200).json({
      message: "Product productSize deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    // 4️⃣ Handle any server/database error
    return response.status(500).json({
      message:
        error.message || "Something went wrong while fetching productSize",
      success: false,
      error: true,
    });
  }
}

export async function updateProductSize(request, response) {
  try {
    const { id } = request.params;

    // 1️⃣ Check if product exists
    const productSize = await ProductSIZEModel.findById(id);
    if (!productSize) {
      return response.status(404).json({
        message: "Product productSize not found",
        success: false,
        error: true,
      });
    }

    // 2️⃣ Update product details
    const updatedProduct = await ProductSIZEModel.findByIdAndUpdate(
      id,
      {
        name: request.body.name,
      },
      { new: true } // ✅ returns the updated document
    );

    // 3️⃣ Return updated product
    return response.status(200).json({
      message: "Product productSize updated successfully",
      success: true,
      error: false,
      product: updatedProduct,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Something went wrong while updating rams products",
      success: false,
      error: true,
    });
  }
}
export async function getProductSize(request, response) {
  try {
    const productSize = await ProductSIZEModel.find();
    if (!productSize) {
      return response.status(500).json({
        message:
          error.message ||
          "Something went wrong while updating productSize products",
        success: false,
        error: true,
      });
    }
    return response.status(200).json({
      message: "Product productSize get request successfully",
      success: true,
      error: false,
      data: productSize,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message ||
        "Something went wrong while updating productSize products",
      success: false,
      error: true,
    });
  }
}

export async function getProductSizeById(request, response) {
  try {
    const productSize = await ProductSIZEModel.findById({
      _id: request.params.id,
    });
    if (!productSize) {
      return response.status(500).json({
        message:
          error.message ||
          "Something went wrong while updating productSize products",
        success: false,
        error: true,
      });
    }
    return response.status(200).json({
      message: "Product productSize Single get request successfully",
      success: true,
      error: false,
      data: productSize,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message ||
        "Something went wrong while updating productSize products",
      success: false,
      error: true,
    });
  }
}

//filter

export async function filters(request, response) {
  const {
    catId,
    subCatId,
    thirdSubCatId,
    minPrice,
    maxPrice,
    rating,
    page,
    limit,
  } = request.body;

  const filter = {};

  if (catId?.length) {
    filter.catId = { $in: catId };
  }
  if (subCatId?.length) {
    filter.subCatId = { $in: subCatId };
  }
  if (thirdSubCatId?.length) {
    filter.thirdSubCatId = { $in: thirdSubCatId };
  }

  if (minPrice || maxPrice) {
    filter.price = { $gte: +minPrice || 0, $lte: +maxPrice || Infinity }; //converts to integer
  }

  if (rating?.length) {
    filter.rating = { $in: rating };
  }

  try {
    // const products = await ProductModel.find(filters)
    //   .populate("category".skip(page - 1) * limit)
    //   .limit(parseInt(limit));
    const products = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await ProductModel.countDocuments(filter);

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      total: total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Something went wrong while filtering",
      success: false,
      error: true,
    });
  }
}

const sortItems = (products, sortBy, order) => {
  return products.sort((a, b) => {
    if (sortBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortBy === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }

    return 0;
  });
};

export async function sortBy(request, response) {
  const { products, sortBy, order } = request.body;
  const sortedItems = sortItems([...(products || [])], sortBy, order);

  return response.status(200).json({
    message: "sortItems Called",
    error: false,
    success: true,
    products: sortedItems,
    page: 0,
    totalPages: 0,
  });
}

export async function searchProductController(request, response) {
  try {
    const { page, limit, query } = request.body;
    // const query = request.query.q;
    if (!query) {
      return response.status(400).json({
        message: "Query is required",
        error: true,
        success: false,
      });
    }
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { catName: { $regex: query, $options: "i" } },
        { subCat: { $regex: query, $options: "i" } },
        { thirdSubCat: { $regex: query, $options: "i" } },
      ],
    }).populate("category");
    const total = await products?.length;

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      total: 1,
      page: parseInt(page),
      totalPages: 1,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message ||
        "Something went wrong while updating productSize products",
      success: false,
      error: true,
    });
  }
}
