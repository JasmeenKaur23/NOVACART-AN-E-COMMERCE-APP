import Button from "@mui/material/Button";
import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
const QtyBox = (props) => {
  const [qtyVal, setQtyVal] = useState(1);

  const plusQty = () => {
    if (qtyVal === 20) {
      setQtyVal(20);
    } else {
      setQtyVal(qtyVal + 1);
      props?.handleSelectQty(qtyVal+1)
    }
  };
  const minusQty = () => {
    if (qtyVal === 1) {
      setQtyVal(1);
        props?.handleSelectQty(1)
    } else {
      setQtyVal(qtyVal - 1);
        props?.handleSelectQty(qtyVal-1)
    }
  };
  return (
    <div className="qtyBox flex  relative items-center">
      <input
        type="number"
        value={qtyVal}
        className="w-full !border-2 !border-[#ff5252] h-[40px] !pl-4 text-[15px] focus:outline-none border-1 rounded-md border-[rgba(0,0,0,0.2)]"
      />
      <div className="flex absolute !border-l-2 !border-[#ff5252] top-0 right-0 z-80 items-center justify-between h-[40px] flex-col">
        <Button
          onClick={plusQty}
          className="!text-primary !min-w-[25px] hover:!bg-[#ff5252] hover:!text-white  !w-[30px] !h-[20px] !rounded-none"
        >
          <FaAngleUp
            size={14}
            className={qtyVal === 20 ? "opacity-50" : "opacity-100"}
          />
        </Button>
        <Button
          onClick={minusQty}
          className="!text-primary hover:!bg-[#ff5252] hover:!text-white  !min-w-[25px] !w-[30px] !h-[20px] !rounded-none"
        >
          <FaAngleDown
            className={qtyVal === 1 ? "opacity-50" : "opacity-100"}
            size={14}
          />
        </Button>{" "}
      </div>

      
    </div>
  );
};

export default QtyBox;
