import React from "react";

const ProductLoading = () => {
  const skeletonItems = Array(6).fill(0);

  return (
    <div className="ml-4 flex gap-5 animate-pulse !  py-5 scrollableBox">
      {skeletonItems.map((_, i) => (
        <div key={i} className="col flex-1  max-w-[17%] h-[280px] flex flex-col">
          {/* Image Box */}
          <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-lg mb-4">
            <svg
              className="w-12 h-12 text-gray-300"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
          </div>

          {/* Text Bars */}
          <div className="h-3 bg-gray-200 rounded-full w-full mb-3"></div>
          <div className="h-3 bg-gray-200 rounded-full w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded-full w-5/6 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded-full w-4/6 mb-3"></div>
          <div className="h-12 bg-gray-200 rounded-sm w-full px-3 mb-3"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductLoading;
