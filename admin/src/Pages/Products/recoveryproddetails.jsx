import React, { useContext, useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// ✅ confirm correct one for your version
import "swiper/css";
import "swiper/css/navigation";
import "react-inner-image-zoom/lib/styles.min.css";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import {
  MdBrandingWatermark,
  MdFilterVintage,
  MdRateReview,
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import Magnifier from "./Magnifier";
import { MyContext } from "../../App";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const goto = (index) => {
    setSlideIndex(index);
    if (zoomSliderSml.current && zoomSliderSml.current.slideTo) {
      zoomSliderSml.current.slideTo(index);
    }
    if (zoomSliderBig.current && zoomSliderBig.current.slideTo) {
      zoomSliderBig.current.slideTo(index);
    }
  };
  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        setTimeout(() => {
          setProduct(res?.product);
        }, 2000);
      }
    });
  }, []);
  const [reviewsData, setReviewsData] = useState([]);

  const getReview = () => {
    fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
      if (res?.error === false) {
        setReviewsData(res?.reviews || []);
      }
    });
  };
  const context = useContext(MyContext);

  useEffect(() => {
    getReview();
  }, [id]);

  return (
    <>
      <div className="flex items-center justify-between px-2 mt-0 py-0">
        <h3 className="text-[20px] font-[600]">Products Details</h3>
       
      </div>
      <br />
      {product?._id !== "" &&
      product?._id !== undefined &&
      product?._id !== null ? (
        <>
          <div className="productDetails flex gap-5">
            <div className={`w-[40%] `}>
              {product?.images?.length !== 0 && (
                <div className="flex gap-5">
                  <div className={`slider  w-[20%]  `}>
                    <Swiper
                      direction="vertical"
                      slidesPerView={4}
                      spaceBetween={10}
                      navigation={true}
                      ref={zoomSliderSml}
                      modules={[Navigation]}
                      className={`zoomProductSliderThumbs  ${
                        product?.images?.length > 5 && "space"
                      } h-[500px] overflow-hidden`}
                      onSwiper={(swiper) => (zoomSliderSml.current = swiper)}
                      // className="zoomProductSlider h-[500px]"
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div
                              className={`item  rounded-md overflow-hidden cursor-pointer group ${
                                slideIndex === index
                                  ? "opacity-100"
                                  : "opacity-50"
                              }   `}
                              onClick={() => goto(index)}
                            >
                              <img
                                className="!w-full   transition-all group-hover:scale-105 h-full"
                                src={item}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>

                  <div className="zoomContainer w-[80%] overflow-visible relative rounded-md">
                    <Swiper
                      direction="vertical"
                      slidesPerView={1}
                      spaceBetween={0}
                      navigation={false}
                      ref={zoomSliderBig}
                      // modules={[Navigation]}
                      className="zoomProductSliderThumbs h-[500px] bg-[#78637822] overflow-hidden"
                      onSwiper={(swiper) => (zoomSliderBig.current = swiper)}
                      // className="zoomProductSlider h-[500px]"
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <Magnifier
                              src={item} // zoomSrc="/NovaCart.png"
                              zoomType="hover"
                              className="!w-full "
                              zoomPreload={true}
                              zoomScale={1}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>
            <div className={`w-[60%]`}>
              <h1 className="text-[25px] mb-4">{product?.name}</h1>
              <div className="flex py-1 ml-2  items-center">
                <span className="w-[20%]  text-[16px] flex items-center gap-2 font-[500]">
                  <MdBrandingWatermark className="opacity-65" /> Brand :{" "}
                </span>
                <span className=" text-[16px]">{product?.brand}</span>
              </div>
              <div className="flex py-1 ml-2  items-center">
                <span className="w-[20%] text-[16px] flex items-center gap-2 font-[500]">
                  <BiSolidCategoryAlt className="opacity-65" /> Category :{" "}
                </span>
                <span className=" text-[16px]">{product?.catName}</span>
              </div>
              <div className="flex py-1 ml-2  items-center">
                <span className="w-[20%]  text-[16px] flex items-center gap-2 font-[500]">
                  <BiSolidCategoryAlt className="opacity-65" /> Category :{" "}
                </span>
                <span className=" text-[16px]">{product?.catName}</span>
              </div>
              {product?.productRam?.length !== 0 && (
                <div className="flex py-1 ml-2  items-center">
                  <span className="w-[20%]  text-[16px] flex items-center gap-2 font-[500]">
                    <MdFilterVintage className="opacity-65" /> Ram :{" "}
                  </span>
                  <div className="flex items-center gap-2 ">
                    {product?.productRam?.map((ram, index) => {
                      return (
                        <span
                          key={index}
                          className="inline-block shadow-sm text-[14px] font-[500] rounded-md p-1 bg-[#fff] "
                        >
                          {ram}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              {product?.size?.length !== 0 && (
                <div className="flex py-1 ml-2  items-center">
                  <span className="w-[20%]  text-[16px] flex items-center gap-2 font-[500]">
                    <MdFilterVintage className="opacity-65" /> Size :{" "}
                  </span>
                  <div className="flex items-center gap-2 ">
                    {product?.size?.map((size, index) => {
                      return (
                        <span
                          key={index}
                          className="inline-block shadow-sm text-[14px] font-[500] rounded-md p-1 bg-[#fff] "
                        >
                          {size}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              {product?.productWeight?.length !== 0 && (
                <div className="flex py-1 ml-2  items-center">
                  <span className="w-[20%]  text-[16px] flex items-center gap-2 font-[500]">
                    <MdFilterVintage className="opacity-65" /> Weight :{" "}
                  </span>
                  <div className="flex items-center gap-2 ">
                    {product?.productWeight?.map((weight, index) => {
                      return (
                        <span
                          key={index}
                          className="inline-block shadow-sm text-[14px] font-[500] rounded-md p-1 bg-[#fff] "
                        >
                          {weight}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex py-1 ml-2  items-center">
                <span className="w-[20%] text-[16px] flex items-center gap-2 font-[500]">
                  <MdRateReview className="opacity-65" /> Review :{" "}
                </span>
                <span className=" text-[16px]">
                  (
                  {product?.reviews?.length > 0
                    ? product?.reviews?.length > 0
                    : 0}
                  ) Reviews
                </span>
              </div>
              <div className="flex py-1 ml-2  items-center">
                <span className="w-[20%] text-[16px] flex items-center gap-2 font-[500]">
                  <BsPatchCheckFill className="opacity-65" /> Published :{" "}
                </span>
                <span className=" text-[16px]">
                  {product?.createdAt?.split("T")[0]}
                </span>
              </div>
            </div>
          </div>

          <br />
          <h2 className="text-[23px] mt-3 mb-3  font-[500]">
            Product Description
          </h2>
          {product?.description && (
            <p className="text-[14px] w-[75%] mb-3"> {product?.description}</p>
          )}
          <br />
          <h2 className="text-[20px] mt-3 font-[500]">Customer Reviews</h2>

          <div className="reviewWrap mt-3">
            {reviewsData.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              reviewsData.map((review, index) => (
                <div
                  key={index}
                  className="reviews w-full h-auto mb-4 flex items-center justify-between rounded-md bg-white p-4 shadow-md"
                >
                  <div className="flex gap-8 items-center w-full">
                    <div className="img w-[95px] h-[95px] rounded-full overflow-hidden">
                      <img
                        src={context?.userData?.avatar || "/profile.jpg"}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>

                    <div className="info w-full">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[14px] font-[500]">
                          {review?.userName || "Anonymous"}
                        </h4>

                        <Rating
                          name="read-only"
                          size="medium"
                          value={Number(review?.rating)}
                          readOnly
                        />
                      </div>

                      <span className="text-[13px] text-gray-500">
                        {review?.createdAt?.split("T")[0]}
                      </span>
                  <div className="h-[100px] max-h-[100px] overflow-y-auto overflow-x-hidden">
  <p className="text-[14px] leading-5 break-words">
    {review?.review}
  </p>
</div>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center min-h-[500px] justify-center">
          <CircularProgress color="inherit" />
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default ProductDetails;
