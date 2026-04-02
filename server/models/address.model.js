import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line1: {
      type: String,
      required: [true, "Address line is required"],
      trim: true,
      minlength: [5, "Address line must be at least 5 characters long"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^\d{5,6}$/, "Please enter a valid pincode"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    mobile: {
      type: Number,
      required: [true, "Mobile number is required"],
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    status: {
      type: Boolean,
      //   enum: ["Active", "Inactive"],
      default: true,
    },
    selected: {
      type: Boolean,
      //   enum: ["Active", "Inactive"],
      default: true,
    },
    landmark: {
      type: String,
      //   enum: ["Active", "Inactive"],
      // default: true,
    },
    addressType: {
      type: String,
      enum: ["Home", "Office"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      default: "",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;
