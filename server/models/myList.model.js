import mongoose from "mongoose";

const myListSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, "Product ID is required"],
    },
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    productTitle: {
      type: String,
      required: [true, "Product title is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    rating: {
      type: Number,

      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    oldPrice: {
      type: Number,
      required: [true, "old price is required"],
    },
    discount: {
      type: Number,
      required: [true, "discount is required"],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const MyListModel = mongoose.model("MyList", myListSchema);

export default MyListModel;
