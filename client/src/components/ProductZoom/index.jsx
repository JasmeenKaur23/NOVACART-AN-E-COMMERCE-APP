// import React, { useRef, useState } from "react";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// // import ClickZoomImage from "./ClickZoomImage";
// import Magnifier from "./Magnifier";

// const ProductDetails = (props) => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const sliderBig = useRef();
//   const sliderThumb = useRef();

//   const goto = (index) => {
//     setSlideIndex(index);
//     sliderBig.current?.slideTo(index);
//     sliderThumb.current?.slideTo(index);
//   };

//   return (
//     <>
//      <div className="px-2 block mt-8">
//   <h3 className="text-[20px]  font-[600]">Products Details</h3>
// </div>

// <div className="mt-0  flex gap-4">

//   {/* LEFT SIDE - THUMBNAILS */}
//   <div className="w-[20%]  mt-16 h-[600px]">
//     <Swiper
//       direction="vertical"
//       slidesPerView={4}
//       spaceBetween={10}
//       navigation={true}
//       modules={[Navigation]}
//       onSwiper={(swiper) => (sliderThumb.current = swiper)}
//       className="!h-full"
//     >
//       {props?.images?.map((img, index) => (
//         <SwiperSlide key={index}>
//           <div
//             onClick={() => goto(index)}
//             className={`cursor-pointer rounded-md overflow-hidden border ${
//               slideIndex === index
//                 ? "border-red-500 opacity-100"
//                 : "opacity-30 border-gray-300"
//             }`}
//           >
//             <img src={img} className="w-full h-[120px] object-cover" />
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div>

//   {/* RIGHT SIDE - MAIN IMAGE */}
//   {/* <div className="w-[80%] mt-16 h-[500px] bg-blue-700 rounded-md overflow-hidden">
//     <Swiper
//       direction="vertical"
//       slidesPerView={1}
//       navigation={false}
//       modules={[Navigation]}
//       onSwiper={(swiper) => (sliderBig.current = swiper)}
//       className="h-full"
//     >
//       {props?.images?.map((img, index) => (
//       <SwiperSlide key={index} className="!h-full !flex !items-center !justify-center">

//     <div className="w-full h-full bg-black flex justify-center items-center overflow-hidden">
//     <Magnifier src={"/zoom.jpg"} className="h-full" alt={`product-${index}`} />
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div> */}

// {/* RIGHT SIDE - MAIN IMAGE */}
// <div className="w-[80%] mt-16 h-[500px]  rounded-md overflow-hidden">
//   <Swiper
//     direction="vertical"
//     slidesPerView={1}
//     navigation={false}
//     modules={[Navigation]}
//     onSwiper={(swiper) => (sliderBig.current = swiper)}
//     className="h-full"
//   >
//     {props?.images?.map((img, index) => (
//       <SwiperSlide key={index} className="!h-full !flex !items-center !justify-center">
//         <div className="w-full h-full  flex justify-center items-center overflow-hidden">
//           <Magnifier
//             src={img}  // Use props.images here instead of hardcoded "/zoom.jpg"
//             className="w-full h-full"  // Add w-full to match h-full
//             alt={`product-${index}`}
//           />
//         </div>
//       </SwiperSlide>
//     ))}
//   </Swiper>
// </div>

// </div>

//     </>
//   );
// };

// export default ProductDetails;

import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Magnifier from "./Magnifier";
import ProductDetailsComponent from "../ProductDetails";
import { myContext } from "../../App";
// Import details if rendering here
// import ProductDetailsComponent from "./ProductDetailsComponent"; // Adjust path

const ProductDetails = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderBig = useRef();
  const sliderThumb = useRef();
  const context = useContext(myContext);
  const goto = (index) => {
    setSlideIndex(index);
    sliderBig.current?.slideTo(index);
    sliderThumb.current?.slideTo(index);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <div className="flex flex-col m-4 lg:flex-row gap-4">
        {" "}
        
        {/* Unchanged */}
        {/* LEFT SIDE - THUMBNAILS */}
        
        <div className="w-full  lg:w-[20%] slider gap-4 order-2 lg:order-1">
          <Swiper
            direction={context?.windowWidth < 992 ? "horizontal" : "vertical"}
            slidesPerView={4}
            spaceBetween={10}
            navigation={context?.windowWidth < 992 ? false : true}
            modules={[Navigation,Pagination]}
              pagination={{ clickable: true }}
            onSwiper={(swiper) => (sliderThumb.current = swiper)}
            className={`h-[120px] lg:h-[600px] zoomProductSliderThumbs gap-5 overflow-hidden ${
              props?.images?.length > 5 && "space"
            }`}
          >
            {props?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => goto(index)}
                  className={`cursor-pointer rounded-md h-full overflow-hidden border flex items-center justify-center ${
                    slideIndex === index
                      ? "border-red-500 opacity-100"
                      : "opacity-30 border-gray-300"
                  }`} // Added: flex centering + h-full (was h-[100%], but h-full is more reliable in Tailwind)
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover" // FIX: Added h-full – this constrains to slide height, prevents intrinsic stretch
                    alt={`thumb-${index}`} // Bonus: Add alt for accessibility
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
         
        </div>
        {/* RIGHT SIDE - MAIN IMAGE */}
     <div className="w-full lg:w-[80%] h-[420px] lg:h-[600px] zoomContainer rounded-md relative">
  {/* Remove overflow-hidden completely */}    {" "}
          {/* FIX: Changed to 600px to match thumbnails */}
          <Swiper
            direction="horizontal" // Unchanged – horizontal is fine for main
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
            onSwiper={(swiper) => (sliderBig.current = swiper)}
          >
            {props?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <Magnifier
                  src={img}
                  className="w-full h-full" // Already good
                  alt={`product-${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
