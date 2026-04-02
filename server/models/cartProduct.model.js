import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      // required:true
    },
    discount: {
      type: Number,
      // required:true
    },
    size: {
      type: String,
    },
    weight: {
      type: String,
    },
    ram: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },

    // productId: {
    //   type: String,
    //   //   ref: "Product",
    //   required: true,
    // },
    productId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Product",
  required: true
},

    countInStock: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      //   ref: "User",
      required: true,
      //   required: [true, "User ID is required"],
    },
    brand: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const CartProductModel = mongoose.model("Cart", cartProductSchema);

export default CartProductModel;
