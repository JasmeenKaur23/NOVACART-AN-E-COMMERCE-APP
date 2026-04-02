import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    image: {
  type: String,
  default: ""
}
,
    userName: {
      type: String,
      required: true,
      //   min: [1, "Quantity must be at least 1"],
      default: "",
    },

    review: {
      type: String,
      required: true,
      //   min: [1, "Quantity must be at least 1"],
      default: "",
    },
    rating: {
      type: String,
      required: true,
      //   min: [1, "Quantity must be at least 1"],
      default: "",
    },
    userId:{
      type:String,
      default:""
    },
    productId:{
      type:String,
      default:""
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const ReviewModel = mongoose.model("reviews", reviewSchema);

export default ReviewModel;
