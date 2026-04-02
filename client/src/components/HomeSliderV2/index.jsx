import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { EffectFade, FreeMode, Navigation, Pagination } from "swiper/modules";
import Button from "@mui/material/Button";
import { Autoplay } from "swiper/modules";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
// Swiper styles

const HomebannerV2 = (props) => {
  const context = useContext(myContext);
  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      freeMode={true}
      navigation={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      pagination={{ clickable: true }}
      modules={[EffectFade, Autoplay, Navigation, FreeMode, Pagination]}
      className="homeSliderV2 relative"
      // onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    >
      {props?.data?.map((item, index) => {
        if (
          item?.isDisplayOnHomeBanner === true &&
          item?.bannerImages?.length !== 0
        ) {
          return (
            <SwiperSlide key={index}>
              <div className="relative item w-full rounded-md overflow-hidden">
                <img src={item?.bannerImages?.[0]} className="w-full" />

                {/* <div className="absolute info top-0 -right-[100%] opacity-0 h-[100%] w-[50%] z-50 p-8  flex flex-col justify-center transition-all items-start px-8">
                  <h4
                    className={`text-[12px] hidden lg:block lg:text-[18px] font-medium w-full text-left  mb-3 relative -right-[100%] opacity-0`}
                  >
                    {item?.bannerTitleName}
                  </h4>
                  {context?.windowWidth < 992 && (
                    <h2
                      className={`text-[16px] lg:text-[30px] font-bold  w-full text-left  mb-3 relative -right-[100%] opacity-0 `}
                    >
                      {item?.name?.length > 30
                        ? item?.name?.substr(0, 30) + "..."
                        : item?.name}
                    </h2>
                  )}
                  {context?.windowWidth > 992 && (
                    <h2
                      className={`text-[15px] lg:text-[30px] sm:text-[15px] md:text-[25px] font-bold  w-full text-left  mb-3 relative -right-[100%] opacity-0 `}
                    >
                      {item?.name?.length > 70
                        ? item?.name?.substr(0, 70) + "..."
                        : item?.name}
                    </h2>
                  )}

                  <h3
                    className={`text-[12px] flex-col gap-0 lg:flex-row lg:text-[20px] flex items-center lg:gap-2 mb-0 lg:mb-3 w-full text-left relative -right-[100%] opacity-0 `}
                  >
                  <span className="w-full lg:w-max hidden lg:block"> Starting At Only{" "}</span> 
                    <span className="!text-primary font-bold block lg:inline w-full lg:w-max text-[20px]  lg:text-[30px]">
                      {item?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </h3>

                  <div
                    className={`relative inline-block transition-all duration-1000 delay-[800ms] transform `}
                  >
                    <Link TO={`/product/${item?._id}`}>
                    <Button className="btn btn-org">Shop Now</Button>
                    </Link>
                  </div>
                </div> */}
                <div className="absolute  info top-0 right-0 h-[100%] w-[50%] z-50 p-8 flex flex-col justify-center items-start">
                  <h4 className="text-[18px] font-medium mb-3">
                    {item?.bannerTitleName}
                  </h4>
                  <h2 className="text-[30px] font-bold mb-3">{item?.name}</h2>
                  <h3 className="text-[20px] !items-start flex font-bold">
                    {item?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h3>
                  <div className="">
                    {" "}
                    <Link to={`/product-details/${item?._id}`}>
                      <Button
                        className="btn btn-large btn-org mt-4 
  px-6 py-2 text-sm 
  sm:px-8 sm:py-3 sm:text-base 
  lg:px-12 lg:py-4 lg:text-lg"
                      >
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default HomebannerV2;
