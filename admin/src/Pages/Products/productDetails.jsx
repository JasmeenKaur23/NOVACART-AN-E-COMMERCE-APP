
// import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Zoom } from "swiper/modules";  // Added Zoom module

// // ✅ confirm correct one for your version
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/zoom";  // New: For pinch-zoom in modal
// import "react-inner-image-zoom/lib/styles.min.css";  // Keep if needed, but Zoom module replaces much
// import { useParams } from "react-router-dom";
// import { fetchDataFromApi } from "../../utils/api";
// import {
//   MdBrandingWatermark,
//   MdFilterVintage,
//   MdRateReview,
// } from "react-icons/md";
// import { BiSolidCategoryAlt } from "react-icons/bi";
// import { BsPatchCheckFill } from "react-icons/bs";
// import Rating from "@mui/material/Rating";
// import CircularProgress from "@mui/material/CircularProgress";
// import Magnifier from "./Magnifier";
// import { MyContext } from "../../App";


// const ProductDetails = () => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);  // New: Modal state
//   const [modalSlideIndex, setModalSlideIndex] = useState(0);  // Track modal start index
//   const zoomSliderBig = useRef();
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const zoomSliderSml = useRef();
//   const { id } = useParams();
//   const [product, setProduct] = useState();
//   const handleShowMore = useCallback((e) => {
//   e.stopPropagation();  // Stop scroll/Swiper interference
//   console.log('Button tapped!');  // Debug: Remove later
//   setShowAllReviews(true);
// }, []);
//   const goto = (index) => {
//     setSlideIndex(index);
//     if (zoomSliderSml.current?.slideTo) zoomSliderSml.current.slideTo(index);
//     if (zoomSliderBig.current?.slideTo) zoomSliderBig.current.slideTo(index);
//   };

//   // New: Open modal on tap/click
//   const openModal = (index) => {
//     setModalSlideIndex(index);
//     setModalOpen(true);
//   };

//   useEffect(() => {
//     fetchDataFromApi(`/api/product/${id}`).then((res) => {
//       if (res?.error === false) {
//         setTimeout(() => setProduct(res?.product), 2000);
//       }
//     });
//   }, [id]);

//   const [reviewsData, setReviewsData] = useState([]);

//   const getReview = () => {
//     fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
//       if (res?.error === false) setReviewsData(res?.reviews || []);
//     });
//   };

//   const context = useContext(MyContext);

//   useEffect(() => {
//     getReview();
//   }, [id]);

//   // New: Modal Component (inline for simplicity; extract if needed)
//   const ImageModal = ({ isOpen, onClose, initialSlide, images }) => {
//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-white text-2xl z-10"
//         >
//           ×
//         </button>
//         <Swiper
//           initialSlide={initialSlide}
//           modules={[Navigation, Zoom]}  // Zoom enabled
//           zoom={{ maxRatio: 3 }}  // Pinch up to 3x
//           navigation={{
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//           }}
//           className="w-full max-w-4xl max-h-full"
//           style={{ height: '90vh' }}
//           onSwiper={(swiper) => swiper.slideTo(initialSlide)}
//         >
//           {images?.map((img, i) => (
//             <SwiperSlide key={i}>
//               <div className="swiper-zoom-container">
//                 <img src={img} alt="" className="w-full h-auto max-h-full object-contain" />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="px-2">
//         <div className="flex items-center justify-between">
//           <h3 className="text-[18px] md:text-[20px] font-semibold">Product Details</h3>
//         </div>

//         {product?._id ? (
//           <>
//             {/* MAIN LAYOUT */}
//             <div className="flex flex-col md:flex-row gap-5">
//               {/* IMAGES */}
//               <div className="w-full md:w-[40%]">
//                 <div className="flex gap-3 items-start">

//                   {/* THUMBNAILS */}
//                   <div className="w-[22%] hidden md:block">
//                     <Swiper
//                       direction="vertical"
//                       slidesPerView={4}
//                       spaceBetween={10}
//                       navigation
//                       modules={[Navigation]}
//                       className="productThumbSwiper"
//                       onSwiper={(swiper) => (zoomSliderSml.current = swiper)}
//                     >
//                       {product?.images?.map((img, i) => (
//                         <SwiperSlide key={i}>
//                           <div
//                             onClick={() => goto(i)}
//                             className={`rounded-md overflow-hidden cursor-pointer ${slideIndex === i ? "opacity-100" : "opacity-40"}`}
//                           >
//                             <img src={img} className="w-full h-[90px] object-cover" />
//                           </div>
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                   </div>

//                   {/* MAIN IMAGE */}
//                   <div className="w-full md:w-[78%]">
//                     <Swiper
//                       // className="h-[420px] md:h-[450px]"
//                       className="productMainSwiper"

//                       modules={[Navigation]}
//                       navigation
//                       slidesPerView={1}
//                       onSwiper={(swiper) => (zoomSliderBig.current = swiper)}
//                     >
//                       {product?.images?.map((img, i) => (
//                         <SwiperSlide key={i}>
//                           <Magnifier 
//                             src={img} 
//                             onTap={() => openModal(i)}  // New: Tap to modal (mobile/desktop)
//                           />
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                   </div>
//                 </div>
//               </div>

//               {/* DETAILS (unchanged) */}
//               <div className="w-full md:w-[60%]">
//                 <h1 className="text-[18px] md:text-[22px] mb-2 font-semibold">{product?.name}</h1>

//                 <div className="space-y-2 mt-2">
//                   <div className="product-row">
//                     <div className="product-label">
//                       <MdBrandingWatermark className="text-gray-500" /> Brand:
//                     </div>
//                     <div className="product-value">{product?.brand}</div>
//                   </div>

//                   <div className="product-row">
//                     <div className="product-label">
//                       <BiSolidCategoryAlt className="text-gray-500" /> Category:
//                     </div>
//                     <div className="product-value">{product?.catName}</div>
//                   </div>

//                   <div className="product-row">
//                     <div className="product-label">
//                       <MdFilterVintage className="text-gray-500" /> Published:
//                     </div>
//                     <div className="product-value">{product?.createdAt?.split("T")[0]}</div>
//                   </div>
//                 </div>

//                 {/* RAM */}
//                 {product?.productRam?.length > 0 && (
//                   <div className="product-row mt-2">
//                     <div className="product-label">
//                       <MdFilterVintage className="text-gray-500" /> RAM:
//                     </div>
//                     <div className="flex gap-2 flex-wrap">
//                       {product.productRam.map((r, i) => (
//                         <span key={i} className="product-pill">{r}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* SIZE */}
//                 {product?.size?.length > 0 && (
//                   <div className="product-row mt-2">
//                     <div className="product-label">
//                       <MdFilterVintage className="text-gray-500" /> Size:
//                     </div>
//                     <div className="flex gap-2 flex-wrap">
//                       {product.size.map((s, i) => (
//                         <span key={i} className="product-pill">{s}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {product?.productWeight?.length > 0 && (
//                   <div className="product-row mt-2">
//                     <div className="product-label">
//                       <MdFilterVintage className="text-gray-500" /> Weight:
//                     </div>
//                     <div className="flex gap-2 flex-wrap">
//                       {product.productWeight.map((w, i) => (
//                         <span key={i} className="product-pill">{w}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* REVIEW COUNT */}
//                 <div className="product-row mt-2">
//                   <div className="product-label">
//                     <MdRateReview className="text-gray-500" /> Reviews:
//                   </div>
//                   <div className="product-value">({reviewsData.length}) reviews</div>
//                 </div>

//                 <div className="product-row mt-2">
//                   <div className="product-label">
//                     <BsPatchCheckFill className="text-gray-500" /> Published:
//                   </div>
//                   <div className="product-value">{product?.createdAt?.split("T")[0]}</div>
//                 </div>
//               </div>
//             </div>

//             {/* DESCRIPTION (unchanged) */}
//             <h2 className="text-[18px] mt-6 mb-2 font-semibold">Description</h2>
//             <p className="text-sm text-gray-700 max-w-[900px]">{product?.description}</p>

//             {/* REVIEWS (unchanged) */}
//           {/* REVIEWS */}
// {/* REVIEWS */}
// <h2 className="text-[18px] mt-6 font-semibold">Customer Reviews</h2>
// <div
//   className="mt-3 space-y-4"
//   style={{
//     touchAction: 'auto',
//     pointerEvents: 'auto',
//     userSelect: 'auto'
//   }}
// >
//  {reviewsData.length === 0 ? (
//     <p className="text-gray-500">No reviews yet.</p>
//   ) : (
//     <>
//       {reviewsData
//         .slice(0, showAllReviews ? reviewsData.length : 5)
//         .map((review, i) => (
//           <div
//             key={i}
//             className="bg-white rounded shadow p-3 flex flex-col md:flex-row gap-3"
//           >
//             {/* USER IMAGE */}
//             <img
//               src={context?.userData?.avatar || "/profile.jpg"}
//               className="w-[70px] h-[70px] rounded-full object-cover"
//             />

//             {/* CONTENT */}
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-center">
//                 <h4 className="text-sm font-semibold">
//                   {review?.userName || "Anonymous"}
//                 </h4>
//                 <Rating size="small" value={Number(review?.rating)} readOnly />
//               </div>

//               <span className="text-xs text-gray-500">
//                 {review?.createdAt?.split("T")[0]}
//               </span>

//               {/* SCROLL FIX */}
//               <div
//                 className="review-scroll border rounded p-2 text-sm"
//                 style={{
//                   height: "80px",
//                   maxHeight: "80px",
//                   overflowY: "auto",
//                   WebkitOverflowScrolling: "touch",
//                   overscrollBehavior: "contain",
//                   position: "relative",
//                   touchAction: "pan-y",
//                   pointerEvents: "auto",
//                   zIndex: 1,
//                   background: "white",
//                 }}
//                 // onTouchMove={(e) => e.stopPropagation()}
//               >
//                 {review?.review.repeat(3)}
//               </div>
//             </div>
//           </div>
//         ))}

//       {/* BUTTONS CONTAINER - Show More / Show Less */}
//       {reviewsData.length > 5 && (
//        <div
//   className="text-center mt-4 pt-2 space-y-2"
//   style={{
//     pointerEvents: "auto",
//     touchAction: "auto",
//     position: "relative",
//     zIndex: 999
//   }}
// >

//           {!showAllReviews ? (
//           <button
//   type="button"
//   onPointerUp={() => setShowAllReviews(true)}
//   className="inline-block px-8 py-4 min-h-[48px]
//              bg-blue-500 text-white rounded-md
//              active:scale-95 transition-all
//              text-sm font-medium cursor-pointer
//              select-none"
//   style={{
//     pointerEvents: 'auto',
//     touchAction: 'auto',
//     WebkitTapHighlightColor: 'transparent',
//   }}
// >
//   Show More ({reviewsData.length - 5} more)
// </button>


//           ) : (
//       <button
//   type="button"
//   onPointerUp={() => setShowAllReviews(false)}
//   className="inline-block px-8 py-4 min-h-[48px]
//              bg-gray-500 text-white rounded-md
//              active:scale-95 transition-all
//              text-sm font-medium cursor-pointer
//              select-none"
//   style={{
//     pointerEvents: 'auto',
//     touchAction: 'auto',
//     WebkitTapHighlightColor: 'transparent',
//   }}
// >
//   Show Less
// </button>


//           )}
//         </div>
//       )}
//     </>
//   )}
// </div>
//           </>
//         ) : (
//           <div className="min-h-[400px] flex justify-center items-center">
//             <CircularProgress />
//           </div>
//         )}
//       </div>

//       {/* New: Render Modal */}
//       <ImageModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         initialSlide={modalSlideIndex}
//         images={product?.images}
//       />
//     </>
//   );
// };

// export default ProductDetails;

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";  // Added Zoom module

// ✅ confirm correct one for your version
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";  // New: For pinch-zoom in modal
import "react-inner-image-zoom/lib/styles.min.css";  // Keep if needed, but Zoom module replaces much
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
  const [modalOpen, setModalOpen] = useState(false);  // New: Modal state
  const [modalSlideIndex, setModalSlideIndex] = useState(0);  // Track modal start index
  const zoomSliderBig = useRef();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const zoomSliderSml = useRef();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const handleShowMore = useCallback((e) => {
  e.stopPropagation();  // Stop scroll/Swiper interference
  console.log('Button tapped!');  // Debug: Remove later
  setShowAllReviews(true);
}, []);
  const goto = (index) => {
    setSlideIndex(index);
    if (zoomSliderSml.current?.slideTo) zoomSliderSml.current.slideTo(index);
    if (zoomSliderBig.current?.slideTo) zoomSliderBig.current.slideTo(index);
  };

  // New: Open modal on tap/click
  const openModal = (index) => {
    setModalSlideIndex(index);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setTimeout(() => setProduct(res?.product), 2000);
      }
    });
  }, [id]);

  const [reviewsData, setReviewsData] = useState([]);

  const getReview = () => {
    fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
      if (res?.error === false) setReviewsData(res?.reviews || []);
    });
  };

  const context = useContext(MyContext);

  useEffect(() => {
    getReview();
  }, [id]);

  // New: Modal Component (inline for simplicity; extract if needed)
  const ImageModal = ({ isOpen, onClose, initialSlide, images }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10"
        >
          ×
        </button>
        <Swiper
          initialSlide={initialSlide}
          modules={[Navigation, Zoom]}  // Zoom enabled
          zoom={{ maxRatio: 3 }}  // Pinch up to 3x
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="w-full max-w-4xl max-h-full"
          style={{ height: '90vh' }}
          onSwiper={(swiper) => swiper.slideTo(initialSlide)}
        >
          {images?.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="swiper-zoom-container">
                <img src={img} alt="" className="w-full h-auto max-h-full object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <>
      <div className="px-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] md:text-[20px]  font-semibold">Product Details</h3>
        </div>

        {product?._id ? (
          <>
            {/* MAIN LAYOUT */}
            <div className="flex flex-col md:flex-row gap-10">
              {/* IMAGES */}
              <div className="w-full md:w-[40%]">
                <div className="flex gap-3 items-start">

                  {/* THUMBNAILS */}
                  <div className="w-[22%] hidden md:block">
                    <Swiper
                      direction="vertical"
                      slidesPerView={4}
                      spaceBetween={10}
                      navigation
                      modules={[Navigation]}
                      className="productThumbSwiper"
                      onSwiper={(swiper) => (zoomSliderSml.current = swiper)}
                    >
                      {product?.images?.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div
                            onClick={() => goto(i)}
                            className={`rounded-md overflow-hidden cursor-pointer ${slideIndex === i ? "opacity-100" : "opacity-40"}`}
                          >
                            <img src={img} className="w-full h-[90px] object-cover" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* MAIN IMAGE */}
                  <div className="w-full md:w-[78%]">
                    <Swiper
                      // className="h-[420px] md:h-[450px]"
                      className="productMainSwiper"

                      modules={[Navigation]}
                      navigation
                      slidesPerView={1}
                      onSwiper={(swiper) => (zoomSliderBig.current = swiper)}
                    >
                      {product?.images?.map((img, i) => (
                        <SwiperSlide key={i}>
                          <Magnifier 
                            src={img} 
                            onTap={() => openModal(i)}  // New: Tap to modal (mobile/desktop)
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>

              {/* DETAILS (unchanged) */}
              <div className="w-full md:w-[60%] space-y-4">
  <h1 className="text-[18px] md:text-[22px] mb-3 font-semibold">{product?.name}</h1>

  {/* Product Info */}
  <div className="space-y-3">
    <div className="product-row flex justify-between items-center">
      <div className="product-label flex items-center gap-1 text-gray-600">
        <MdBrandingWatermark /> Brand :
      </div>
      <div className="product-value font-medium">{product?.brand}</div>
    </div>

    <div className="product-row flex justify-between items-center">
      <div className="product-label flex items-center gap-1 text-gray-600">
        <BiSolidCategoryAlt /> Category :
      </div>
      <div className="product-value font-medium">{product?.catName}</div>
    </div>

    {/* <div className="product-row flex justify-between items-center">
      <div className="product-label flex items-center gap-1 text-gray-600">
        <MdFilterVintage /> Published :
      </div>
      <div className="product-value font-medium">{product?.createdAt?.split("T")[0]}</div>
    </div>*/}
  </div> 

  {/* RAM */}
  {product?.productRam?.length > 0 && (
    <div className="product-row mt-3">
      <div className="product-label flex items-center gap-1 text-gray-600">
        <MdFilterVintage /> RAM :
      </div>
      <div className="flex gap-3 flex-wrap mt-1">
        {product.productRam.map((r, i) => (
          <span key={i} className="product-pill px-3 py-1 border rounded bg-gray-100">{r}</span>
        ))}
      </div>
    </div>
  )}

  {/* SIZE */}
  {product?.size?.length > 0 && (
    <div className="product-row mt-3">
      <div className="product-label flex items-center gap-1 text-gray-600">
        <MdFilterVintage /> Size :
      </div>
      <div className="flex gap-3 flex-wrap mt-1">
        {product.size.map((s, i) => (
          <span key={i} className="product-pill px-3 py-1 border rounded bg-gray-100">{s}</span>
        ))}
      </div>
    </div>
  )}

  {/* WEIGHT */}
  {product?.productWeight?.length > 0 && (
    <div className="product-row mt-3">
      <div className="product-label flex items-center gap-1 text-gray-600">
        <MdFilterVintage /> Weight :
      </div>
      <div className="flex gap-3 flex-wrap mt-1">
        {product.productWeight.map((w, i) => (
          <span key={i} className="product-pill px-3 py-1 border rounded bg-gray-100">{w}</span>
        ))}
      </div>
    </div>
  )}

  {/* REVIEWS */}
  <div className="product-row mt-4 flex justify-between items-center">
    <div className="product-label flex items-center gap-1 text-gray-600">
      <MdRateReview /> Reviews :
    </div>
    <div className="product-value font-medium">({reviewsData.length}) reviews</div>
  </div>

  <div className="product-row mt-2 flex justify-between items-center">
    <div className="product-label flex items-center gap-1 text-gray-600">
      <BsPatchCheckFill /> Published :
    </div>
    <div className="product-value font-medium">{product?.createdAt?.split("T")[0]}</div>
  </div>
</div>

            </div>

            {/* DESCRIPTION (unchanged) */}
            <h2 className="text-[18px] mt-6 mb-2 font-semibold">Description</h2>
            <p className="text-sm text-gray-700 max-w-[900px]">{product?.description}</p>

            {/* REVIEWS (unchanged) */}
          {/* REVIEWS */}
{/* REVIEWS */}
<h2 className="text-[18px] mt-6 font-semibold">Customer Reviews</h2>
<div
  className="mt-3 space-y-4"
  style={{
    touchAction: 'auto',
    pointerEvents: 'auto',
    userSelect: 'auto'
  }}
>
 {reviewsData.length === 0 ? (
    <p className="text-gray-500">No reviews yet.</p>
  ) : (
    <>
      {reviewsData
        .slice(0, showAllReviews ? reviewsData.length : 5)
        .map((review, i) => (
          <div
            key={i}
            className="bg-white rounded shadow p-3 flex flex-col md:flex-row gap-3"
          >
            {/* USER IMAGE */}
           <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                      <img
                        src={review?.image ? review?.image : "/profile.jpg"}
                        className="w-full"
                        alt=""
                      />
                    </div>

            {/* CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold">
                  {review?.userName || "Anonymous"}
                </h4>
                <Rating size="small" value={Number(review?.rating)} readOnly />
              </div>

              <span className="text-xs text-gray-500">
                {review?.createdAt?.split("T")[0]}
              </span>

              {/* SCROLL FIX */}
              <div
                className="review-scroll border rounded p-2 text-sm"
                style={{
                  height: "80px",
                  maxHeight: "80px",
                  overflowY: "auto",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain",
                  position: "relative",
                  touchAction: "pan-y",
                  pointerEvents: "auto",
                  zIndex: 1,
                  background: "white",
                }}
                // onTouchMove={(e) => e.stopPropagation()}
              >
                {review?.review}
              </div>
            </div>
          </div>
        ))}

      {/* BUTTONS CONTAINER - Show More / Show Less */}
      {reviewsData.length > 5 && (
       <div
  className="text-center mt-4 pt-2 space-y-2"
  style={{
    pointerEvents: "auto",
    touchAction: "auto",
    position: "relative",
    zIndex: 999
  }}
>

          {!showAllReviews ? (
          <button
  type="button"
  onPointerUp={() => setShowAllReviews(true)}
  className="inline-block px-8 py-4 min-h-[48px]
             bg-blue-500 text-white rounded-md
             active:scale-95 transition-all
             text-sm font-medium cursor-pointer
             select-none"
  style={{
    pointerEvents: 'auto',
    touchAction: 'auto',
    WebkitTapHighlightColor: 'transparent',
  }}
>
  Show More ({reviewsData.length - 5} more)
</button>


          ) : (
      <button
  type="button"
  onPointerUp={() => setShowAllReviews(false)}
  className="inline-block px-8 py-4 min-h-[48px]
             bg-gray-500 text-white rounded-md
             active:scale-95 transition-all
             text-sm font-medium cursor-pointer
             select-none"
  style={{
    pointerEvents: 'auto',
    touchAction: 'auto',
    WebkitTapHighlightColor: 'transparent',
  }}
>
  Show Less
</button>


          )}
        </div>
      )}
    </>
  )}
</div>
          </>
        ) : (
          <div className="min-h-[600px] flex justify-center items-center">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>

      {/* New: Render Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSlide={modalSlideIndex}
        images={product?.images}
      />
    </>
  );
};

export default ProductDetails;