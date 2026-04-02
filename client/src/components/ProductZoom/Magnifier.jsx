// import React, { useState, useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// // ✅ confirm correct one for your version
// import "swiper/css";
// import "swiper/css/navigation";

// //video 49 for correction 55min

// const Magnifier = ({ src, alt = "" }) => {
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
//   const [[x, y], setXY] = useState([0, 0]);

//   const magnifierHeight = 150;
//   const magnifierWidth = 150;
//   const zoomLevel = 3;

//   const mouseEnter = (e) => {
//     const el = e.currentTarget;
//     const { width, height } = el.getBoundingClientRect();
//     setSize([width, height]);
//     setShowMagnifier(true);
//   };

//   const mouseLeave = (e) => {
//     e.preventDefault();
//     setShowMagnifier(false);
//   };

//   const mouseMove = (e) => {
//     const el = e.currentTarget;
//     const { top, left } = el.getBoundingClientRect();

//     const xPos = e.pageX - left - window.scrollX;
//     const yPos = e.pageY - top - window.scrollY;

//     setXY([xPos, yPos]);
//   };

//   return  (
//   <div className="relative w-full h-full overflow-hidden"> {/* Removed flex/center; not needed with full-size img */}
//       <img
//         src={src}
//         alt={alt}
//         className="w-full h-full object-cover" // 🔥 FIX: w-full + object-cover = full fill, no gaps
//         onMouseEnter={mouseEnter}
//         onMouseLeave={mouseLeave}
//         onMouseMove={mouseMove}
//       />

//       {showMagnifier && (
//         <div
//           style={{
//             position: "absolute",
//             pointerEvents: "none",
//             height: `${magnifierHeight}px`,
//             width: `${magnifierWidth}px`,
//             opacity: "1",
//             border: "1px solid lightgrey",
//             backgroundColor: "white",
//             borderRadius: "5px",
//             backgroundImage: `url('${src}')`,
//             backgroundRepeat: "no-repeat",
//             top: `${y - magnifierHeight / 2}px`,
//             left: `${x - magnifierWidth / 2}px`,
//             backgroundSize: `${imgWidth * zoomLevel}px ${
//               imgHeight * zoomLevel
//             }px`,
//             backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
//             backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
//             zIndex: 10, // Ensures it appears above other elements
//           }}
//         />
//       )}
//     </div>
//   );
// };
// export default Magnifier;



//       <div className="flex items-center justify-between !top-10 px-2 mt-3 py-0">
//         <h3 className="text-[20px] font-[600]">Products Details</h3>
//       </div>
//       <br />

//       <div className="productDetails flex gap-5">
//         <div className="w-[50%]">
//           <div className="flex top-20 gap-3">
//             {/* Left thumbnails */}
//             <div className="slider w-[15%] ">
//               <Swiper
//                 direction="vertical"
//                 slidesPerView={4}
//                 spaceBetween={8}
//                 navigation={true}
//                 ref={zoomSliderSml}
//                 modules={[Navigation]}
//                 className="zoomProductSliderThumbs h-[500px] overflow-hidden"
//                 onSwiper={(swiper) => (zoomSliderSml.current = swiper)}
//               >
//                 {props?.images?.map((item, index) => (
//                   <SwiperSlide key={index}>
//                     <div
//                       className={`item rounded-md overflow-hidden cursor-pointer group ${
//                         slideIndex === index ? "opacity-100" : "opacity-30"
//                       }`}
//                       onClick={() => goto(index)}
//                     >
//                       <img
//                         className="!w-full !h-full transition-all group-hover:scale-105"
//                         src={item}
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>

//             {/* Main Zoom Image */}
//             <div className="zoomContainer w-[85%] !bottom-10 h-[600px] overflow-visible rounded-md">
//               <Swiper
//                 direction="vertical"
//                 slidesPerView={1}
//                 spaceBetween={0}
//                 navigation={false}
//                 ref={zoomSliderBig}
//                 className="zoomProductSliderThumbs overflow-visible !h-[600px]"
//                 onSwiper={(swiper) => (zoomSliderBig.current = swiper)}
//               >
//                 {props?.images?.map((item, index) => (
//                   <SwiperSlide key={index}>
//                     <div
//                       className="w-full h-full relative overflow-hidden"
//                       style={{ height: "600px" }} // 🔥 FIX: lock height
//                     >
//                       <InnerImageZoom
//                         src={item}
//                         zoomType="hover"
//                         zoomPreload={true}
//                         zoomScale={2}
//                         className="!w-full !h-full !object-contain"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;

import React, { useState } from "react";

const Magnifier = ({ src, alt = "zoom" }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const magnifierHeight = 200;
  const magnifierWidth = 200;
  const zoomLevel = 2.5;

  const mouseEnter = (e) => {
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = () => setShowMagnifier(false);

  const mouseMove = (e) => {
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();

    // Use offsetX/offsetY — works in modals, scrolls, fixed parents
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;

    // Fallback
    if (x === undefined || y === undefined) {
      x = e.pageX - el.getBoundingClientRect().left;
      y = e.pageY - el.getBoundingClientRect().top;
    }

    // Clamp to keep lens inside image
    x = Math.max(magnifierWidth / 2, Math.min(x, width - magnifierWidth / 2));
    y = Math.max(magnifierHeight / 2, Math.min(y, height - magnifierHeight / 2));

    setXY([x, y]);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover block"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
        style={{ display: "block" }}
      />

      {showMagnifier && (
        <div
          style={{
            display: "block",
            position: "absolute",
            pointerEvents: "none",
            zIndex: 9999,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            width: `${magnifierWidth}px`,
            height: `${magnifierHeight}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPosition: `${- (x * zoomLevel - magnifierWidth / 2)}px ${- (y * zoomLevel - magnifierHeight / 2)}px`,
            backgroundRepeat: "no-repeat",
            border: "3px solid #fff",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            transform: "translateZ(0)",
          }}
        />
      )}
    </div>
  );
};

export default Magnifier;
// import React, { useState, useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// // ✅ confirm correct one for your version
// import "swiper/css";
// import "swiper/css/navigation";

//video 49 for correction 55min

// const Magnifier = ({ src, alt = "" }) => {
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
//   const [[x, y], setXY] = useState([0, 0]);

//   const magnifierHeight = 150;
//   const magnifierWidth = 150;
//   const zoomLevel = 3;
// // In Magnifier component

//   const mouseEnter = (e) => {
//     const el = e.currentTarget;
//     const { width, height } = el.getBoundingClientRect();
//     setSize([width, height]);
//     setShowMagnifier(true);
//   };

//   const mouseLeave = (e) => {
//     e.preventDefault();
//     setShowMagnifier(false);
//   };

//   const mouseMove = (e) => {
//     const el = e.currentTarget;
//     const { top, left } = el.getBoundingClientRect();

//     const xPos = e.pageX - left - window.scrollX;
//     const yPos = e.pageY - top - window.scrollY;

//     setXY([xPos, yPos]);
//   };

//   return  (
//   <div className="relative w-full h-full overflow-hidden"> {/* Removed flex/center; not needed with full-size img */}
//       <img
//         src={src}
//         alt={alt}
//         className="w-full h-full object-cover" // 🔥 FIX: w-full + object-cover = full fill, no gaps
//         onMouseEnter={mouseEnter}
//         onMouseLeave={mouseLeave}
//         onMouseMove={mouseMove}
//       />

//       {showMagnifier && (
//         <div
//           style={{
//             position: "absolute",
//             pointerEvents: "none",
//             height: `${magnifierHeight}px`,
//             width: `${magnifierWidth}px`,
//             opacity: "1",
//             border: "1px solid lightgrey",
//             backgroundColor: "white",
//             borderRadius: "5px",
//             backgroundImage: `url('${src}')`,
//             backgroundRepeat: "no-repeat",
//             top: `${y - magnifierHeight / 2}px`,
//             left: `${x - magnifierWidth / 2}px`,
//             backgroundSize: `${imgWidth * zoomLevel}px ${
//               imgHeight * zoomLevel
//             }px`,
//             backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
//             backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
//             zIndex: 10, // Ensures it appears above other elements
//           }}
//         />
//       )}
//     </div>
//   );
// };
// export default Magnifier;