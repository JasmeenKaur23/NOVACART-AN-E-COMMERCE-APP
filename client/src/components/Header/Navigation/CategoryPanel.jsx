import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CategoryCollapse from "../../CategoryCollpase";
import { myContext } from "../../../App";
import { fetchDataFromApi } from "../../../utils/api";

const CategoryPanel = (props) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCategoryPanel(newOpen);
    // props?.setIsOpenCategoryPanel(newOpen);
  };

  const toggleSubmenu = (category) => {
    setOpenSubmenu(openSubmenu === category ? null : category);
  };
  const context = useContext(myContext);
  const toggleNestedSubmenu = (subcategory) => {
    setOpenNestedSubmenu(
      openNestedSubmenu === subcategory ? null : subcategory
    );
  };
  const history=useNavigate()
 
  // ✅ Category Data
  const categories = [
    {
      name: "Fashion",
      subcategories: [
        {
          name: "Apparels",
          nested: ["T-Shirts", "Pants", "Jackets"],
        },
        { name: "Footwear" },
        { name: "Accessories" },
        { name: "Leather Watch" },
      ],
    },
    {
      name: "Electronics",
      subcategories: [
        { name: "Home Appliances" },
        { name: "Smart Watch" },
        { name: "Mobile Accessories" },
        { name: "Air Conditioner" },
        { name: "Refrigerator" },
        { name: "Kitchen Appliances" },
        { name: "Home Theater and Speaker" },
        { name: "Cooler" },
        { name: "Neckband & Ear Buds" },
        { name: "Fragrance & Personal Care" },
        { name: "Bags & Trolley" },
        { name: "Mobile Phones" },
      ],
    },
    {
      name: "Home & Kitchen",
      subcategories: [
        { name: "Furniture" },
        { name: "Decor" },
        { name: "Cookware" },
      ],
    },
  ];

  // ✅ Drawer Content
  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" className="categoryPanel">
      {/* Header */}
      {/* src={localStorage.getItem('logo')}  */}{" "}
      <div className="p-3">
        {" "}
        <img src="/image.png" className="w-[180px]" alt="" />{" "}
      </div>
      <h4 className="p-2 mt-2 flex ml-2 items-center justify-between text-[18px] font-[500] border-b border-gray-200">
        Shop by Categories
        <IoCloseSharp
          className="cursor-pointer mr-1 text-[20px]"
          onClick={toggleDrawer(false)}
        />
      </h4>
      {/* Scrollable Section */}
      {props?.data?.length !== 0 && <CategoryCollapse data={props?.data} />}
      {context?.windowWidth < 992 && context?.isLogin === false && (
        <Link
          onClick={() => {
            props?.setIsOpenCategoryPanel(false);
            props?.SetIsOpenCategoryPanel(false);
          }}
          to="/login"
          className="p-3 block"
        >
          {" "}
          <Button className="btn-org w-full">Login</Button>
        </Link>
      )}
      {context?.windowWidth < 992 && context?.isLogin === true && (
        <div
          onClick={() => {
              props?.setIsOpenCategoryPanel(false);
            // props?.propsSetIsOpenCategoryPanel(false);
       
             fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      console.log("hello");

      console.log(res);
      if (res?.error === false) {
        context.setIsLogin(false);
        console.log("hello");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        context?.setUserData(null);
        context?.setCartdata([]);
        context?.setMyListdata([]);
        history("/login");
      }
    });
            
          }}
          className="p-3 block"
        >
          {" "}
          <Button  className="btn-org w-full">Logout</Button>
        </div>
      )}
    </Box>
  );

  return (
    <Drawer open={props.isOpenCategoryPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;
