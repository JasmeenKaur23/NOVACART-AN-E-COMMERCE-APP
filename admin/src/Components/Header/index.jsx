import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell, FaRegUser } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { MdMenuOpen } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import Dialog from "@mui/material/Dialog";

// import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import AddProduct from "../../Pages/Products/addProduct";
import AddHomeSlide from "../../Pages/HomeSliderBanners/addHomeSlide";
import AddCategory from "../../Pages/Category/addCategory";
import AddSubCategory from "../../Pages/Category/addSubCategory";
import AddAddress from "../../Pages/Address/addAddress";
import EditCategory from "../../Pages/Category/editCategory";
import Slide from "@mui/material/Slide";
import EditProduct from "../../Pages/Products/editProduct";
import AddBannerV1 from "../../Pages/Banners/addBannerV1";
import EditBannerV1 from "../../Pages/Banners/editBannerV1";
import AddBlog from "../../Pages/Blog/addBlog";
import EditBlog from "../../Pages/Blog/editBlog";
import BannerList2 from "../../Pages/Banners/bannerList2";
import BannerList2_Add_Banner from "../../Pages/Banners/bannerList2_AddBanner";
import BannerList2_Edit_Banner from "../../Pages/Banners/bannerList2_Edit_Banner";
import EditHomeSlide from "../../Pages/HomeSliderBanners/editHomeSlide";
import CatBanner from "../../Pages/Banners/catBanner";
import CatBanner_Edit_Banner from "../../Pages/Banners/catBanner_edit";
import CatBanner_Add_Banner from "../../Pages/Banners/catBanner_add";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const open = Boolean(anchorMyAcc);
  const history=useNavigate();
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);


    const logout = () => {
      setAnchorMyAcc(null);
      fetchDataFromApi(
        `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
        { withCredentials: true }
      ).then((res) => {
       
        
        console.log(res);
        if (res?.error === false) {
          context.setIsLogin(false);
          console.log("hello");
          
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          history('/login')
        }
        
      });
    };
  return (
    <>
    <header
      className={`w-full !shadow-md h-auto pr-7 py-2 fixed top-0 left-0 z-[50] ${
        context.isSidebarOpen === true ? "pl-80" : "pl-10"
      } 
      ${context.isSidebarOpen === true && context?.windowWidth < 992 && '!pl-96'
      } flex transition-all justify-between items-center bg-[#fff]`}
    >
      <div className="part1">
        <Button
          onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
          className="!w-[40px] !h-[40px] !rounded-full !text-[rgba(0,0,0,0.7)] !min-w-[40px]"
        >
          {context.isSidebarOpen === true ? (
            <MdMenuOpen className="text-[32px] font-bold text-[rgba(0,0,0,0.9)]" />
          ) : (
            <RiMenu2Line className="text-[32px] font-bold text-[rgba(0,0,0,0.9)]" />
          )}
        </Button>
      </div>

      <div className="part2 w-[40%] flex items-center gap-5 justify-end">
      

        {context.isLogin === true ? (
          <div className="relative">
            {" "}
            <Tooltip title="Account Settings" arrow>
              <div
                onClick={handleClickMyAcc}
                className="rounded-full overflow-hidden cursor-pointer w-[40px] h-[40px]"
              >
                 <IconButton className="!w-[40px] !h-[40px] !p-0 !bg-[#f1f1f1]">
  <img
    src={context?.userData?.avatar || "/profile.jpg"}
    onError={(e) => { e.target.src = "/profile.jpg"; }}
    className="!rounded-full !w-[40px] !h-[40px] object-cover"
    alt="Profile"
  />
</IconButton>
              </div>
            </Tooltip>
            <Menu
              anchorEl={anchorMyAcc}
              id="account-menu"
              open={open}
              onClose={handleCloseMyAcc}
              onClick={handleCloseMyAcc}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem className="!bg-white" onClick={handleCloseMyAcc}>
                <div className="flex items-center gap-5">
                  {" "}
                  <div className="rounded-full overflow-hidden cursor-pointer w-[40px] h-[40px]">
                     <IconButton className="!w-[40px] !h-[40px] !p-0 !bg-[#f1f1f1]">
  <img
    src={context?.userData?.avatar || "/profile.jpg"}
    onError={(e) => { e.target.src = "/profile.jpg"; }}
    className="!rounded-full !w-[40px] !h-[40px] object-cover"
    alt="Profile"
  />
</IconButton>
                  </div>
                  <div className="info">
                    <h5 className="font-[500] leading-5 text-[15px]">
                     {context?.userData?.name}
                    </h5>
                    <p className="text-[13px] font-[400] opacity-70 ">
                       {context?.userData?.email}
                
                    </p>
                  </div>
                </div>
              </MenuItem>

              <Divider />

              <Link to="/profile">
              <MenuItem
                className="!bg-white flex items-center gap-5"
                onClick={handleCloseMyAcc}
              >
                <FaRegUser className="text-[18px]" />{" "}
                <span className="text-[14px]">Profile</span>
              </MenuItem>
</Link>
              <MenuItem
                className="!bg-white flex items-center gap-5"
              onClick={logout}
              >
                <IoMdLogOut className="text-[18px]" />{" "}
                <span className="text-[14px]">Sign Out</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/login">
            <Button className="btn-blue btn-sm !rounded-full">Sign In</Button>
          </Link>
        )}
      </div>
    </header>

     <Dialog
          fullScreen
          open={context?.isOpenFullScreenPanel.open}
          onClose={() =>
            context?.setIsOpenFullScreenPanel({
              open: false,
            })
          }
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() =>
                  context?.setIsOpenFullScreenPanel({
                    open: false,
                  })
                }
                aria-label="close"
              >
                <IoMdClose className="text-black" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {context?.isOpenFullScreenPanel?.model}
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() =>
                 context?.setIsOpenFullScreenPanel({
                    open: false,
                  })
                }
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          {context?.isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
          {/* {context?.isOpenFullScreenPanel.model === "Add Product" && <AddProduct />} */}

          {context?.isOpenFullScreenPanel?.model === "Add Home Slide" && (
            <AddHomeSlide />
          )}
          {context?.isOpenFullScreenPanel?.model === "Edit Home Slide" && (
            <EditHomeSlide />
          )}
          {context?.isOpenFullScreenPanel?.model === "Add New Category" && (
            <AddCategory />
          )}
          {context?.isOpenFullScreenPanel?.model === "Add New Sub Category" && (
            <AddSubCategory />
          )}
          {context?.isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}
          {context?.isOpenFullScreenPanel?.model === "Edit Category" && (
            <EditCategory />
          )}
          {context?.isOpenFullScreenPanel?.model === "Edit Product" && (
            <EditProduct />
          )}
          {context?.isOpenFullScreenPanel?.model === "Add BannerV1" && (
            <AddBannerV1 />
          )}
          {context?.isOpenFullScreenPanel?.model === "Add Home Banner List2" && (
            <BannerList2_Add_Banner />
          )}
             {context?.isOpenFullScreenPanel?.model === "Edit BannerV1" && (
            <EditBannerV1 />
          )}
             {context?.isOpenFullScreenPanel?.model === "Edit bannerList2" && (
            <BannerList2_Edit_Banner />
          )}
             {context?.isOpenFullScreenPanel?.model === "Add Blog" && (
            <AddBlog />
          )}
           {context?.isOpenFullScreenPanel?.model === "Edit Blog" && (
            <EditBlog />
          )}
             {context?.isOpenFullScreenPanel?.model === "Add Cat Banner" && (
            <CatBanner_Add_Banner />
          )}
           {context?.isOpenFullScreenPanel?.model === "Edit CatBanner" && (
            <CatBanner_Edit_Banner />
          )}
        </Dialog>
    </>
  );
};

export default Header;
