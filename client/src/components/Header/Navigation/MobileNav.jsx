import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router";
import { BsBagCheck } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";
import { myContext } from "../../../App";

const MobileNav = () => {
  const context = useContext(myContext);
  const location = useLocation();
  useEffect(() => {
    console.log("location", location.pathname);

    if (location.pathname === "/product-listing") {
      context?.setIsFilterBtnShow(true);
    } else {
      context?.setIsFilterBtnShow(false);
    }
  }, [location]);
  const openFilters = () => {
    context?.setOpenFilter(true);
  };
  return (
    <div className="mobileNav z-[51] gap-0 bg-white px-3  flex items-center justify-between fixed bottom-0  left-0   w-full p-1">
      <NavLink to="/" exact={true} activeClassName="isActive">
        <Button className="flex-col  !text-gray-700 !capitalize !w-[40px] !min-w-[40px] ">
          <IoHomeOutline size={18} />
          <span className="text-[12px]">Home</span>
        </Button>
      </NavLink>
      {context?.isFilterBtnShow === true && (
        <Button
          onClick={openFilters}
          className="flex-col !bg-primary  !rounded-full !text-gray-700 !capitalize !w-[40px] !h-[40px] !min-w-[40px] "
        >
          <MdOutlineFilterAlt className="!text-white" size={18} />
        </Button>
      )}

      <Button onClick={()=>context?.setOpenSearchPanel(true)} className="flex-col  !text-gray-700 !capitalize !w-[40px] !min-w-[40px] ">
        <IoSearch size={18} />
        <span className="text-[12px]">Search</span>
      </Button>
      <NavLink to="/my-list" exact={true} activeClassName="isActive">
        {" "}
        <Button className="flex-col  !text-gray-700 !capitalize !w-[40px] !min-w-[40px] ">
          <GoHeart size={18} />
          <span className="text-[12px]">WishList</span>
        </Button>
      </NavLink>
      <NavLink to="/my-orders" exact={true} activeClassName="isActive">
        <Button className="flex-col  !text-gray-700 !capitalize !w-[40px] !min-w-[40px] ">
          <BsBagCheck size={18} />
          <span className="text-[12px]">Orders</span>
        </Button>
      </NavLink>
      <NavLink to="/my-account" exact={true} activeClassName="isActive">
        <Button className="flex-col  !text-gray-700 !capitalize !w-[40px] !min-w-[40px] ">
          <FiUser size={18} />
          <span className="text-[12px]">Account</span>
        </Button>
      </NavLink>
    </div>
  );
};

export default MobileNav;
