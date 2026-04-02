import React, { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { myContext } from "../../App";
import { fetchDataFromApi, uploadImage } from "../../utils/api";
import { LuMapPinCheck } from "react-icons/lu";

const AccountSideBar = () => {
  const context = useContext(myContext);
  const [previews, setPreviews] = useState([]);
  const formdata = new FormData();
  const [uploading, setUploading] = useState(false);
  // let img_arr = [];
  // let uniqueArray = [];
  let selectedImages = [];
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);

      const files = e.target.files;
      setUploading(true);
      console.log(files);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];

          selectedImages.push(file);
          formdata.append(`avatar`, file);
        } else {
          context.openAlertBox(
            "error",
            "please select valid jpg or jpeg or webp or png image file "
          );
          setUploading(false);
          return false;
        }
      }
      console.log(formdata);
      uploadImage("/api/user/user-avatar", formdata).then((res) => {
        setUploading(false);

        let avatar = [];
        avatar.push(res?.data?.avtar);

        setPreviews(avatar);
        console.log(res);
      });
    } catch (error) {
      console.log("error in acc sidebar", error);
    }
  };
const history=useNavigate()
  useEffect(() => {
    const userAvtar = [];

    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvtar.push(context?.userData?.avatar);
      console.log(context?.userData?.avatar);
      
      setPreviews(userAvtar);
    }
  }, [context?.userData]);
   const logout = () => {
      // setAnchorEl(null);
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
    };
  return (
    <>
      <div className="card bg-white shadow-md !sticky !top-[160px] rounded-md ">
        <div className="w-full flex mx-2 group items-center justify-center flex-col p-4 ">
          <div
            className="rounded-full  mb-3 relative overflow-hidden
           bg-gray-200 flex items-center justify-center w-[110px] h-[110px]"
          >
            {uploading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                {previews?.length !== 0 ? (
                  previews?.map((img, index) => {
                    console.log("img is ",img);
                    
                    return (
                      <img
                        className="w-full flex !items-center !justify-center h-full object-cover"
                        src={img}
                        key={index}
                        alt=""
                      />
                    );
                  })
                ) : (
                  <>
                    <img
                      className="w-full flex !items-center !justify-center h-full object-cover"
                      src={"/profile.jpg"}
                      alt=""
                    />
                  </>
                )}
              </>
            )}

            <div className="overlay group-hover:!opacity-100 opacity-0 transition-all flex cursor-pointer items-center justify-center w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)]">
              <FaCloudUploadAlt className="text-[#fff] text-[28px] " />
              <input
                type="file"
                className="top-0 left-0 w-full h-full absolute opacity-0"
                name="avatar"
                accept="image/*"
                onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
                id=""
              />
            </div>
          </div>

          <h4 className="!pb-0 ">{context?.userData?.name}</h4>
          <h6 className="text-[14px] text-[rgba(0,0,0,0.7)] font-[500]">
            {context?.userData?.email}
          </h6>
        </div>

        <ul className="w-full !pl-0 px-0  pr-2 pt-0 pb-2 !mt-0 bg-[#f1f1f1] myAccountTabs list-none">
          <li className="w-full  ">
            <NavLink to="/my-account" exact={true} activeClassName="isActive">
              <Button className="w-full !px-2  !text-left  !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] flex    !items-center gap-2 ">
                <FaRegUser className="text-[18px]" />
                My Profile
              </Button>
            </NavLink>
          </li>
          <li className="w-full  ">
            <NavLink to="/address" exact={true} activeClassName="isActive">
              <Button className="w-full !px-2  !text-left  !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] flex    !items-center gap-2 ">
                <LuMapPinCheck className="text-[18px]" />
                Address
              </Button>
            </NavLink>
          </li>

          <li className="w-full  ">
            <NavLink to="/my-list" exact="true" activeClassName="isActive">
              <Button className="w-full !px-2 !text-left !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] flex    !items-center gap-2 ">
                <FaRegHeart className="text-[18px]" />
                My List
              </Button>
            </NavLink>
          </li>
          <li className="w-full  ">
            <NavLink to="/my-orders" exact="true" activeClassName="isActive">
              <Button className="w-full !px-2 !text-left !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] flex    !items-center gap-2 ">
                <BsFillBagCheckFill className="text-[18px]" />
                My Orders
              </Button>
            </NavLink>
          </li>
          <li className="w-full  ">
            <NavLink to="/logout" exact={true} activeClassName="isActive">
              <Button onClick={logout} className="w-full !px-2 !text-left !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] flex    !items-center gap-2 ">
                <IoIosLogOut className="text-[18px]" />
                Logout
              </Button>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AccountSideBar;
