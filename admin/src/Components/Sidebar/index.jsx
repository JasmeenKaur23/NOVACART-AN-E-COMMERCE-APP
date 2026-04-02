import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown, FaRegImage } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntFill } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { Collapse } from "react-collapse";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
const Sidebar = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(index);
    }
  };

  const context = useContext(MyContext);
  

  const logout = () => {
    context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
      setSubMenuIndex(null)
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      {
        withCredentials: true,
      }
    ).then((res) => {
      if (res?.error === false) {
        context?.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history("/login");
      }
    });
  };
  return (
    <>
      <div
        className={`overflow-hidden  sidebar w-[${
          context.isSidebarOpen === true
            ? `${context?.sidebarWidth / 1.5}%`
            : "0px"
        }] py-2 px-4  fixed top-0 z-[52] left-0 bg-[#fff]  h-full border-r border-[rgba(0,0,0,0.1)]`}
      >
        <div
          onClick={() => {
            context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
            setSubMenuIndex(null);
          }}
          className="w-full py-2"
        >
          <Link to="/">
            <img className="w-[200px] h-[80px]" src="/image.png" alt="" />
          </Link>
        </div>

        <ul className="mt-4 overflow-y-scroll max-h-[75vh]">
          <li>
            <Link
              onClick={() => {
                context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
                setSubMenuIndex(null);
              }}
              to="/"
            >
              <Button className="w-full hover:!bg-[#c8c7c7] !py-2 items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize">
                <RxDashboard className="text-[20px]" />
                <span> Dashboard</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              onClick={() => isOpenSubMenu(1)}
              className="w-full !py-2 hover:!bg-[#c8c7c7]   items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize"
            >
              <FaRegImage className="text-[20px]" />
              <span> Home Slides</span>
              <span className="ml-auto h-[30px]  w-[30px] flex items-center justify-center ">
                {" "}
                <FaAngleDown
                  className={`text-[17px] transition-all ${
                    subMenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={subMenuIndex === 1 ? true : false}>
              {" "}
              <ul className="w-full ">
                <li className="w-full">
                  <Link
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                      setSubMenuIndex(null);
                    }}
                    to="/homeSlider/list"
                  >
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px]  rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Home Banner List
                    </Button>
                  </Link>
                </li>
                {/* <li className="w-full">
                  <Link to="/HomeBanner/add">
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9  !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Add Home Slide List
                    </Button>
                  </Link>
                </li> */}
                <li className="w-full">
                  <Button
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Home Slide",
                      });
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                      setSubMenuIndex(null);
                    }}
                    className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9  !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]" />
                    Add Home Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              onClick={() => isOpenSubMenu(4)}
              className="w-full !py-2 hover:!bg-[#c8c7c7]   items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize"
            >
              <TbCategory className="text-[20px]" />
              <span> Category</span>
              <span className="ml-auto h-[30px]  w-[30px] flex items-center justify-center ">
                {" "}
                <FaAngleDown
                  className={`text-[17px] transition-all ${
                    subMenuIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={subMenuIndex === 4 ? true : false}>
              {" "}
              <ul className="w-full ">
                <li className="w-full">
                  <Link
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                      setSubMenuIndex(null);
                    }}
                    to="/category/List"
                  >
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px]  rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Category",
                      });

                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                      setSubMenuIndex(null);
                    }}
                    className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9  !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]">
                      {" "}
                    </span>{" "}
                    Add a category
                  </Button>
                </li>
                <li className="w-full">
                  <Link
                    onClick={() =>
                      context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false)
                    }
                    to="/subCategory/list"
                  >
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9  !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Sub category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Sub Category",
                      });
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                      setSubMenuIndex(null);
                    }}
                    className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9  !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]">
                      {" "}
                    </span>{" "}
                    Add a Sub category
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              onClick={() => isOpenSubMenu(3)}
              className="w-full !py-2 hover:!bg-[#c8c7c7]   items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize"
            >
              <RiProductHuntFill className="text-[20px]" />
              <span> Products</span>
              <span className="ml-auto h-[30px]  w-[30px] flex items-center justify-center ">
                {" "}
                <FaAngleDown
                  className={`text-[17px] transition-all ${
                    subMenuIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={subMenuIndex === 3 ? true : false}>
              {" "}
              <ul className="w-full ">
                <li className="w-full">
                  <Link
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                      setSubMenuIndex(null);
                    }}
                    to="/products"
                  >
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px]  rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Product List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  {/* <Button
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                    }
                    className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9  !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]">
                      {" "}
                    </span>{" "}
                    Upload product
                  </Button> */}
                  <Button
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      });
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                      setSubMenuIndex(null);
                    }}
                    className="!capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Product
                  </Button>
                </li>
                <li className="w-full">
                  <Link
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                      setSubMenuIndex(null);
                    }}
                    to="/product/addRams"
                  >
                    <Button className="!capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Add Product RAMS
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    onClick={() =>{
                      context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false)
                        setSubMenuIndex(null)
                    }
                    }
                    to="/product/addWeight"
                  >
                    <Button className="!capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Add Product Weight
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    onClick={() =>{
                      context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false)
                        setSubMenuIndex(null)}
                    }
                    to="/product/addSize"
                  >
                    <Button className="!capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Add Product Size
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Link
              onClick={() =>{
                context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                  setSubMenuIndex(null)}
              }
              to="/users"
            >
              <Button className="w-full !py-2 hover:!bg-[#c8c7c7]   items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize">
                <FiUsers className="text-[20px]" />
                <span> Users</span>
              </Button>
            </Link>
          </li>

          <li>
            <Link
              onClick={() =>{
                context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                  setSubMenuIndex(null)}
              }
              to="/orders"
            >
              <Button className="w-full hover:!bg-[#c8c7c7]  !py-2  items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize">
                <FaBagShopping className="text-[20px]" />
                <span> Orders</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              onClick={() => isOpenSubMenu(5)}
              className="w-full !py-2 hover:!bg-[#c8c7c7]   items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize"
            >
              <RiProductHuntFill className="text-[20px]" />
              <span> Banners</span>
              <span className="ml-auto h-[30px]  w-[30px] flex items-center justify-center ">
                {" "}
                <FaAngleDown
                  className={`text-[17px] transition-all ${
                    subMenuIndex === 5 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={subMenuIndex === 5 ? true : false}>
              {" "}
              <ul className="w-full ">
                <li className="w-full">
                  <Link
                    onClick={() =>{
                      context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false)
                        setSubMenuIndex(null)}
                    }
                    to="/bannerV1/List"
                  >
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px]  rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Banner V1 List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add BannerV1",
                      });
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                          setSubMenuIndex(null)
                    }}
                    className="!capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Banner V1
                  </Button>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Home Banner List2",
                      });
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                          setSubMenuIndex(null)
                    }}
                    className="!capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Home BannerList 2
                  </Button>
                </li>
                <li className="w-full">
                  <Link
                    onClick={() =>{
                      context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false)
                        setSubMenuIndex(null)}
                    }
                    to="/bannerList2/List"
                  >
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px]  rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Banner V2 List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Cat Banner",
                      });
                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                          setSubMenuIndex(null)
                    }}
                    className="!capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Cat BannerList 
                  </Button>
                </li>
                <li className="w-full">
                  <Link
                    onClick={() =>{
                      context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false)
                        setSubMenuIndex(null)}
                    }
                    to="/catBanner/List"
                  >
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px]  rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                    Cat  Banner  List
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              onClick={() => isOpenSubMenu(6)}
              className="w-full !py-2 hover:!bg-[#c8c7c7]   items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize"
            >
              <RiProductHuntFill className="text-[20px]" />
              <span> Blogs</span>
              <span className="ml-auto h-[30px]  w-[30px] flex items-center justify-center ">
                {" "}
                <FaAngleDown
                  className={`text-[17px] transition-all ${
                    subMenuIndex === 6 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={subMenuIndex === 6 ? true : false}>
              {" "}
              <ul className="w-full ">
                <li className="w-full">
                  <Link
                    onClick={() =>{
                      context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false)
                        setSubMenuIndex(null)}
                    }
                    to="/blog/List"
                  >
                    <Button className=" !capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]">
                      <span className="block w-[8px] h-[8px]  rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Blog List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Blog",
                      });

                      context?.windowWidth < 992 &&
                        context?.setIsSidebarOpen(false);
                          setSubMenuIndex(null)
                    }}
                    className="!capitalize !text-[15px] flex gap-3 !font-[500] !pl-9 !w-full !justify-start !text-[rgba(0,0,0,0.7)]"
                  >
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Blog
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              onClick={logout}
              className="w-full  hover:!bg-[#c8c7c7]  !py-2  items-center flex gap-3 !font-[600] !text-[14px] !text-[rgba(0,0,0,0.8)] !justify-start !capitalize"
            >
              <IoIosLogOut className="text-[20px]" />
              <span> Logout</span>
            </Button>
          </li>
        </ul>
      </div>

      <div
        onClick={() => {context?.setIsSidebarOpen(false)
            setSubMenuIndex(null)
        }}
        className="sidebarOverlay pointer-events-auto sm:pointer-events-none block lg:hidden fixed w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[51]"
      ></div>
    </>
  );
};

export default Sidebar;
