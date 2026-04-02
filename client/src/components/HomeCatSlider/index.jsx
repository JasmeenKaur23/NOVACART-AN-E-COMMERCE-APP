// // import React, { useContext, useEffect, useState } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // // Import Swiper styles
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/free-mode";
// // import { Navigation, FreeMode } from "swiper/modules";
// // import { Link } from "react-router-dom";
// // import { myContext } from "../../App";
// // const HomeCatSlider = (props) => {
// //   const [catData, setCatData] = useState([]);
// //   const context = useContext(myContext);
// //   const [isLoading, setIsLoading] = useState(false);
// //   useEffect(() => {
// //     if (props?.data) {
// //       setCatData(props.data); // update local state with latest categories
// //     }
// //   }, [props?.data]);
// //   return (
// //     <>
// //       <div className="homeCatSlider py-4 lg:py-8 pt-0 lg:pt-4">
// //         <div className="container-fluid mx-auto px-2 flex items-center justify-center w-full">
// //           <Swiper
// //             spaceBetween={10}
// //             loop={true}
// //            navigation={true} modules={[Navigation]}
// //             className="mySwiper"

// //             autoplay={{
// //               delay: 2500,
// //               disableOnInteraction: false,
// //             }}
// //             breakpoints={{
// //               300: {
// //                 slidesPerView: 4,
// //                 spaceBetween: 5,
// //               },
// //               550: {
// //                 slidesPerView: 4,
// //                 spaceBetween: 5,
// //               },
// //               900: {
// //                 slidesPerView: 5,
// //                 spaceBetween: 5,
// //               },
// //               1100: {
// //                 slidesPerView: 8,
// //                 spaceBetween: 5,
// //               },
// //             }}
// //             style={{ width: "100%" }}
// //             allowTouchMove={true}
// //           >
// //             {props?.data?.map((cat, index) => {
// //               return (
// //                 <SwiperSlide key={index}>
// //                   <Link className="link no-underline" to={`/product-listing?catId=${cat._id}`}>
// //                     {" "}
// //                     <div className="item  border-[rgba(0,0,0,0.6)] !border-1 hover:!border-[rgba(0,0,0,0.9)] hover:bg-[rgba(196,191,191,0.1)]  lg:py-7 px-3 flex text-center items-center justify-center flex-col  bg-[white] rounded-sm ">
// //                       <img
// //                         src={cat?.images[0]}
// //                         alt="smart "
// //                         className="w-[40px] lg:w-[60px] mb-2 transition-all"
// //                       />

// //                       <h5 className="text-[12px] link !text-[rgba(0,0,0,0.7)]  hover:!text-primary lg:text-[14px] no-underline">
// //                         {cat?.name}
// //                       </h5>
// //                     </div>
// //                   </Link>
// //                 </SwiperSlide>
// //               );
// //             })}
// //           </Swiper>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default HomeCatSlider;
// import React, { useContext, useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/free-mode";
// import { Navigation, FreeMode, Autoplay } from "swiper/modules";
// import { Link } from "react-router-dom";
// import { myContext } from "../../App";

// const HomeCatSlider = (props) => {
//   const [catData, setCatData] = useState([]);
//   const context = useContext(myContext);

//   useEffect(() => {
//     if (props?.data) {
//       setCatData(props.data);
//     }
//   }, [props?.data]);

//   return (
//     <div className="homeCatSlider py-2 lg:py-8 pt-0 lg:pt-4">
//       <div className="container-fluid mx-auto px-2 flex items-center justify-center w-full">
//         <Swiper
//           spaceBetween={10}
//           loop={true}
//           navigation={true}
//           modules={[Navigation, FreeMode, Autoplay]}
//           freeMode={true} // important for mobile swipe
//           allowTouchMove={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           breakpoints={{
//             300: { slidesPerView: 4, spaceBetween: 5 },
//             550: { slidesPerView: 4, spaceBetween: 5 },
//             900: { slidesPerView: 5, spaceBetween: 5 },
//             1100: { slidesPerView: 8, spaceBetween: 5 },
//           }}
//           style={{ width: "100%" }}
//         >
//           {catData?.map((cat, index) => (
//             <SwiperSlide key={index}>
//               <Link
//                 className="link no-underline"
//                 to={`/product-listing?catId=${cat._id}`}
//               >
//                 <div className="item border-[rgba(0,0,0,0.6)] !border-1 hover:!border-[rgba(0,0,0,0.9)] hover:bg-[rgba(196,191,191,0.1)] lg:py-7 px-3 flex text-center items-center justify-center flex-col bg-[white] rounded-sm">
//                   <img
//                     src={cat?.images[0]}
//                     alt={cat?.name}
//                     className="w-[40px] lg:w-[60px] mb-2 transition-all"
//                   />
//                   <h5 className="text-[12px] link !text-[rgba(0,0,0,0.7)] hover:!text-primary lg:text-[14px] no-underline">
//                     {cat?.name}
//                   </h5>
//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default HomeCatSlider;
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { myContext } from "../../App";

const HomeCatSlider = (props) => {
  const [catData, setCatData] = useState([]);
  const context = useContext(myContext);

  useEffect(() => {
    if (props?.data) {
      setCatData(props.data);
    }
  }, [props?.data]);

  return (
    <>
      {/* Scoped CSS: Custom arrow styles for mobile visibility + touch enhancements */}
      <style jsx>{`
        .homeCatSlider .swiper-button-prev,
        .homeCatSlider .swiper-button-next {
          --swiper-navigation-size: 24px; /* Smaller arrows on mobile */
          color: rgba(0, 0, 0, 0.8);
          background: rgba(255, 255, 255, 0.9); /* Semi-transparent bg */
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          width: 32px;
          height: 32px;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .homeCatSlider .swiper-button-prev:hover,
        .homeCatSlider .swiper-button-next:hover {
          opacity: 1;
        }
        .homeCatSlider .swiper-button-prev {
          left: 0;
        }
        .homeCatSlider .swiper-button-next {
          right: 0;
        }
        @media (min-width: 992px) {
          .homeCatSlider .swiper-button-prev,
          .homeCatSlider .swiper-button-next {
            --swiper-navigation-size: 40px; /* Larger on desktop */
            width: 44px;
            height: 44px;
          }
        }
        /* Touch fix: Smooth pan-x only */
        .homeCatSlider .swiper {
          touch-action: pan-x;
          -webkit-overflow-scrolling: touch; /* iOS momentum boost */
        }
      `}</style>
      <div className="homeCatSlider py-1  lg:py-8 pt-0 lg:pt-4">
        <div className="container-fluid mx-auto px-2 flex items-center justify-center w-full relative">
          {" "}
          {/* Added relative for absolute arrows */}
          <Swiper
            slidesPerView={3.5} // Default for tiny mobile screens (partial last slide for scroll cue)
            spaceBetween={5} // Consistent with breakpoints
            loop={true}
            navigation={true} // Arrows always enabled
            modules={[Navigation, FreeMode, Autoplay]}
            freeMode={{
              enabled: true,
              momentum: true, // Adds inertia for smooth stop after drag
              momentumVelocityRatio: 1, // Full momentum transfer
            }}
            touchRatio={1} // 1:1 drag sensitivity for natural feel
            grabCursor={true} // Grab icon on touch/hover
            allowTouchMove={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              300: { slidesPerView: 4, spaceBetween: 5 },
              550: { slidesPerView: 4, spaceBetween: 5 },
              900: { slidesPerView: 5, spaceBetween: 5 },
              1100: { slidesPerView: 8, spaceBetween: 5 },
            }}
            className="mySwiper" // Your existing class
            style={{ width: "100%" }}
          >
            {catData?.map((cat, index) => (
              <SwiperSlide key={index}>
                <Link
                  className="link no-underline"
                  to={`/product-listing?catId=${cat._id}`}
                >
                  <div className="item border-[rgba(0,0,0,0.6)] !border-1 hover:!border-[rgba(0,0,0,0.9)] hover:bg-[rgba(196,191,191,0.1)] lg:py-7 px-3 flex text-center items-center justify-center flex-col bg-[white] rounded-sm">
                    <img
                      src={cat?.images[0]}
                      alt={cat?.name}
                      className="w-[40px] lg:w-[60px] mb-2 transition-all"
                    />
                    <h5 className="text-[12px] link !text-[rgba(0,0,0,0.7)] hover:!text-primary lg:text-[14px] no-underline">
                      {cat?.name}
                    </h5>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeCatSlider;
