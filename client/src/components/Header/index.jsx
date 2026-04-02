import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import Tooltip from "@mui/material/Tooltip";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Navigation from "./Navigation";
import { BsFillBagCheckFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";

import { myContext } from "../../App";
import Button from "@mui/material/Button";
import { fetchDataFromApi, postData } from "../../utils/api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useNavigate();
  const context = useContext(myContext);
  const logout = () => {
    setAnchorEl(null);
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
        history("/");
      }
    });
  };

  return (
    <header className=" !bg-white sticky z-[100] -top-[47px]">
      {/* <div className="top-strip !py-0.5 border-t-[1px] border-b-[1px] border-gray-300"> */}
      <div className="top-strip h-[50px] flex items-center border-t border-b border-gray-300">
        <div className="container-fluid">
          <div className="flex items-center px-0 justify-between">
            <div className="col1 hidden lg:block w-[40%] lg:w-[25%]">
              <p className="text-[14px] font-[500]">
                Get Up to 50% off new season styles,limited time only
              </p>
            </div>
            <div className="col2  flex items-center justify-between w-full lg:w-[50%] lg:justify-end">
              <ul className="flex !pl-0 w-full items-center justify-between lg:justify-end gap-3  ">
                <li className="list-none pt-2.5">
                  <Link
                    to="/help-center"
                    className="text-[13px] lg:text-[14px]  link font-[500] transition "
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none pt-2.5 ">
                  <Link
                    to="/order-status"
                    className="text-[13px] lg:text-[14px]  link font-[500] transition "
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header  border-t border-b border-gray-300 py-1 lg:py-4">
        <div className="container-fluid flex items-center justify-between ">
          {context?.windowWidth < 992 && (
            <Button
              onClick={() => setIsOpenCategoryPanel(true)}
              className="!w-[35px] !text-gray-800 !rounded-full !h-[35px] !min-h-[35px] !min-w-[35px]"
            >
              <HiOutlineMenu size={36} />
            </Button>
          )}

          <div className="col1 w-[50%] lg:w-[25%]">
            <Link to="/">
              <img
                src="/mainBanner.png"
                alt="Logo"
                className="object-contain w-[300px] flex items-center"
              />
            </Link>
          </div>

          <div
            className={`col2 fixed  w-full z-50 top-0 left-0 h-full
  lg:w-[45%] lg:static
  ${context?.windowWidth > 992 || context?.openSearchPanel ? "block" : "hidden"}
  `}
          >
            <Search />
          </div>

          <div className="col3 w-[10%] lg:w-[30%] pl-7 flex items-center ">
            <ul className="flex items-center gap-0 lg:gap-3 justify-end w-full">
              {context.isLogin === false && context?.windowWidth > 992 ? (
                <li className="list-none ">
                  <Link
                    to="/login"
                    className="link no-underline pr-2 transition  items-center text-[20px] font-[500]"
                  >
                    Login
                  </Link>
                  |{" "}
                  <Link
                    className="no-underline link   text-[20px] transition font-[500]"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  {context?.windowWidth > 992 && (
                    <li>
                      <Button
                        onClick={handleClick}
                        className="!text-[#000] myAccountWrap flex items-center cursor-pointer gap-3"
                      >
                        {context?.windowWidth > 992 && (
                          <div className="flex items-center cursor-pointer gap-3">
                           <IconButton className="!w-[40px] !h-[40px] !p-0 !bg-[#f1f1f1]">
  <img
    className="w-full rounded-full h-full object-cover"
    src={
      context?.previews?.length > 0
        ? context?.previews[0]                          // user uploaded
        : context?.userData?.avatar           // Google image
        || "/profile.jpg"                     // default image
    }
    onError={(e) => { e.target.src = "/profile.jpg"; }}
    alt="Profile"
  />
</IconButton>


                            {context?.windowWidth > 992 && (
                              <div className="info flex flex-col">
                                <h4 className="text-[14px] !normal-case leading-3 text-[rgba(0,0,0,0.7)] font-[500] !text-left !mb-1">
                                  {context.userData?.name}
                                </h4>
                                <span className="text-[13px] !normal-case text-[rgba(0,0,0,0.7)] font-[400] !text-left">
                                  {context.userData?.email}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        className="w-[500px]"
                        slotProps={{
                          paper: {
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <Link className="w-full block link" to="/my-account">
                          <MenuItem
                            className="flex !py-2 gap-2 "
                            onClick={handleClose}
                          >
                            <FaRegUser className="text-[rgba(0,0,0,0.7)] text-[18px]" />{" "}
                            <span className="!text-[14px]">My Account </span>
                          </MenuItem>
                        </Link>
                        <Link className="w-full block link" to="/my-orders">
                          <MenuItem
                            className="flex !py-2 gap-2 "
                            onClick={handleClose}
                          >
                            <BsFillBagCheckFill className="text-[rgba(0,0,0,0.7)] text-[18px]" />{" "}
                            <span className="!text-[14px]"> My Orders</span>
                          </MenuItem>
                        </Link>
                        <Link className="w-full block link" to="/my-list">
                          <MenuItem
                            className="flex !py-2 gap-2 "
                            onClick={handleClose}
                          >
                            <FaRegHeart className="text-[18px] text-[rgba(0,0,0,0.7)]" />{" "}
                            <span className="!text-[14px]"> My List </span>
                          </MenuItem>
                        </Link>

                        <MenuItem
                          className="flex !py-2 gap-2 "
                          onClick={logout}
                        >
                          <IoIosLogOut className="text-[18px] text-[rgba(0,0,0,0.7)]" />{" "}
                          <span className="!text-[14px]">Logout</span>
                        </MenuItem>
                      </Menu>
                    </li>
                  )}
                </>
              )}

              {context?.windowWidth > 992 && (
                <li>
                  {" "}
                  <Tooltip placement="bottom" title="WishList">
                    <Link to="my-list">
                      <IconButton aria-label="cart">
                        <StyledBadge
                          badgeContent={
                            context?.myListData?.length !== 0
                              ? context?.myListData?.length
                              : 0
                          }
                          color="secondary"
                        >
                          <FaRegHeart />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  </Tooltip>
                </li>
              )}

              <li>
                {" "}
                <Tooltip placement="bottom" title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCartPanel(true)}
                  >
                    <StyledBadge
                      badgeContent={
                        context?.cartData?.length !== 0
                          ? context?.cartData?.length
                          : 0
                      }
                      color="secondary"
                    >
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation
        setIsOpenCategoryPanel={setIsOpenCategoryPanel}
        isOpenCategoryPanel={isOpenCategoryPanel}
      />
    </header>
  );
};

export default Header;
