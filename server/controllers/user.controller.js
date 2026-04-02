import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import generatedAcessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ReviewModel from "../models/reviews.model.js.js";
import AddressModel from "../models/address.model.js";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

export async function registerUserController(request, response) {
  try {
    let user;
    const { name, email, password } = request.body;

    // Check for required fields
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Provide name, email, and password",
        error: true,
        success: false,
      });
    }

    // Check if user already exists
    user = await UserModel.findOne({ email });
    if (user) {
      return response.status(400).json({
        message: "User already registered with this email",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Generate salt and hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Create payload for new user
    const payload = {
      name,
      email,
      otp: verifyCode,
      otpExpires: Date.now() + 60000,
      password: hashPassword,
    };

    // Create new user instance
    user = new UserModel(payload);
    await user.save();

    const verifyEmail = await sendEmailFun({
      sendTo: email,
      subject: "Verify Email from Ecommerce App",
      text: "",
      html: VerificationEmail(name, verifyCode),
    });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return response.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully !Please verify Your Email",
      token: token,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { email, otp } = request.body;

    // Check for required fields
    if (!email || !otp) {
      return response.status(400).json({
        message: "Provide email and OTP",
        error: true,
        success: false,
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return response.status(400).json({
        message: "Invalid Code User doesnot exist ",
        error: true,
        success: false,
      });
    }
    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otpExpires > Date.now();

    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return response.status(200).json({
        message: "Email verified successfully!",
        success: true,
        error: false,
      });
    } else if (!isCodeValid) {
      return response.status(400).json({
        message: "Invalid OTP!",
        success: false,
        error: true,
      });
    } else {
      {
        return response.status(400).json({
          message: " OTP Expired!",
          success: false,
          error: true,
        });
      }
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal verify email Server Error",
      error: true,
      success: false,
    });
  }
}

export async function authWithGoogle(request, response) {
  const { name, email, password, avatar, mobile, role } = request.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      const user = await UserModel.create({
        name: name,
        mobile: mobile,
        email: email,
        password: "null",
        avatar: avatar,
        role: role,
        verify_email: true,
        signUpWithGoogle: true,
      });
      await user.save();

      const accesstoken = await generatedAcessToken(user._id);
      const refreshToken = await generatedRefreshToken(user._id);

      const updatedUser = await UserModel.findByIdAndUpdate(user?._id, {
        last_login_date: new Date(),
      });

      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      response.cookie("accessToken", accesstoken, cookiesOption);
      response.cookie("refreshToken", refreshToken, cookiesOption);
      return response.json({
        message: "Login Successfully",
        error: false,
        success: true,
        data: {
          accesstoken,
          refreshToken,
        },
      });
    } else {
      const accesstoken = await generatedAcessToken(existingUser._id);
      const refreshToken = await generatedRefreshToken(existingUser._id);

      const updatedUser = await UserModel.findByIdAndUpdate(existingUser?._id, {
        last_login_date: new Date(),
      });

      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      response.cookie("accessToken", accesstoken, cookiesOption);
      response.cookie("refreshToken", refreshToken, cookiesOption);
      return response.json({
        message: "Login Successfully",
        error: false,
        success: true,
        data: {
          accesstoken,
          refreshToken,
        },
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function loginUserController(request, response) {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "user not Registered",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Contact To Admin",
        error: true,
        success: false,
      });
    }
    if (user.verify_email !== true) {
      return response.status(400).json({
        message: "Your email is not verified yet please verify your email",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return response.status(400).json({
        message: "Check Your Password",
        error: true,
        success: false,
      });
    }

    const accesstoken = await generatedAcessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const updatedUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", accesstoken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);
    return response.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function logoutController(request, response) {
  try {
    const userid = request.userId; // auth middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);
    await UserModel.findByIdAndUpdate(userid, { refresh_token: "" });

    return response.json({
      message: "Logout Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//image upload
var imagesArr = [];
export async function userAvatarController(request, response) {
  try {
    imagesArr = [];
    const userId = request.userId;
    const image = request.files;
    // console.log(image);

    //first remove image from cloudinary

    const user = await UserModel.findOne({ _id: userId });

    //remove img from cloudinary
    const imgUrl = user.avatar; // get ?img=... from query params

    const urlArr = imgUrl.split("/");
    const avatar_image = urlArr[urlArr.length - 1]; // sample_image.jpg
    // const folderName = urlArr[urlArr.length - 2]; // user_avatars

    const imageName = avatar_image.split(".")[0]; // sample_image

    if (imageName) {
      const res = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {
          // console.log(error, res);
        }
      );
    }

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

    user.avatar = imagesArr[0];
    await user.save();

    return response.status(200).json({
      _id: userId,
      avtar: imagesArr[0],
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

    // ✅ Extract public_id from the Cloudinary URL
    // Example URL: https://res.cloudinary.com/demo/image/upload/v1728392812/user_avatars/sample_image.jpg
    // We need to extract: user_avatars/sample_image (without extension)
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1]; // sample_image.jpg
    // const folderName = urlArr[urlArr.length - 2]; // user_avatars

    const imageName = image.split(".")[0]; // sample_image

    if (imageName) {
      const res = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {
          // console.log(error, res);
        }
      );

      if (res) {
        response.status(200).send(res);
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
//update user
export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId;
    const { name, email, mobile, password } = request.body;
    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      return response.status(400).send("the user cannot be updated");
    }
    // let verifyCode = "";

    // if (email !== userExist.email) {
    //   verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    // }

    // let hashPassword = "";
    // if (password) {
    //   const salt = await bcryptjs.genSalt(10);
    //   hashPassword = await bcryptjs.hash(password, salt);
    // } else {
    //   hashPassword = userExist.password;
    // }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        mobile: mobile,
        email: email,
        // verify_email: email !== userExist.email ? false : true,
        // password: hashPassword,
        // otp: verifyCode !== "" ? verifyCode : null,
        // otpExpires: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      {
        new: true,
      }
    );
    if (email !== userExist.email) {
      await sendEmailFun({
        sendTo: email,
        subject: "Verify email from Ecommerce App",
        text: "",
        html: VerificationEmail(name, verifyCode),
      });
    }

    return response.json({
      message: "User updated successfully",
      error: false,
      success: true,
      user: {
        name: updateUser?.name,
        _id: updateUser._id,
        email: updateUser?.email,
        mobile: updateUser?.mobile,
        avatar: updateUser?.avatar,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error while deleting image",
      success: false,
      error: true,
    });
  }
}

export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "Email not available",
        success: false,
        error: true,
      });
    } else {
      let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      user.otp = verifyCode;
      user.otpExpires = Date.now() + 600000;

      await user.save();

      // user.otp = verifyCode;
      // user.otpExpires = otpExpires;

      // await user.save(0)

      await sendEmailFun({
        sendTo: email,
        subject: "Verify OTP from Ecommerce App",
        text: "",
        html: VerificationEmail(user?.name, verifyCode),
      });
      return response.status(200).json({
        message: "check your mail",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error while deleting image",
      success: false,
      error: true,
    });
  }
}
export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "'Email Not Available",
        error: true,
        success: false,
      });
    }

    if (!email || !otp) {
      return response.status(400).json({
        message: "provide required field otp and email",
        error: true,
        success: false,
      });
    }

    if (otp !== user.otp) {
      return response.status(400).json({
        message: "otp doesnot match",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.otpExpires < currentTime) {
      return response.status(400).json({
        message: "OTP time limit exceeded",
        error: true,
        success: false,
      });
    }

    user.otp = "";
    user.otpExpires = "";

    await user.save();

    return response.status(200).json({
      message: "OTP verified success",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: "OTP verified not error ",
      error: true,
      success: false,
    });
  }
}

export async function resetPassword(request, response) {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = request.body;

    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "Provide email, new password and confirm password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "Email not registered",
        error: true,
        success: false,
      });
    }

    if (user?.signUpWithGoogle === false) {

      if (!oldPassword) {
        return response.status(400).json({
          message: "Old password is required",
          error: true,
          success: false,
        });
      }

      const checkPassword = await bcryptjs.compare(oldPassword, user.password);
      if (!checkPassword) {
        return response.status(400).json({
          message: "Your old password is wrong",
          error: true,
          success: false,
        });
      }
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "Passwords do not match",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(newPassword, salt);
    user.signUpWithGoogle = false;
    await user.save();

    return response.status(200).json({
      message: "Password reset successfully! Please login again.",
      success: true,
      error: false,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error while resetting password",
      success: false,
      error: true,
    });
  }
}

export async function refreshToken(request, response) {
  try {
    const refreshToken =
      request.cookies.refreshToken ||
      request?.headers?.authorization?.split("")[1];

    if (!refreshToken) {
      return response.status(401).json({
        message: "Refresh token not provided",
        error: true,
        success: false,
      });
    }

    // Verify the refresh token
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return response.status(403).json({
        message: "Invalid or expired refresh token",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;
    const newAccessToken = await generatedAcessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.status(200).json({
      message: "Access token refreshed successfully",
      success: true,
      error: false,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error while refreshing token",
      success: false,
      error: true,
    });
  }
}

export async function userDetails(request, response) {
  try {
    const userId = request.userId;
    console.log(userId);

    if (!userId) {
      return response.status(400).json({
        message: "User ID not found in request",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );
    const address = await AddressModel.find({ userId });

    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "User details fetched successfully",
      success: true,
      error: false,
      data: {
        ...user._doc,
        address, // attach the array of addresses here
      },
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while fetching user details",
      success: false,
      error: true,
    });
  }
}

export async function addReview(request, response) {
  try {
    const { image, userName, review, rating, email,userId, productId } = request.body;
console.log("reviews data",image, userName, review, rating, email,userId, productId)
    const userReview = new ReviewModel({
      image: image,
      userName: userName,
      review: review,
      email:email,
      rating: rating,
      userId: userId,
      productId: productId,
    });

    await userReview.save();

    return response.status(200).json({
      message: "Review Added successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Internal Server Error while adding reviews user details",
      success: false,
      error: true,
    });
  }
}

export async function getReviews(request, response) {
  try {
    const productId = request.query.productId;

    const reviews = await ReviewModel.find({ productId: productId });

    if (!reviews) {
      return response.status(404).json({
        message: "Review not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Reviews  fetched successfully",
      success: true,
      error: false,
      reviews: reviews,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while fetching user details",
      success: false,
      error: true,
    });
  }
}
export async function getAllReviews(request, response) {
  try {
    

    const reviews = await ReviewModel.find();

    if (!reviews) {
      return response.status(404).json({
        message: "Review not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Reviews  fetched successfully",
      success: true,
      error: false,
      reviews: reviews,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while fetching user details",
      success: false,
      error: true,
    });
  }
}
export async function getAllUsers(request, response) {
  try {
    const users = await UserModel.find();

    if (!users) {
      return response.status(404).json({
        message: "Users not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Reviews  fetched successfully",
      success: true,
      error: false,
      users: users,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while fetching user details",
      success: false,
      error: true,
    });
  }
}


export async function deleteMultiple(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(404).json({
      message: "Invalid Input",
      success: false,
      error: true,
    });
  }

  // for (let i = 0; i < ids?.length; i++) {
  //   const user = await UserModel.findById(ids[i]);

  //   const images = user.images || [];

  //   let img = "";
  //   for (img of images) {
  //     const imgUrl = img; // handle if only URLs are stored

  //     // Extract public_id from URL (assuming format: https://res.cloudinary.com/xxx/image/upload/v1729/filename.jpg)
  //     const urlArr = imgUrl.split("/");
  //     const image = urlArr[urlArr.length - 1];
  //     const imageName = image.split(".")[0];
  //     console.log("Image name ", imageName);

  //     if (imageName) {
  //       cloudinary.uploader.destroy(imageName, (error, result) => {
  //         //console.log(error,result);
  //       });
  //     }
  //   }
  // }

  try {
    await UserModel.deleteMany({
      _id: {
        $in: ids,
      },
    });

    response.status(200).json({
      message: "user deleted Successfully",
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

// export async function uploadAvatar(request, response) {
//   try {
//     const userId = request.userId;
//     const image = request.files;

//     const upload = await uploadImageCloudinary(image);

//     const updateUser = await UserModel.findByIdAndUpdate(userId, {
//       avatar: upload.url,
//     });

//     return response.json({
//       message: "upload profile",
//       success: true,
//       error: false,
//       data: {
//         _id: userId,
//         avatar: upload.url,
//       },
//     });
//   } catch (error) {}
// }
/**export async function uploadAvatar(request, response) {
  try {
    const userId = request.userId;

    if (!request.files || request.files.length === 0) {
      return response.status(400).json({
        message: "No image file provided",
        success: false,
        error: true,
      });
    }

    // Upload first image only (assuming single avatar)
    const imagePath = request.files[0].path;

    const uploadResult = await cloudinary.uploader.upload(imagePath, {
      folder: "user_avatars",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // Remove temp file from local uploads folder
    fs.unlinkSync(imagePath);

    // Update user avatar URL in DB
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: uploadResult.secure_url },
      { new: true }
    );

    if (!updateUser) {
      return response.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "Profile image uploaded successfully",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: uploadResult.secure_url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Error while uploading avatar",
      success: false,
      error: true,
    });
  }
} */
