import mongoose from "mongoose";

const BannerList2Schema = new mongoose.Schema(
  {
    // bannerTitle: {
    //   type: String,
    //   required:true,
    //   //   min: [1, "Quantity must be at least 1"],
    //   default: "",
    // },
    images: [
      {
        type: String, // Array of image URLs
        //  default:'#ffffff'
      },
    ],
    // catId: {
    //   type: String,
    //   required: true,
    //   //   min: [1, "Quantity must be at least 1"],
    //   default: "",
    // },
    // subCatId: {
    //   type: String,
    //   // required: true,
    //   //   min: [1, "Quantity must be at least 1"],
    //   default: "",
    // },
    // thirdSubCatId: {
    //   type: String,
    //   // required: true,
    //   //   min: [1, "Quantity must be at least 1"],
    //   default: "",
    // },
    // price: {
    //   type: Number,
    //   required: true,
    //   default: "",
    // },
    // alignInfo: {
    //   type: String,
    //   required: true,
    //   default: "",
    // },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const BannerList2Model = mongoose.model("bannerList2", BannerList2Schema);

export default BannerList2Model;
