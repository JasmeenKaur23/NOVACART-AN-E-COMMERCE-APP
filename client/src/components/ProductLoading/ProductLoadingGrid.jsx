const ProductLoadingGrid = (props) => {
  return (
    <>
      {/* ---------------------- LIST VIEW (HORIZONTAL) ---------------------- */}
      {props?.view !== "grid" && (
        <div className="flex w-full gap-5 bg-white p-5 rounded-xl shadow animate-pulse">

          {/* IMAGE LEFT */}
          <div className="w-[30%] h-44 bg-gray-200 rounded-xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
          </div>

          {/* CONTENT RIGHT */}
          <div className="flex flex-col gap-4 w-[70%]">

            {/* Title + Subtitle */}
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>

            {/* Description */}
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>

            {/* Price */}
            <div className="flex gap-4 mt-1">
              <div className="h-4 bg-gray-200 w-16 rounded"></div>
              <div className="h-4 bg-gray-200 w-10 rounded"></div>
            </div>

            {/* Button */}
            <div className="h-10 bg-gray-200 w-40 rounded-lg"></div>
          </div>
        </div>
      )}

      {/* ---------------------- GRID VIEW (CARD STYLE) ---------------------- */}
      {props?.view === "grid" && (
        <div className="bg-white rounded-xl shadow p-3 animate-pulse w-[250px]">

          {/* IMAGE TOP */}
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
          </div>

          {/* TITLE */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

          {/* Rating */}
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>

          {/* Price row */}
          <div className="flex gap-3 mb-3">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductLoadingGrid;
