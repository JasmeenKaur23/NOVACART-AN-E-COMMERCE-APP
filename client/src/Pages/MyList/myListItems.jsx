import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { myContext } from "../../App";
import { deleteData } from "../../utils/api";


const MyListItems = (props) => {
  const context = useContext(myContext);
  const removeItem=(id)=>
  {
    deleteData(`/api/myList/${id}`).then((res)=>
    {
     console.log(res);
     
        context?.openAlertBox("success","Product Removed from My List")
        context?.getMyListData()
      
    })

  }
  return (
    <>
      <div className="cartItem p-3 flex items-center pb-3 border-b !border-[rgba(0,0,0,0.1)] gap-4 w-full">
        <div className="img w-[30%] sm:w-[15%] h-[150px] rounded-md overflow-hidden">
          <Link className="group" to={`/product-details/${props?.item?.productId}`}>
            <img
            src={props?.item?.image}    alt=""
              className="w-full group-hover:scale-125 transition-all"
            />
          </Link>
        </div>
        <div className="info w-full lg:w-[85%] relative">
          <IoCloseSharp onClick={()=>removeItem(props?.item?._id)} className="cursor-pointer link transition-all absolute !top-[0px] !right-[0px] text-[22px]" />
          <span className="text-[13px]">{props?.item?.brand}</span>
          <h4 className="text-[13px] sm:text-[16px]">
            <Link className="link" to={`/product-details/${props?.item?.productId}`}>
             {props?.item?.productTitle.substr(0,80)+'...'}
            </Link>
          </h4>
          <Rating name="size-small" value={props?.item?.rating} size="small" readOnly />

     
          <div className="flex items-center mt-2 mb-2 cursor-default text-[15px] font-[500] gap-2">
            <span className="price !text-black text-[16px] font-[700]">
              &#x20b9; {props?.item?.price}
            </span>

            <span className="oldPrice text-[16px] line-through text-gray-500">
              &#x20b9;{props?.item?.oldPrice}
            </span>

            <span className="price !text-primary text-[16px] font-[700]">
              {props?.item?.discount}% OFF{" "}
            </span>
          </div>


            </div>
      </div>
    </>
  );
};

export default MyListItems;
