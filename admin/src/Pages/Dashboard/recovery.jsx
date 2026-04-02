import React, { useState, PureComponent, useContext, useEffect } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import SearchBox from "../../Components/SearchBox";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../Components/Badge";
import { FaAngleUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import Paper from "@mui/material/Paper";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { PiExportBold } from "react-icons/pi";

import Pagination from "@mui/material/Pagination";

import InputLabel from "@mui/material/InputLabel";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  //1.10
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUBCATEGORY", minWidth: 150 },

  { id: "price", label: "PRICE", minWidth: 100 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 100 },
  { id: "actions", label: "ACTIONS", minWidth: 120 },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const Dashboard = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };
  const [pageOrder, setPageOrder] = useState(1);
const [orderLimit, setOrderLimit] = useState(5);
const [orderTotalPages, setOrderTotalPages] = useState(1);

  const [orders, setOrders] = useState([]);
 
  const context = useContext(MyContext);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);
   useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=3`).then(
      (res) => {
        // console.log("res orders",res);

        if (res?.error === false) {
          setOrders(res?.data);
        }
      }
    );
  }, [pageOrder]);
  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
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
          setProductData(productArr);
          setIsLoading(false);
        }, 1000);
        //  console.log(productArr);
      }
    });
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
  const [chart1Data, setChart1Data] = useState([
    { name: "Jan", totalSales: 4000, totalUsers: 2400, amt: 2400 },
    { name: "Feb", totalSales: 3000, totalUsers: 1398, amt: 2210 },
    { name: "Mar", totalSales: 2000, totalUsers: 9800, amt: 2290 },
    { name: "Apr", totalSales: 2780, totalUsers: 3908, amt: 2000 },
    { name: "May", totalSales: 1890, totalUsers: 4800, amt: 2181 },
    { name: "Jun", totalSales: 2390, totalUsers: 3800, amt: 2500 },
    { name: "Jul", totalSales: 3490, totalUsers: 4300, amt: 2100 },
    { name: "Aug", totalSales: 3100, totalUsers: 3700, amt: 2000 },
    { name: "Sep", totalSales: 2900, totalUsers: 3500, amt: 2300 },
    { name: "Oct", totalSales: 3200, totalUsers: 4000, amt: 2600 },
    { name: "Nov", totalSales: 2800, totalUsers: 3600, amt: 2200 },
    { name: "Dec", totalSales: 3400, totalUsers: 4100, amt: 2400 },
  ]);

  return (
    <>
      <div className="w-full py-2 px-5 bg-[#f1faff] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center justify-between gap-8 mb-5">
        <div className="info flex flex-col">
          {/* Row for greeting + hand icon */}
          <div className="flex items-center gap-3">
            <h3 className="text-[35px] font-bold mb-3  leading-10">
              Good Morning, <br /> jas
            </h3>
            <img
              src="/waving-hand.png"
              className="h-[40px] w-[40px]"
              alt="wave"
            />
          </div>

          {/* Subtext below */}
          <h6 className="text-gray-600 mt-2">
            Here's what's happening at your store today. See statistics at once.
          </h6>
          <br />
          <Button
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
            className="btn-blue !capitalize !w-auto !self-start flex items-center gap-2"
          >
            <FaPlus />
            Add Product
          </Button>
        </div>
        <img src="/ecomm.jpg" className="w-[250px]" alt="" />
      </div>

      <DashboardBoxes />
      {/* <div className="card my-4 bg-white shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between px-5  py-5">
          {" "}
          <h3 className="text-[20px] font-[600]">
            Products <span className="font-[400] text-[12px]"></span> (Simple
            Tailwind)
          </h3>
        </div>

        <div className="flex items-center px-5  pl-5 pr-5 justify-between w-full ">
          <div className="col w-[20%]">
            <h4 className="font-[600] mb-2 text-[13px]">Category By</h4>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={categoryFilterVal}
              label="Category"
              className="w-full"
              size="small"
              onChange={handleChangeCatFilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Girls</MenuItem>
            </Select>
          </div>

          <div className="col w-[30%] flex items-center gap-3 ml-auto">
            <Button className="!flex !items-center  !gap-2 !text-white btn-purple normal-case">
              <PiExportBold size={20} />
              <span>Export</span>
            </Button>

            <Button onClick={()=>context.setIsOpenFullScreenPanel({
                      open:true,
                      model:"Add Product"
                    })} className="!text-white !flex btn-purple !items-center !gap-2  normal-case">
              <FaPlus size={16} /> Add product
            </Button>
          </div>
        </div>
        <div class="relative overflow-x-auto mt-5 pb-2  shadow-md sm:rounded-lg">
          <table class="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" width="10%" className="px-6 pr-2 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} />
                  </div>
                </th>
                <th scope="col" className="px-0 whitespace-nowrap py-3">
                  Product
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Category
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Sub Category
                </th>

                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Price
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  SALES
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-700 border-b dark:border-gray-300 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox size="small" {...label} />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[350px]">
                    <div className="img w-[65px] h-[65px] rounded-md group overflow-hidden">
                      <Link to="/product/768585">
                        <img
                          className="w-full group-hover:scale-110 trnasition-all"
                          src="https://serviceapi.spicezgold.com/download/1742462287664_siril-poly-silk-white-beige-color-saree-with-blouse-piece-product-images-rv2vcdkuly-0-202304220523.webp"
                                         alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[13px] leading-4 hover:!text-primary ">
                        <Link to="/product/768585">
                          Vneed women Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Odit, et.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Books</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">Girls</td>

                <td className="px-6 py-2">
                  <div className="flex flex-col items-center cursor-default text-[14px] font-[500] gap-1">
                    <span className="oldPrice line-through text-gray-500">
                      $98.00
                    </span>
                    <span className="price !text-primary font-[700]">
                      $70.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[140px] ">
                    <span className="font-[600]">234 </span>sales
                  </p>
                  <Progress type="warning" value={40} />
                </td>
                <td className="px-6 py-2">
                  <div className="flex  items-center gap-1">
                    <Button className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
                      <AiOutlineEdit size={25} color="rgba(0,0,0,0.7)" />
                    </Button>
                    <Button className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
                      <IoEye size={25} color="rgba(0,0,0,0.7)" />
                    </Button>
                    <Button className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
                      <GoTrash size={25} color="rgba(0,0,0,0.7)" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-700 border-b dark:border-gray-300 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox size="small" {...label} />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[350px]">
                    <div className="img w-[65px] h-[65px] rounded-md group overflow-hidden">
                      <Link to="/product/768585">
                        <img
                          className="w-full group-hover:scale-110 trnasition-all"
                           src="https://serviceapi.spicezgold.com/download/1742462287664_siril-poly-silk-white-beige-color-saree-with-blouse-piece-product-images-rv2vcdkuly-0-202304220523.webp"
                                       alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[13px] leading-4 hover:!text-primary ">
                        <Link to="/product/768585">
                          Vneed women Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Odit, et.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Books</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">Girls</td>

                <td className="px-6 py-2">
                  <div className="flex flex-col items-center cursor-default text-[14px] font-[500] gap-1">
                    <span className="oldPrice line-through text-gray-500">
                      $98.00
                    </span>
                    <span className="price !text-primary font-[700]">
                      $70.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[140px] ">
                    <span className="font-[600]">234 </span>sales
                  </p>
                  <Progress type="warning" value={40} />
                </td>
                <td className="px-6 py-2">
                  <div className="flex  items-center gap-1">
                    <Button className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
                      <AiOutlineEdit size={25} color="rgba(0,0,0,0.7)" />
                    </Button>
                    <Button className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
                      <IoEye size={25} color="rgba(0,0,0,0.7)" />
                    </Button>
                    <Button className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
                      <GoTrash size={25} color="rgba(0,0,0,0.7)" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center px-4 pt-4 pb-2 items-center">
          {" "}
          <Pagination count={10} color="primary" />
        </div>
      </div> */}
      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
        <div className="flex items-center px-5  pl-5 pr-5 gap-4 justify-between w-full ">
          <div className="col w-[18%]">
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
          <div className="col w-[18%]">
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
          <div className="col w-[18%]">
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
          <div className="col ml-auto w-[20%]">
            <SearchBox />
          </div>
        </div>
        <br />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
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
                  ?.reverse()
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
                            <span className="font-[600]">{product?.sale} </span>
                            sales
                          </p>
                          <Progress type="success" value={40} />
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px] w-[140px] ">
                            <Rating
                              name="half-rating"
                              size="small"
                              defaultValue={product?.rating}
                            />
                          </p>
                          <Progress type="success" value={40} />
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
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div className="card my-4 bg-white shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between px-5  py-5">
          {" "}
          <h3 className="text-[20px] font-[600]">Recent Orders</h3>
        </div>
        <div class="relative overflow-x-auto mt-4  shadow-md sm:rounded-lg">
          <table class="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Order Id
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Payment Id
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Products
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Name
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Phone Number
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Address
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Pincode
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Total Amount
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Email
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  User Id
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Order Status
                </th>
                <th scope="col" class="px-6 whitespace-nowrap py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.length !== 0 &&
                orders?.map((order, index) => {
                  return (
                    <>
                      <tr class="bg-white border-b  dark:bg-gray-800 dark:border-gray-300 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 font-500 py-4">
                          <Button
                            onClick={() => isShowOrderedProduct(index)}
                            className="!w-[40px] !h-[40px] !min-w-[35px] !rounded-full"
                          >
                            {isOpenOrderedProduct === index ? (
                              <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            ) : (
                              <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            )}
                          </Button>
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          <span className="!text-primary">{order?._id}</span>
                        </td>
                        <td className="px-6 font-[500] py-4">
                          <span className="!text-primary">
                            {order?.paymentId
                              ? order?.paymentId
                              : "CASH ON DELIVERY"}
                          </span>
                        </td>
                        <td className="px-6 font-[500] py-4">
                          <span className="">{order?.userId?.name}</span>
                        </td>
                        <td className="px-6 font-[500] py-4">
                          <span className="!text-primary whitespace-nowrap">
                            {order?.userId?.name}
                          </span>
                        </td>
                        <td className="px-6 font-[500] py-4">
                          <span className="">+{order?.userId?.mobile}</span>
                        </td>
                        <td className="px-6  font-[500] py-4">
                          {" "}
                          <span className="w-[300px] block">
                            {order?.delivery_address?.address_line1 +
                              " " +
                              order?.delivery_address?.city +
                              " " +
                              order?.delivery_address?.landmark +
                              " " +
                              order?.delivery_address?.state +
                              " " +
                              order?.delivery_address?.country +
                              " " +
                              order?.delivery_address?.mobile}
                          </span>
                        </td>
                        <td className="px-6  font-[500] py-4">
                          {" "}
                          <span className="">
                            {order?.delivery_address?.pincode}
                          </span>
                        </td>
                        <td className="px-6  font-[500] py-4">
                          {" "}
                          <span className="">
                            {" "}
                            {order?.totalAmt.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </td>
                        <td className="px-6  font-[500] py-4">
                          {" "}
                          {order?.userId?.email}
                        </td>
                        <td className="px-6  font-[500] py-4">
                          {" "}
                          <span className="!text-primary">
                            {order?.userId?._id}
                          </span>
                        </td>
                        <td className="px-6  font-[500] py-4">
                          {" "}
                          <span className="">
                            <Badge status={order?.order_status} />
                          </span>
                        </td>
                        <td className="px-6  font-[500] py-4">
                          {" "}
                          <span className=" whitespace-nowrap ">
                            {order?.createdAt?.split("T")[0]}
                          </span>
                        </td>
                      </tr>
                      {isOpenOrderedProduct === index && (
                        <tr>
                          <td className=" pl-24" colSpan={8}>
                            <div class="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
                              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                    <th
                                      scope="col"
                                      class="px-6 whitespace-nowrap py-3"
                                    >
                                      Product Id
                                    </th>
                                    <th
                                      scope="col"
                                      class="px-6 whitespace-nowrap py-3"
                                    >
                                      Product Title
                                    </th>
                                    <th
                                      scope="col"
                                      class="px-6 whitespace-nowrap py-3"
                                    >
                                      Image
                                    </th>
                                    <th
                                      scope="col"
                                      class="px-6 whitespace-nowrap py-3"
                                    >
                                      Quantity
                                    </th>
                                    <th
                                      scope="col"
                                      class="px-6 whitespace-nowrap py-3"
                                    >
                                      Price
                                    </th>
                                    <th
                                      scope="col"
                                      class="px-6 whitespace-nowrap py-3"
                                    >
                                      Sub Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order?.products?.map((item, index) => {
                                    return (
                                      <>
                                        <tr class="bg-white border-b   dark:bg-gray-800 dark:border-gray-300 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                          <td className="px-6  font-[500] py-1">
                                            <span className="text-gray-600">
                                              {item?._id}
                                            </span>
                                          </td>
                                          <td className="px-6  font-[500] py-2">
                                            <span className="!text-primary">
                                              <div className="w-[150px]">
                                                {" "}
                                                {item?.productTitle}
                                              </div>
                                            </span>
                                          </td>
                                          <td className="px-6  font-[500] py-2">
                                            <img
                                              className="w-[60px] h-[60px] rounded-md object-cover"
                                              src={item?.image}
                                              alt=""
                                            />
                                          </td>
                                          <td className="px-6  font-[500] py-2">
                                            <span className="!text-primary whitespace-nowrap">
                                              {item?.quantity}
                                            </span>
                                          </td>
                                          <td className="px-6  font-[500] py-2">
                                            <span className="">
                                              {" "}
                                              {(item?.price).toLocaleString(
                                                "en-US",
                                                {
                                                  style: "currency",
                                                  currency: "INR",
                                                }
                                              )}
                                            </span>
                                          </td>
                                          <td className="px-6  font-[500] py-2">
                                            {(item?.subTotal).toLocaleString(
                                              "en-US",
                                              {
                                                style: "currency",
                                                currency: "INR",
                                              }
                                            )}
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card my-4 bg-white shadow-md sm:rounded-lg p-5">
        <div className="flex items-center justify-between px-5  py-5 pb-0">
          {" "}
          <h3 className="text-[20px] font-[600]">Total users & Total Sales</h3>
        </div>
        <div className="flex items-center gap-5 px-5 pt-1  py-5">
          {" "}
          <span className="flex items-center gap-1 text-[15px]">
            {" "}
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600 "></span>
            Total Users
          </span>
          <span className="flex items-center gap-1 text-[15px]">
            {" "}
            <span className="block w-[8px] h-[8px] rounded-full !bg-primary "></span>
            Total Sales
          </span>
        </div>
        <div style={{ width: "100%", height: 500 }}>
          <ResponsiveContainer>
            <LineChart
              data={chart1Data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="none" strokeDasharray="3 3" />
              <XAxis tick={{ fontSize: 15 }} dataKey="name" />
              <YAxis tick={{ fontSize: 15 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#8884d8"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="totalUsers"
                stroke="#82ca9d"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chart1Data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis tick={{ fontSize: 15 }} dataKey="name" />
              <YAxis tick={{ fontSize: 15 }} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#8884d8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
              <Area
                type="monotone"
                dataKey="totalUsers"
                stroke="#82ca9d"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
