import React from "react";
const PlaceholderBox = () => (
  <div className="box bg-gray-200 p-5 rounded-md animate-pulse flex gap-4 items-center">
    <div className="w-[45px] h-[45px] bg-gray-300 rounded"></div>

    <div className="flex-1 space-y-2">
      <div className="h-[14px] w-[60%] bg-gray-300 rounded"></div>
      <div className="h-[18px] w-[40%] bg-gray-300 rounded"></div>
    </div>

    <div className="w-[35px] h-[35px] bg-gray-300 rounded"></div>
  </div>
);
export default PlaceholderBox;
