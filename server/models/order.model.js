import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      //   required: [true, "User ID is required"],
    },
    products: [
      {
        productId: {
          type: String,
        },
        productTitle: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
        image: {
          type: String,
        },
        subTotal: {
          type: Number,
        },
      },
    ],
    // orderId: {
    //   type: String,
    //   required: [true, "Order ID is required"],
    //   unique: true,
    //   trim: true,
    // },
    // productId: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "product",
    //   required: [true, "Product ID is required"],
    // },
    // product_details: {
    //   name: String,
    //   image: Array,
    // },
   
    paymentId: {
      type: String,
      default: "",
      // trim: true,
    },
    payment_status: {
      type: String,
      default: "",
    },
    order_status: {
      type: String,
      default: "pending",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
    // subTotalAmt: {
    //   type: Number,
    //   default: 0,
    // },
    totalAmt: {
      type: Number,
      default: 0,
    },
    // invoice_reciept: {
    //   type: String,
    //   default: "",
    // },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
