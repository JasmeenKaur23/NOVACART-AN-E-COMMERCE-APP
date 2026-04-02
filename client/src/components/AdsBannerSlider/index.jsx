import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import BannerBox from "../Bannerbox";
import BannerboxV2 from "../bannerBoxV2";
import { myContext } from "../../App";

const AdsBannerSlider = (props) => {
  const context = useContext(myContext);
  return (
    <>
      <div className="py-2 lg:py-5 !pb-0 resBannerSlider  w-full ">
        <Swiper
          slidesPerView={props.items}
          spaceBetween={10}
          modules={[Navigation, FreeMode]}
          navigation={true}
          freeMode={true}
          className="smlBtn"
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            450: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            750: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1100: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          }}
        >
          {/* <SwiperSlide>
            <BannerBox
              img={
                " https://serviceapi.spicezgold.com/download/1741669012402_banner1.webp "
              }
              link={"/"}
            />
          </SwiperSlide> */}
          {props?.data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <BannerboxV2
                  info={item?.alignInfo}
                  item={item}
                  image={item?.images[0]}
                  link={"/"}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default AdsBannerSlider;
