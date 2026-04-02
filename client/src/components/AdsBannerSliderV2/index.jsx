import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import BannerBoxV2 from "../bannerBoxV2";
import { myContext } from "../../App";
import BannerBox from "../Bannerbox";
import { Link } from "react-router-dom";

const AdsBannerSliderV2 = (props) => {
  const context = useContext(myContext);
  return (
    <>
      <div className="resBannerSlider py-5 !pb-0   w-full ">
        <Swiper
  spaceBetween={10}
  modules={[Navigation, FreeMode]}
  navigation={true}
  freeMode={true}
  className="smlBtn"
  slidesPerView={1}     // mobile default
  breakpoints={{
    576: { slidesPerView: 2 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 4 },
    1200: { slidesPerView: props.items || 4 },
  }}
>

          {/* <SwiperSlide>
            <BannerBoxV2
                info="right"
                image={
                  "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-3.jpg"
                }
              link={"/"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2
                info="right"
                image={
                "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-1.jpg " } link={"/"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2
                info="right"
                image={
                " https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-2.jpg"
                } link={"/"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2
                info="left"
                image={
                  "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
                }
              link={"/"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2
               info="left"
                image={
                  "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
                }
              link={"/"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2
                info="left"
                image={
                  "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
                }
              link={"/"}
            />
          </SwiperSlide> */}
          {props?.data?.map((item, index) => {
            const image = Array.isArray(item.images)
              ? item.images[0]
              : item.images;

            return (
              <SwiperSlide key={index}>
                {/* <img
                  src={item.images[0]}
                  className="group-hover:!rotate-1 group-hover:!scale-105"
                  style={{
                    width: "550px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt="test"
                /> */}
                <Link to={`/product-details/${item?._id}`}>
                  {" "}
                  <BannerBox image={image} _id={item?._id} />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default AdsBannerSliderV2;
