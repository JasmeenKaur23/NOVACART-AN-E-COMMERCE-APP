import mongoose from "mongoose";

const homeSliderSchema = new mongoose.Schema({
  images:[ {
    type: String,
    required: true,
  },],
   dateCreated: {
      type: Date,
      default: Date.now(),
    },
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);


const HomeSliderModel = mongoose.model("HomeSlider", homeSliderSchema);

export default HomeSliderModel;

