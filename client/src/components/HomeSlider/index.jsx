

// // import React, { useContext } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";
// // import "../../index.css";
// // import { Autoplay, Navigation, FreeMode, Pagination } from "swiper/modules";
// // import { myContext } from "../../App";

// // const HomeSlider = ({ data }) => {
// //   const context = useContext(myContext);

// //   return (
// //     <div className="homeBannerSlider bg-white relative z-[99] pt-3 lg:pt-5 pb-0 lg:pb-0">
// //       <div className="container">
// //         <Swiper
// //           slidesPerView={1} // responsive
// //           spaceBetween={30}
// //           loop={true}
// //           freeMode={true}
// //           navigation={context?.windowWidth >= 992} // enable only on desktop
// //           pagination={{ clickable: true }}
// //           modules={[Navigation, Autoplay, FreeMode, Pagination]}
// //           className="sliderHome"
// //           autoplay={{
// //             delay: 2500,
// //             disableOnInteraction: false,
// //           }}
// //         >
// //           {data?.length > 0 &&
// //             data
// //               .slice()
// //               .reverse()
// //               .map((item, index) => (
// //                 <SwiperSlide key={index}>
// //                   <div className="item rounded-[10px] overflow-hidden h-[300px] lg:h-[400px]">
// //                     <img
// //                       src={item?.images[0]}
// //                       alt={`slide ${index}`}
// //                       className="w-full h-full object-cover block"
// //                     />
// //                   </div>
// //                 </SwiperSlide>
// //               ))}
// //         </Swiper>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomeSlider;



// import React, { useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "../../index.css";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { myContext } from "../../App";

// const HomeSlider = ({ data }) => {
//   const context = useContext(myContext);

//   return (
//     <div className="homeBannerSlider bg-white relative z-[99] pt-3 lg:pt-5 pb-0 lg:pb-0">
//       <div className="container">
//         <Swiper
//           slidesPerView={1} // default for mobile
//           spaceBetween={20}
//           loop={true}
//           navigation={context?.windowWidth >= 992} // only desktop arrows
//           pagination={{ clickable: true }}
//           modules={[Navigation, Autoplay, Pagination]}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           grabCursor={true} // enable touch grab cursor
         
//           className="sliderHome"
//         >
//          {data?.length > 0 &&
//   data.slice().reverse().map((item, index) => (
//     <SwiperSlide key={index}>
//       <div className="item rounded-[10px] overflow-hidden h-[300px] lg:h-[400px]">
//         <img
//           src={item?.images[0]}
//           alt={`slide ${index}`}
//           className="w-full h-full object-cover block"
//         />
//       </div>
//     </SwiperSlide>
//   ))}

//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default HomeSlider;
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { myContext } from "../../App";

const HomeSlider = ({ data }) => {
  const context = useContext(myContext);

  return (
    <>
      {/* Scoped CSS overrides: Zero gaps, reserve bullet space */}
      <style jsx>{`
        .sliderHome .swiper-pagination {
          bottom: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .sliderHome .swiper-pagination-bullets {
          padding: 0 !important;
          margin: 0 !important;
        }
        .sliderHome .swiper-pagination-bullet {
          padding: 0 !important;
          margin: 0 2px 0 0 !important; /* Tight horizontal; no vertical */
          vertical-align: bottom; /* Aligns bullets crisply */
        }
        @media (max-width: 768px) {
          .sliderHome .swiper-pagination-bullet {
            width: 6px !important;
            height: 6px !important;
            margin: 0 1px 0 0 !important; /* Even tighter on mobile */
          }
        }
      `}</style>
      <div className="homeBannerSlider bg-white relative z-[99] pt-3 lg:pt-5 pb-0 lg:pb-0">
        <div className="container">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            navigation={true}
           
            modules={[Navigation, Autoplay, Pagination]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            className="sliderHome  pb-[0px]" // Reserves exact bullet height internally (no above gap, no below spillover)
            pagination={{
    clickable: true,
    enabled: context?.windowWidth < 992,
  }}
          >
            {data?.length > 0 &&
              data
                .slice()
                .reverse()
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="item rounded-[10px] overflow-hidden h-[300px] lg:h-[400px]">
                      <img
                        src={item?.images[0]}
                        alt={`slide ${index}`}
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeSlider;