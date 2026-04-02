import mongoose from "mongoose";

const productWEIGHTSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
   dateCreated: {
      type: Date,
      default: Date.now(),
    },
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);


const ProductWEIGHTModel = mongoose.model("ProductWEIGHT", productWEIGHTSchema);

export default ProductWEIGHTModel;

