import React, { useState } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { FaAngleUp } from "react-icons/fa6";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      // console.log("res orders",res);

      if (res?.error === false) {
        setOrders(res?.data);
      }
    });
  }, []);
  return (
    <>
      <section className="py-5 lg:py-10 w-full ">
        <div className="container-fluid !ml-4  flex-col lg:flex-row flex gap-5">
          <div className="col1 hidden lg:block  w-[20%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-full lg:w-[80%]">
            <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0,1)]">
                <h2>My Orders</h2>
                <p className="mt-0">
                  There are{" "}
                  <span className="font-bold !text-primary">
                    {orders?.length}
                  </span>{" "}
                  orders
                </p>

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
                                  <span className="!text-primary">
                                    {order?._id}
                                  </span>
                                </td>
                                <td className="px-6 font-[500] py-4">
                                  <span className="!text-primary">
                                    {order?.paymentId
                                      ? order?.paymentId
                                      : "CASH ON DELIVERY"}
                                  </span>
                                </td>
                                <td className="px-6 font-[500] py-4">
                                  <span className="">
                                    {order?.userId?.name}
                                  </span>
                                </td>
                                <td className="px-6 font-[500] py-4">
                                  <span className="!text-primary whitespace-nowrap">
                                    {order?.userId?.name}
                                  </span>
                                </td>
                                <td className="px-6 font-[500] py-4">
  <span className="whitespace-nowrap">
    +{order?.delivery_address?.mobile || order?.userId?.mobile || "Not provided"}
  </span>
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
                                      order?.delivery_address?.country}
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
                                  <span className="">{order?.totalAmt}</span>
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
                                          {order?.products?.map(
                                            (item, index) => {
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
                                            }
                                          )}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
