// import React, { useState } from "react";
// import AccountSideBar from "../../components/AccountSideBar";
// import Button from "@mui/material/Button";
// import { FaAngleDown } from "react-icons/fa6";
// import Badge from "../../components/Badge";
// import { FaAngleUp } from "react-icons/fa6";
// import { useEffect } from "react";
// import { fetchDataFromApi } from "../../utils/api";

// const OrdersStatus = () => {
//   const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
//   const isShowOrderedProduct = (index) => {
//     if (isOpenOrderedProduct === index) {
//       setIsOpenOrderedProduct(null);
//     } else {
//       setIsOpenOrderedProduct(index);
//     }
//   };
//   const [orders, setOrders] = useState([]);
//   useEffect(() => {
//     fetchDataFromApi("/api/order/order-list").then((res) => {
//       // console.log("res orders",res);

//       if (res?.error === false) {
//         setOrders(res?.data);
//       }
//     });
//   }, []);
//   return (
//     <>
//       <section className="py-5 lg:py-10 w-full ">
//         <div className="container-fluid !ml-4  flex-col lg:flex-row flex gap-5">
//           <div className="col1 hidden lg:block  w-[20%]">
//             <AccountSideBar />
//           </div>

//           <div className="col2 w-full lg:w-[80%]">
//             <div className="shadow-md rounded-md  bg-white">
//               <div className="py-2 px-3 border-b border-[rgba(0,0,0,0,1)]">
//                 <h2>My Orders</h2>
//                 <p className="mt-0">
//                   There are{" "}
//                   <span className="font-bold !text-primary">
//                     {orders?.length}
//                   </span>{" "}
//                   orders
//                 </p>

//                 <div class="relative overflow-x-auto mt-4  shadow-md sm:rounded-lg">
//                   <table class="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                     <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                       <tr>
//                         <th scope="col" class="px-6 py-3">
//                           &nbsp;
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Order Id
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Payment Id
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Products
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Name
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Phone Number
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Address
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Pincode
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Total Amount
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Email
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           User Id
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Order Status
//                         </th>
//                         <th scope="col" class="px-6 whitespace-nowrap py-3">
//                           Date
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                           <span class="sr-only">Edit</span>
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders?.length !== 0 &&
//                         orders?.map((order, index) => {
//                           return (
//                             <>
//                               <tr class="bg-white border-b  dark:bg-gray-800 dark:border-gray-300 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//                                 <td className="px-6 font-500 py-4">
//                                   <Button
//                                     onClick={() => isShowOrderedProduct(index)}
//                                     className="!w-[40px] !h-[40px] !min-w-[35px] !rounded-full"
//                                   >
//                                     {isOpenOrderedProduct === index ? (
//                                       <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
//                                     ) : (
//                                       <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
//                                     )}
//                                   </Button>
//                                 </td>

//                                 <td className="px-6 py-4 font-[500]">
//                                   <span className="!text-primary">
//                                     {order?._id}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 font-[500] py-4">
//                                   <span className="!text-primary">
//                                     {order?.paymentId
//                                       ? order?.paymentId
//                                       : "CASH ON DELIVERY"}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 font-[500] py-4">
//                                   <span className="">
//                                     {order?.userId?.name}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 font-[500] py-4">
//                                   <span className="!text-primary whitespace-nowrap">
//                                     {order?.userId?.name}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 font-[500] py-4">
//                                   <span className="whitespace-nowrap">
//                                     +
//                                     {order?.delivery_address?.mobile ||
//                                       order?.userId?.mobile ||
//                                       "Not provided"}
//                                   </span>
//                                 </td>
//                                 <td className="px-6  font-[500] py-4">
//                                   {" "}
//                                   <span className="w-[300px] block">
//                                     {order?.delivery_address?.address_line1 +
//                                       " " +
//                                       order?.delivery_address?.city +
//                                       " " +
//                                       order?.delivery_address?.landmark +
//                                       " " +
//                                       order?.delivery_address?.state +
//                                       " " +
//                                       order?.delivery_address?.country}
//                                   </span>
//                                 </td>
//                                 <td className="px-6  font-[500] py-4">
//                                   {" "}
//                                   <span className="">
//                                     {order?.delivery_address?.pincode}
//                                   </span>
//                                 </td>
//                                 <td className="px-6  font-[500] py-4">
//                                   {" "}
//                                   <span className="">{order?.totalAmt}</span>
//                                 </td>
//                                 <td className="px-6  font-[500] py-4">
//                                   {" "}
//                                   {order?.userId?.email}
//                                 </td>
//                                 <td className="px-6  font-[500] py-4">
//                                   {" "}
//                                   <span className="!text-primary">
//                                     {order?.userId?._id}
//                                   </span>
//                                 </td>
//                                 <td className="px-6  font-[500] py-4">
//                                   {" "}
//                                   <span className="">
//                                     <Badge status={order?.order_status} />
//                                   </span>
//                                 </td>
//                                 <td className="px-6  font-[500] py-4">
//                                   {" "}
//                                   <span className=" whitespace-nowrap ">
//                                     {order?.createdAt?.split("T")[0]}
//                                   </span>
//                                 </td>
//                               </tr>
//                               {isOpenOrderedProduct === index && (
//                                 <tr>
//                                   <td className=" pl-24" colSpan={8}>
//                                     <div class="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
//                                       <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                                         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                                           <tr>
//                                             <th
//                                               scope="col"
//                                               class="px-6 whitespace-nowrap py-3"
//                                             >
//                                               Product Id
//                                             </th>
//                                             <th
//                                               scope="col"
//                                               class="px-6 whitespace-nowrap py-3"
//                                             >
//                                               Product Title
//                                             </th>
//                                             <th
//                                               scope="col"
//                                               class="px-6 whitespace-nowrap py-3"
//                                             >
//                                               Image
//                                             </th>
//                                             <th
//                                               scope="col"
//                                               class="px-6 whitespace-nowrap py-3"
//                                             >
//                                               Quantity
//                                             </th>
//                                             <th
//                                               scope="col"
//                                               class="px-6 whitespace-nowrap py-3"
//                                             >
//                                               Price
//                                             </th>
//                                             <th
//                                               scope="col"
//                                               class="px-6 whitespace-nowrap py-3"
//                                             >
//                                               Sub Total
//                                             </th>
//                                           </tr>
//                                         </thead>
//                                         <tbody>
//                                           {order?.products?.map(
//                                             (item, index) => {
//                                               return (
//                                                 <>
//                                                   <tr class="bg-white border-b   dark:bg-gray-800 dark:border-gray-300 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//                                                     <td className="px-6  font-[500] py-1">
//                                                       <span className="text-gray-600">
//                                                         {item?._id}
//                                                       </span>
//                                                     </td>
//                                                     <td className="px-6  font-[500] py-2">
//                                                       <span className="!text-primary">
//                                                         <div className="w-[150px]">
//                                                           {" "}
//                                                           {item?.productTitle}
//                                                         </div>
//                                                       </span>
//                                                     </td>
//                                                     <td className="px-6  font-[500] py-2">
//                                                       <img
//                                                         className="w-[60px] h-[60px] rounded-md object-cover"
//                                                         src={item?.image}
//                                                         alt=""
//                                                       />
//                                                     </td>
//                                                     <td className="px-6  font-[500] py-2">
//                                                       <span className="!text-primary whitespace-nowrap">
//                                                         {item?.quantity}
//                                                       </span>
//                                                     </td>
//                                                     <td className="px-6  font-[500] py-2">
//                                                       <span className="">
//                                                         {" "}
//                                                         {(item?.price).toLocaleString(
//                                                           "en-US",
//                                                           {
//                                                             style: "currency",
//                                                             currency: "INR",
//                                                           }
//                                                         )}
//                                                       </span>
//                                                     </td>
//                                                     <td className="px-6  font-[500] py-2">
//                                                       {(item?.subTotal).toLocaleString(
//                                                         "en-US",
//                                                         {
//                                                           style: "currency",
//                                                           currency: "INR",
//                                                         }
//                                                       )}
//                                                     </td>
//                                                   </tr>
//                                                 </>
//                                               );
//                                             }
//                                           )}
//                                         </tbody>
//                                       </table>
//                                     </div>
//                                   </td>
//                                 </tr>
//                               )}
//                             </>
//                           );
//                         })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default OrdersStatus;
import React, { useState, useEffect } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { fetchDataFromApi } from "../../utils/api";

const OrdersStatus = () => {
  const [openOrderIndex, setOpenOrderIndex] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false && res?.data) {
        setOrders(res.data);
      }
    });
  }, []);

  const toggleProducts = (index) => {
    setOpenOrderIndex(openOrderIndex === index ? null : index);
  };

  // Helper: Format Indian mobile number
  const formatMobile = (mobile) => {
    if (!mobile) return "—";
    let num = mobile.toString().replace(/\D/g, "");
    if (num.startsWith("91") && num.length === 12) num = num.slice(2);
    if (num.length === 10) return `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
    return `+${num}`;
  };

  // Helper: Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (orders.length === 0) {
    return (
      <section className="py-10 lg:py-16">
        <div className="container-fluid !ml-4 flex gap-6">
          <div className="hidden lg:block w-[20%]">
            <AccountSideBar />
          </div>
          <div className="w-full lg:w-[80%]">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">My Orders</h2>
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-16">
      <div className="container-fluid !ml-4 flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-[20%]">
          <AccountSideBar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-[80%]">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
              <p className="text-gray-600 mt-1">
                {orders.length} order{orders.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="divide-y">
              {orders.map((order, index) => (
                <div key={order._id} className="p-6 hover:bg-gray-50 transition">
                  {/* Order Header */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-semibold !text-primary">#{order._id.slice(-8)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(order.createdAt)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-bold text-lg">
                        ₹{order.totalAmt.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <Badge status={order.order_status} />
                      </div>

                      <button
                        onClick={() => toggleProducts(index)}
                        className="ml-4 p-2 rounded-full hover:bg-gray-200 transition"
                      >
                        {openOrderIndex === index ? (
                          <FaAngleUp className="text-xl" />
                        ) : (
                          <FaAngleDown className="text-xl" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Products */}
                  {openOrderIndex === index && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold mb-4">Ordered Products</h4>
                      <div className="space-y-4">
                        {order.products.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.productTitle}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800">
                                {item.productTitle}
                              </h5>
                              <p className="text-sm text-gray-600">
                                Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ₹{item.subTotal.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address */}
                      <div className="mt-6 p-4 text-[15px] border-2 !border-primary bg-[#f1f1f1] rounded-lg">
                        <p className="!text-primary !text-[20px] underline font-bold mb-2">Delivery Address</p>
                        <p className="!text-primary !text-[15px] font-bold">
                          {order.delivery_address?.address_line1},{" "}
                          {order.delivery_address?.landmark && `${order.delivery_address.landmark}, `}
                          {order.delivery_address?.city}, {order.delivery_address?.state} -{" "}
                          {order.delivery_address?.pincode}
                        </p>
                        <p className="!text-primary !text-[15px] font-bold mt-1">
                          Phone: {formatMobile(order.delivery_address?.mobile)}
                        </p>
                      </div>

                      {/* Payment Info */}
                      <div className="mt-4 text-md text-black">
                        Payment:{" "}
                        <span className="font-medium text-white p-2 text-[15px] !bg-primary rounded-md">
                          {order.paymentId
                            ? `Online Paid (${order.paymentId})`
                            : "Cash on Delivery"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersStatus;