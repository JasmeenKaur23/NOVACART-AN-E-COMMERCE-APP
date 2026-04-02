import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    description: {
      type: String,
      // required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },

    catName: {
      type: String,
      default: "",
    },
    catId: {
      type: String,
      default: "",
    },
    subCatId: {
      type: String,
      default: "",
    },
    subCat: {
      type: String,
      default: "",
    },
    // subCatName: {
    //   type: String,
    //   default:''
    // },
    thirdSubCat: {
      type: String,
      default: "",
    },
    // thirdsubCatName: {
    //   type: String,
    //   default: "",
    // },
    thirdSubCatId: {
      type: String,
      // ref: "Category",
      default:""
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category',
      // required:true
    },
    countInStock: {
      type: Number,

      // required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      // required: true,
    },
    sale: {
      type: Number,
      default:0
      // required: true,
    },
    productRam: [
      {
        type: String,
        default: null,
      },
    ],

    size: [
      {
        type: String,
        default: null,
      },
    ],

    productWeight: [
      {
        type: String,
        default: null,
      },
    ],
bannerImages: [
      {
        type: String,
        required: true,
      },
    ],
    bannerTitleName:{
      type:String,
      required:true
    },

    dateCreated: {
      type: Date,
      default: Date.now(),
    },
     isDisplayOnHomeBanner: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
