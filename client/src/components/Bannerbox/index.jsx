// import React from "react";
// import { Link } from "react-router-dom";

// const BannerBox = (props) => {
//   return (
//     <>
//       <div className="box bannerBox overflow-hidden rounded-lg group ">
//         <Link className="no-underline" to="/">
//           <img src={props.data?.image[0]} alt="Banner V2" className="w-full transition-all group-hover:rotate-1 group-hover:scale-105" />
//         </Link>
//       </div>
//     </>
//   );
// };

// export default BannerBox;

import React from "react";
import { Link } from "react-router-dom";

const BannerBox = (props) => {
  return (
    <div className="box bannerBox  !gap-5 overflow-hidden rounded-lg group">
      <Link className="no-underline block" to={`/product-details/${props._id}`}>
        <img
          src={props.image}
          alt="Banner"
          className="w-full  group-hover:scale-105  h-[240px] object-contain transition-transform duration-300 ease-in-out"
        />
      </Link>
    </div>
  );
};

export default BannerBox;
