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

import React, { useState } from "react";

const Magnifier = ({ src, alt = "", onTap }) => {  // Added onTap prop for mobile trigger
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const magnifierHeight = 150;
  const magnifierWidth = 150;
  const zoomLevel = 3;

  // Mouse events (existing)
  const mouseEnter = (e) => {
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = (e) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const mouseMove = (e) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();
    const xPos = e.pageX - left - window.scrollX;
    const yPos = e.pageY - top - window.scrollY;
    setXY([xPos, yPos]);
  };

  // Touch events (new—for mobile)
  const touchStart = (e) => {
    // Trigger onTap if provided (for modal)
    if (onTap) onTap(e);
    // Simulate mouse enter
    const touch = e.touches[0];
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);  // Show magnifier on touch (optional; hide for modal-only)
  };

  const touchMove = (e) => {
    e.preventDefault();  // Prevent page scroll
    const touch = e.touches[0];
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();
    const xPos = touch.pageX - left - window.scrollX;
    const yPos = touch.pageY - top - window.scrollY;
    setXY([xPos, yPos]);
  };

  const touchEnd = (e) => {
    setShowMagnifier(false);  // Hide on lift
  };

  return (
    <div className="relative w-full h-full overflow-hidden touch-manipulation"> {/* Added touch-manipulation */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover cursor-zoom-in" // Added cursor for desktop hint
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        style={{ touchAction: 'none' }}  // Prevents double-tap zoom on image
      />

      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            opacity: "1",
            border: "1px solid lightgrey",
            backgroundColor: "white",
            borderRadius: "5px",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default Magnifier;