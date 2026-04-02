import React from "react";

const BannerLoading = () => {
  return (
  <div className="homeBannerSlider bg-white relative z-[100] pt-0 pb-0 lg:pt-5 lg:pb-5">
  <div className="container">
    <div className="item rounded-[10px] overflow-hidden relative">
    <div className="w-full h-[120px] md:h-[100px] lg:h-[397px] bg-gray-200 relative">
    {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

        {/* Centered SVG */}
        <svg
          className="w-8 h-8 lg:w-16 lg:h-16 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 18"
          fill="currentColor"
          aria-label="Loading slider"
          role="img"
        >
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Zm-2 0H5V5h14Zm-3-10l-2.5 3.01-1.75-2.01L9 14h8l-4-5Z" />
        </svg>
      </div>
    </div>
  </div>
</div>

  );
};

export default BannerLoading;