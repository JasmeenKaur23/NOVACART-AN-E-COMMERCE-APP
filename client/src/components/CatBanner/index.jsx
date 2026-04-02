import React, { useContext } from "react";
import BannerBox from "../Bannerbox"; // Assuming this is the correct import for BannerBox
import { Link } from "react-router-dom";
import { myContext } from "../../App";

const CatBannerPage = (props) => {
  const context = useContext(myContext);
  
  // Compute sliced data based on maxItems (fallback to all if not provided)
  const slicedData = props.data?.slice(0, props.maxItems) || [];

  return (
    <div className="resBannerSlider py-5 !pb-0 w-full flex flex-col gap-4 max-h-full overflow-y-auto">
      {slicedData.map((item, index) => {
        const image = Array.isArray(item.images)
          ? item.images[0]
          : item.images;

        return (
          <div key={index} className="w-full">
            <Link to={`/product-details/${item?._id}`}>
              <BannerBox image={image} _id={item?._id} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CatBannerPage;