import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import Progress from "../../Components/ProgressBar";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";

import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
// import { fetchDataFromApi } from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  //1.10
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUBCATEGORY", minWidth: 150 },

  { id: "price", label: "PRICE", minWidth: 100 },
  // { id: "sales", label: "SALES", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 100 },
  { id: "actions", label: "ACTIONS", minWidth: 120 },
];

const Products = () => {
  const context = useContext(MyContext);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productData, setProductData] = useState([]);
  const [productTotalData, setProductTotalData] = useState([]);
  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);
  // useEffect(() => {
  //   if (searchQuery !== "") {
  //     const filteredProductData = productTotalData?.filter(
  //       (product) =>
  //         product._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         product?.catName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         product?.subCat.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setProductData(filteredProductData);
  //   } else {
  //     fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
  //       if (res?.error === false) {
  //         setOrders(res);
  //         setOrdersData(res?.data);
  //       }
  //     });
  //   }
  // }, [searchQuery]);

  useEffect(() => {
    if (searchQuery !== "") {
      const filtered = productTotalData.filter(
        (product) =>
          product._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.catName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subCat?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setProductData(filtered);
    } else {
      setProductData(productTotalData); // restore original list
    }
  }, [searchQuery, productTotalData]);

  const handleChangeProductCat = (event) => {
    const value = event.target.value;
    setProductCat(value);
    setProductSubCat("");
    setProductThirdLevelCat("");
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${value}`).then(
      (res) => {
        if (res?.error === false && res?.products?.length > 0) {
          setProductData(res?.products);

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        } else {
          setProductData([]);
          setTimeout(() => {
            setIsLoading(false);
          }, 200); // reset when empty or error
        }
      }
    );
  };

  const handleChangeSubProductCat = (event) => {
    const value = event.target.value;
    setProductSubCat(value);
    setIsLoading(true);
    setProductCat("");
    setProductThirdLevelCat("");

    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${value}`).then(
      (res) => {
        if (res?.error === false && res?.products?.length > 0) {
          setProductData(res?.products);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        } else {
          setProductData([]);
          setTimeout(() => {
            setIsLoading(false);
          }, 500); // reset when empty or error
        }
      }
    );
  };

  const handleChangeProductThirdLevelCat = (event) => {
    const value = event.target.value;
    setProductThirdLevelCat(value);
    console.log("value is ss", value);
    setProductCat("");
    setProductSubCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByThirdLevelCatId/${value}`
    ).then((res) => {
      if (res?.error === false && res?.products?.length > 0) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        setProductData([]);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // reset when empty or error
      }
    });
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // useEffect(()=>{
  //   fetchDataFromApi("/api/product/getAllProducts").then((res)=>
  //   {
  //     console.log(res);
  //     if(res?.error===false)
  //     {
  //       setProductData(res?.products)
  //     }

  //   })
  // },[])

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      console.log(res);
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductTotalData(productArr); // store complete data
          setProductData(productArr);
          // setProductData(productArr);
          setIsLoading(false);
        }, 1000);
        //  console.log(productArr);
      }
    });
  };
  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        getProducts();
        console.log(res);

        context?.openAlertBox("success", res?.message);
      } else {
        context?.openAlertBox("error", res?.message);
      }
    });
  };
  const deleteMultipleProduct = (id) => {
    if (sortedIds.length === 0) {
      context?.openAlertBox("error", "Please select items to delete");
      return;
    }
    try {
      deleteMultipleData(`/api/product/deleteMultiple`, sortedIds).then(
        (res) => {
          if (res?.error === false) {
            getProducts();
            console.log(res);

            context?.openAlertBox("success", "Product Deleted");
          } else {
            context?.openAlertBox("error", "Error deleting items");
          }
        }
      );
    } catch (error) {
      context?.openAlertBox("error", "Error deleting items");
    }
  };
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item?._id).sort((a, b) => a - b);
      // console.log(ids);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item._id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );
    setProductData(updatedItems);
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
    // console.log(selectedIds);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setPage(0);
  }, [searchQuery, productCat, productSubCat, productThirdLevelCat]);

  return (
    <>
      <div className="flex items-center justify-between px-2 mt-3 py-0">
        {" "}
        <h3 className="text-[20px] font-[600]">Products</h3>
        <div className="col w-[30%] flex items-center justify-end gap-3 ml-auto">
          {sortedIds?.length !== 0 && (
            <Button
              variant="contained"
              className="btn-sm"
              size="small"
              color="error"
              onClick={deleteMultipleProduct}
            >
              Delete
            </Button>
          )}

          <Button
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
            className="!text-white !flex btn-purple !items-center  !gap-2  normal-case"
          >
            <FaPlus size={16} /> Add product
          </Button>
        </div>
      </div>
      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
        <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4  px-5   gap-4 justify-between w-full ">
          <div className="col ">
            <h4 className="font-[600] mb-2 text-[13px]">Category By</h4>
            {context?.catData.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                value={productCat}
                label="Category"
                className="w-full"
                size="small"
                onChange={handleChangeProductCat}
              >
                {context?.catData?.map((cat, index) => {
                  return (
                    <MenuItem
                      // onClick={() => selectCatByName(cat?.name)}
                      value={cat?._id}
                    >
                      {cat?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>
          <div className="col ">
            <h4 className="font-[600] mb-2 text-[13px]">Sub Category By</h4>
            {context?.catData.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                value={productSubCat}
                label="Sub Category"
                className="w-full"
                size="small"
                onChange={handleChangeSubProductCat}
              >
                {context?.catData?.map((cat, index) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat, index_) => {
                      return (
                        <MenuItem
                          // onClick={() => selectSubCatByName(subCat?.name)}
                          value={subCat?._id}
                        >
                          {subCat?.name}
                        </MenuItem>
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>
          <div className="col ">
            <h4 className="font-[600] mb-2 text-[13px]">
              Third Level Category By
            </h4>
            {context?.catData.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                value={productThirdLevelCat}
                label="Sub Category"
                className="w-full"
                size="small"
                onChange={handleChangeProductThirdLevelCat}
              >
                {context?.catData?.map((cat) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat) => {
                      return (
                        subCat?.children?.length !== 0 &&
                        subCat?.children?.map((thirdLevelCat, index__) => {
                          return (
                            <MenuItem
                              // onClick={() => {
                              //   selectSubCatByThirdLevel(
                              //     thirdLevelCat?.name
                              //   );
                              // }}
                              key={index__}
                              value={thirdLevelCat?._id}
                            >
                              {thirdLevelCat?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>
          <div className="col w-full ml-auto flex items-center">
            <div style={{ alignSelf: "end" }} className="w-full">
              <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                // setPageOrder={setPageOrder}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
  <Table sx={{ minWidth: 900 }}>

          {/* <TableContainer sx={{ width: "100%", overflowX: "auto" }}> */}

          {/* <Table stickyHeader aria-label="sticky table"> */}
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    {...label}
                    onChange={handleSelectAll}
                    checked={
                      productData?.length > 0
                        ? productData.every((item) => item.checked)
                        : false
                    }
                    size="small"
                  />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading === false ? (
                productData?.length !== 0 &&
                // productData?.length !== 0 &&
                productData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                  ?.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <Checkbox
                            onChange={(e) =>
                              handleCheckboxChange(e, product?._id, index)
                            }
                            checked={product.checked === true ? true : false}
                            {...label}
                            size="small"
                          />
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4 w-[350px]">
                            <div className="img w-[65px] h-[65px] rounded-md group overflow-hidden">
                              <Link to={`/product/${product?._id}`}>
                                <LazyLoadImage
                                  alt="sample text"
                                  className="!w-[100%] group-hover:scale-110 h-full object-cover"
                                  effect="blur"
                                  wrapperProps={{
                                    // If you need to, you can tweak the effect transition using the wrapper style.
                                    style: { transitionDelay: "1s" },
                                  }}
                                  src={product?.images[0]} // use normal <img> attributes as props
                                />
                              </Link>
                            </div>
                            <div className="info w-[75%]">
                              <h3 className="font-[600] text-[13px] leading-4 hover:!text-primary ">
                                <Link to={`/product/${product?._id}`}>
                                  {product?.name}
                                </Link>
                              </h3>
                              <span className="text-[12px]">
                                {product?.brand}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.catName}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.subCat}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex flex-col items-center cursor-default text-[14px] font-[500] gap-1">
                            <span className="oldPrice line-through text-gray-500">
                              &#x20b9; {product?.oldPrice}
                            </span>
                            <span className="price !text-primary font-[700]">
                              &#x20b9; {product?.price}
                            </span>
                          </div>
                        </TableCell>
                       
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px] w-[140px] ">
                            <Rating
                              readOnly
                              name="half-rating"
                              size="small"
                              defaultValue={product?.rating}
                            />
                          </p>
                        
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex  items-center gap-1">
                            <Button
                              onClick={() =>
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Product",
                                  id: product?._id,
                                })
                              }
                              className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]"
                            >
                              <AiOutlineEdit
                                size={25}
                                color="rgba(0,0,0,0.7)"
                              />
                            </Button>
                            <Link to={`/product/${product?._id}`}>
                              <Button className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
                                <IoEye size={25} color="rgba(0,0,0,0.7)" />
                              </Button>
                            </Link>
                            <Button
                              onClick={() => deleteProduct(product._id)}
                              className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]"
                            >
                              <GoTrash size={25} color="rgba(0,0,0,0.7)" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colspan={8}>
                    {" "}
                    <div className="flex items-center w-full  min-h-[400px] justify-center">
                      <CircularProgress color="inherit" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={productData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Products;
