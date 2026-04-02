import React from "react";

const Progress = (props) => {
  return (
    <>
      <div className="overflow-hidden w-[100px] h-[auto] rounded-md bg-[#f1f1f1]">
        <span
          className={`flex items-center w-[${props.value}%] h-[8px] ${
            props.type === "error" && "bg-red-600"
          } ${
            props.type === "warning" && "bg-orange-500"
          } ${
            props.type === "success" && "bg-green-600"
          }`}
        ></span>
      </div>
    </>
  );
};

export default Progress;
