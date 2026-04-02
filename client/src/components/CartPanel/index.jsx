import React, { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import { myContext } from "../../App";
import { deleteData } from "../../utils/api";

const CartPanel = (props) => {
  const context = useContext(myContext);
  const removeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
      console.log(" res from cartPanel", res);

      context?.openAlertBox("success", "Item Removed Successfully from cart ");
      context?.getCartItems();
    });
  };
  return (
    <>
      <div className="scroll w-full max-h-[300px] overflow-y-scroll py-1 px-2 overflow-x-hidden">
        {props?.data?.map((item, index) => {
          return (
            <div className="cartitem  pb-2 border-b-2  border-[rgba(0,0,0,0.2)]   w-full flex items-center ">
              <div onClick={context?.toggleCartPanel(false)} className="img m-2 w-[25%] overflow-hidden h-[100px] rounded-md">
                <Link
                  to={`/product-details/${item._id}`}
                  className="block group"
                >
                  <img
                    className="w-full group-hover:scale-105"
                    src={item?.image}
                    alt=""
                  />
                </Link>
              </div>

              <div className=" pr-5 info pt-0 relative w-[75%]">
                <h4 onClick={context?.toggleCartPanel(false)} className="text-[13px] lg:text-[16px] font-[500]">
                  <Link
                    to={`/product-details/${item._id}`}
                    className="link transition-all"
                  >
                    {console.log("item", item)}
                    {item?.productTitle.substr(0, 40) + "..."}
                  </Link>
                </h4>
                <p className="flex mt-2 mb-2 items-center gap-5">
                  <span className="text-[13px] sm:text-[14px]">
                    Qty : <span>{item?.quantity}</span>
                  </span>
                  <span className="!text-primary font-bold">
                   
                    {(item?.quantity * item?.price)?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </p>

                <MdOutlineDeleteOutline
                  onClick={() => removeItem(item._id)}
                  className="absolute text-[24px] link transition-all top-[10px] right-[10px] cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <div className="bottomSec pr-5 absolute bottom-[10px] left-[10px] overflow-hidden w-full">
        <div className="bottomInfo flex-col py-3 px-4 w-full border-t flex items-center justify-between border-[rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">
              {context?.cartData?.length} item
            </span>
            <span className="!text-primary font-bold">
              {(context?.cartData?.length !== 0
                ? context?.cartData
                    ?.map((item) => parseInt(item.price) * item?.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
        </div>

        <div className="bottomInfo flex-col py-3 px-4 w-full border-t flex items-center justify-between border-[rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Total (tax incl.)</span>
            <span className="!text-primary font-bold">
              {" "}
              {(context?.cartData?.length !== 0
                ? context?.cartData
                    ?.map((item) => parseInt(item.price) * item?.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>

          <br />
          <div className="flex gap-2 items-center w-full justify-between">
            <Link
              to="/cart"
              onClick={context.toggleCartPanel(false)}
              className="w-[50%] d-block"
            >
              <Button className="btn-org w-full">View Cart</Button>
            </Link>

            <Link  onClick={context.toggleCartPanel(false)} to="/checkout" className="w-[50%] d-block">
              <Button className="btn-org btn-border w-full">CheckOut</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPanel;
