import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../../components/SideBar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../../components/ProductItems";
import Button from "@mui/material/Button";
import { IoGridSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItemListView from "../../../components/ProductItemsListView";
import PaginationItem from "@mui/material/PaginationItem";
import ProductLoadingGrid from "../../../components/ProductLoading/ProductLoadingGrid";
import { postData } from "../../../utils/api";
import { myContext } from "../../../App";

const ProductListing = () => {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(myContext);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [selectedSortValue, setSelectedSortValue] = useState("Name,A to Z");
  const [productsData, setProductsData] = useState([]);
  const open = Boolean(anchorEl);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBy = (name, order, products, value) => {
    setSelectedSortValue(value);

    postData(`/api/product/sortBy`, {
      products: products,
      sortBy: name,
      order: order,
    })
      .then((res) => {
        console.log("res is post", res);
        setProductsData(res.products);
        // setProductsData(res?.data?.products || []);

        setAnchorEl(null);
      })
      .catch((err) => {
        console.error("Sort API failed", err);
      });
  };

  return (
    <>
      <section>
        <div className="py-2 pb-0   w-[100%]">
          <div
            className="container-fluid 
           !pl-8"
          >
          
            
          
          </div>
          <div className="bg-white px-2 mt-0">
            {" "}
            <div className="flex  gap-3 container-fluid ">
              <div
                className={`sideBarWrapper fixed -bottom-[100%] left-0 w-full lg:h-full lg:static lg:w-[20%] z-[102]  lg:z-[99] p-3
                   transition-all lg:!opacity-100 
                lg:p-0  bg-white  ${
                  context?.openFilter === true ? "open" : ""
                }`}
              >
                <SideBar
                  productsData={productsData}
                  isLoading={isLoading}
                  setProductsData={setProductsData}
                  setIsLoading={setIsLoading}
                  page={page}
                  setTotalPages={setTotalPages}
                />
              </div>
              
              {context?.windowWidth < 992 && (
                <div
                  onClick={() => context?.setOpenFilter(false)}
                  className={`filterOverlay fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-[101] transition-opacity duration-300
      ${context?.openFilter ? "opacity-100 visible" : "opacity-0 invisible"}`}
                ></div>
              )}

              <div className="rightContent w-full   py-3 lg:w-[80%]">
                <div className="sticky top-[145px] z-[99] bg-[#f1f1f1] mb-4 rounded-md flex items-center justify-between p-2 w-full ">
                  <div className="col1 flex items-center gap-1 itemViewActions ">
                    <Button
                      onClick={() => setItemView("list")}
                      variant="outlined"
                      className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full 
    !p-0 !flex !items-center !justify-center 
    !text-[#ff5252] !border-2 
    ${itemView === "list" ? "!border-[#ff5252]" : "!border-transparent"}`}
                    >
                      <LuMenu size={22} /> {/* keep size consistent */}
                    </Button>

                    <Button
                      onClick={() => setItemView("grid")}
                      variant="outlined"
                      className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full 
    !p-0 !flex !items-center !justify-center 
    !text-[#ff5252] !border-2 
    ${itemView === "grid" ? "!border-[#fb8080]" : "!border-transparent"}`}
                    >
                      <IoGridSharp size={22} />
                    </Button>

                    <span className="text-[14px] hidden sm:block md:block lg:block font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                      {/* There are {productsData?.length !==0 ? productsData?.length  :0 } products
                     {console.log(productsData)} */}
                      There are {productsData?.length || 0} products
                    </span>
                  </div>

                  <div className="col2 ml-auto flex items-center gap-3 pr-4  justify-end">
                    {" "}
                    <span className="text-[14px]  font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                      Sort By
                    </span>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        className="!bg-white !border-2 !border-[#000] !text-[14px] capitalize !text-[#000]"
                      >
                        {selectedSortValue}
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                          list: {
                            "aria-labelledby": "basic-button",
                          },
                        }}
                      >
                        <MenuItem onClick={handleClose}> </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleSortBy(
                              "name",
                              "asc",
                              productsData,
                              "Name,A to Z"
                            )
                          }
                          className="capitalize !text-[13px] !text-[#000]"
                        >
                          {" "}
                          Name,A to Z
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleSortBy(
                              "name",
                              "desc",
                              productsData,
                              "Name,Z to A"
                            )
                          }
                          className="capitalize !text-[13px] !text-[#000]"
                        >
                          {" "}
                          Name,Z to A
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleSortBy(
                              "price",
                              "asc",
                              productsData,
                              "Price,low to high"
                            )
                          }
                          className="capitalize !text-[13px] !text-[#000]"
                        >
                          {" "}
                          Price,low to high
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleSortBy(
                              "price",
                              "desc",
                              productsData,
                              "  Price ,high to low"
                            )
                          }
                          className="capitalize !text-[13px] !text-[#000]"
                        >
                          {" "}
                          Price ,high to low
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>

                <div
                  className={` grid ${
                    itemView === "grid"
                      ? "grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5"
                      : "grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-1"
                  }   gap-4 `}
                >
                  {itemView === "grid" ? (
                    <>
                      {isLoading ? (
                        <ProductLoadingGrid view={itemView} />
                      ) : (
                        productsData?.length !== 0 &&
                        productsData?.map((item, index) => (
                          <ProductItem key={index} item={item} />
                        ))
                      )}
                    </>
                  ) : (
                    <>
                      {isLoading ? (
                        <ProductLoadingGrid view={itemView} />
                      ) : (
                        productsData?.length !== 0 &&
                        productsData?.map((item, index) => (
                          <ProductItemListView key={index} item={item} />
                        ))
                      )}
                    </>
                  )}
                </div>
                {productsData?.length > 0 && totalPages > 1 && (
                  <div className="flex  justify-center mt-5 items-center">
                    <Pagination
                      count={totalPages}
                      variant="outlined"
                      showFirstButton
                      showLastButton
                      page={page}
                      onChange={(e, value) => setPage(value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListing;
