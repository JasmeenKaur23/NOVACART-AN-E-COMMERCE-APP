import React, { useContext, useState } from "react";

import { MyContext } from "../../App.jsx";
import Badge from "../../Components/Badge";
import Button from "@mui/material/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import SearchBox from "../../Components/SearchBox";
import { useEffect } from "react";
import { editData, fetchDataFromApi } from "../../utils/api";
import MenuItem from "@mui/material/MenuItem";

import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

const Orders = () => {
  const context = useContext(MyContext);
  const [pageOrder, setPageOrder] = useState(1);
  const [orders, setOrders] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [orderLimit, setOrderLimit] = useState(5);
  const [orderTotalPages, setOrderTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
const [isLoading,setIsLoading]=useState(false)
  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  // const [orders, setOrders] = useState([]);
  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };
  const [orderStatus, setOrderStatus] = useState("");

  // const handleChange = (event, id) => {
  //   setOrderStatus(event.target.value);
  //   const obj = {
  //     id: id,
  //     order_status: event.target.value,
  //   };
  //   editData(`/api/order/order-status/${id}`, obj).then((res) => {
  //     if (res?.data?.error === false) {
  //       console.log("hellllllllllllllo");

  //       context?.openAlertBox("success", res?.data?.message);
  //     }
  //   });
  // };
  const handleChange = async (e, id) => {
  const status = e.target.value.toLowerCase();  // backend expects lowercase

  // Update in orders
  setOrders((prev) =>
    prev?.map((o) =>
      o._id === id ? { ...o, order_status: status } : o
    )
  );

  // Update in ordersData (this is what UI shows!)
  setOrdersData((prev) =>
    prev?.map((o) =>
      o._id === id ? { ...o, order_status: status } : o
    )
  );

  // API call
  const obj = { id, order_status: status };
  const res = await editData(`/api/order/order-status/${id}`, obj);

  if (res?.data?.success) {
    context.openAlertBox("success", res.data.message);
  } else {
    context.openAlertBox("error", "Failed to update");
  }
};


  useEffect(() => {
  fetchDataFromApi("/api/order/order-list").then((res) => {
    setIsLoading(true)
    if (res?.error === false) {
      setOrders(res?.data); 
       setTimeout(()=>
      {
        setIsLoading(false)
      },1000)     // ✔ Always an array
    }
  });
}, [orderStatus]);
useEffect(() => {
  // paginated list
  setIsLoading(true)
  fetchDataFromApi(
    `/api/order/order-list?page=${pageOrder}&limit=${orderLimit}`
  ).then((res) => {
    if (res?.error === false) {
      setOrders(res?.data);        // ✔ FIXED
      setOrdersData(res?.data);    // ✔ FIXED
      setOrderTotalPages(res?.totalPages || 1);
      setTimeout(()=>
      {
        setIsLoading(false)
      },1000)
    }
  });

  // total list for searching
  fetchDataFromApi(`/api/order/order-list`).then((res) => {
    if (res?.error === false) {
     setTotalOrdersData(res?.data || []);
   // ✔ total response allowed
    }
  });
}, [pageOrder, orderLimit]);


//  useEffect(() => {
//   if (searchQuery !== "") {
//     const filteredOrders = totalOrdersData?.data?.filter((order) =>
//       order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order?.createdAt?.includes(searchQuery)
//     );

//     setOrdersData(filteredOrders);
//   } else {
//     fetchDataFromApi(
//       `/api/order/order-list?page=${pageOrder}&limit=5`
//     ).then((res) => {
//       if (res?.error === false) {
//         setOrders(res?.data);        // ✔ FIXED
//         setOrdersData(res?.data);    // ✔ FIXED
//       }
//     });
//   }
// }, [searchQuery]);
useEffect(() => {
  if (searchQuery.trim() !== "") {

    const filteredOrders = totalOrdersData.filter((order) =>
      order._id?.includes(searchQuery) ||
      order.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.createdAt?.includes(searchQuery)
    );

    setOrdersData(filteredOrders);
    setPageOrder(1);   // reset to first page

  } else {
setIsLoading(true)
    fetchDataFromApi(
      `/api/order/order-list?page=${pageOrder}&limit=${orderLimit}`
    ).then((res) => {
      
      if (res?.error === false) {
        setOrders(res?.data);
        setOrdersData(res?.data);
        setTimeout(()=>
        {
          setIsLoading(false)
        },1000)
      }
    });

  }
}, [searchQuery]);


  return (
    <>
    {
      isLoading === true ?  <div className="flex items-center w-full !text-primary min-h-[400px] justify-center">
                <CircularProgress color="inherit" />
              </div> :   <div className="card my-2 md:mt-4 bg-white shadow-md sm:rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-col sm:flex-row  px-2  py-5">
          {" "}
          <h3 className="text-[20px] font-[600] w-[75%] text-left md:text-left">
            Recent Orders
          </h3>
          <div className="ml-auto w-full">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageOrder={setPageOrder}
            />
          </div>
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
              {ordersData?.length !== 0 &&
                ordersData?.map((order, index) => {
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
                          <span className="">  +{order?.delivery_address?.mobile ||
                                      order?.userId?.mobile ||
                                      "Not provided"}</span>
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
                         <Select
  value={order?.order_status?.charAt(0).toUpperCase() + order?.order_status?.slice(1).toLowerCase()}
  onChange={(e) => handleChange(e, order._id)}
  displayEmpty
  size="small"
  className="w-full"
  inputProps={{ "aria-label": "Without label" }}
>
  <MenuItem value="Pending">Pending</MenuItem>
  <MenuItem value="Confirmed">Confirmed</MenuItem>
  <MenuItem value="Delivered">Delivered</MenuItem>
</Select>

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
        <div className="flex justify-center px-4 pt-4 pb-2 items-center">
          <Pagination
            count={orderTotalPages}
            color="primary"
            page={pageOrder}
            onChange={(event, newPage) => setPageOrder(newPage)}
          />
        </div>
      </div>
    }
   
    </>
  );
};

export default Orders;
