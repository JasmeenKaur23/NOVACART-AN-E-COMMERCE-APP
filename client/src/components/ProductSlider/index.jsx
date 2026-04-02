import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductItem from "../ProductItems";
import { myContext } from "../../App";
const ProductSlider = (props) => {
  const context = useContext(myContext);
  return (
    <>
      <section className="productsSlider py-1 lg:py-3">
        {props?.data?.length === 0 ? (
          <div className="text-center py-10 text-red-500 font-medium">
            No Products Found
          </div>
        ) : (
          <Swiper
            slidesPerView={props.items}
            spaceBetween={10}
            scrollbar
            modules={[Navigation, FreeMode]}
            navigation={true}
            breakpoints={{
              250: { slidesPerView: 1, spaceBetween: 10 },
              350: { slidesPerView: 2, spaceBetween: 10 },
              500: { slidesPerView: 3, spaceBetween: 10 },
              900: { slidesPerView: 4, spaceBetween: 10 },
              1100: { slidesPerView: 6, spaceBetween: 10 },
            }}
            // loop={false}  // ✅ IMPORTANT
            className="mySwiper"
            freeMode={{ enabled: true, momentum: true }}
          >
            {props?.data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProductItem item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </section>
    </>
  );
};

export default ProductSlider;
