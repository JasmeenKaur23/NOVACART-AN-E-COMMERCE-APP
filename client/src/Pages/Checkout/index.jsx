// import React, { useContext, useEffect, useState } from "react";
// import { myContext } from "../../App";
// import { Button, Radio } from "@mui/material";
// import { FaPlus } from "react-icons/fa6";
// import { IoBagCheckOutline } from "react-icons/io5";
// import { postData, deleteData, fetchDataFromApi } from "../../utils/api";
// import { useNavigate } from "react-router-dom";
// const VITE_APP_CASHFREE_KEY_ID = import.meta.env.VITE_APP_CASHFREE_KEY_ID;
// const VITE_APP_CASHFREE_KEY_SECRET = import.meta.env
//   .VITE_APP_CASHFREE_KEY_SECRET;

//   let cashfreeInstance = null;
// let isCheckoutInProgress = false;
// const Checkout = () => {
//   const context = useContext(myContext);
//   const [userData, setUserData] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [isChecked, setIsChecked] = useState(-1);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const history = useNavigate();

//   useEffect(() => {
//     setUserData(context?.userData);
//   }, [context?.userData]);

//   useEffect(() => {
//     const amount =
//       context?.cartData?.reduce(
//         (sum, item) => sum + parseInt(item.price) * item.quantity,
//         0
//       ) || 0;
//     setTotalAmount(amount);
//   }, [context?.cartData]);

//   const handleChange = (e, index) => {
//     setIsChecked(index);
//     setSelectedAddress(e.target.value);
//   };

//   const editAddress = (id) => {
//     context?.setOpenAddressPanel(true);
//     context?.setAddressMode("edit");
//     context?.setAddressId(id);
//   };

// //  const checkout = async (e) => {
// //   e.preventDefault();
// //   if (!selectedAddress) return alert("Please select an address!");
// //   if (totalAmount <= 0) return alert("Cart is empty!");

// //   try {
// //     // CLEAN PHONE NUMBER — THIS IS THE KEY FIX!
// //     let cleanPhone = "9999999999"; // default fallback

// //     if (userData?.mobile) {
// //       cleanPhone = userData.mobile.toString().replace(/\D/g, ""); // remove all non-digits
// //       if (cleanPhone.startsWith("91") && cleanPhone.length === 12) {
// //         cleanPhone = cleanPhone.slice(2); // remove 91 → left with 10 digits
// //       }
// //       if (cleanPhone.length !== 10) {
// //         cleanPhone = "9999999999"; // fallback if invalid
// //       }
// //     }

// //     // 1. Create Cashfree order
// //     const cfResponse = await postData("/api/payment/create-cf-order", {
// //       amount: totalAmount,
// //       userId: userData._id,
// //       customer_name: userData.name || "Customer",
// //       customer_email: userData.email || "customer@example.com",
// //       customer_phone: cleanPhone, // ← NOW 100% VALID STRING
// //     });

// //     console.log("Cashfree response:", cfResponse);

// //     if (!cfResponse?.payment_session_id) {
// //       throw new Error(cfResponse?.message || "Failed to initiate payment");
// //     }

// //     // 2. Open Cashfree Checkout
// //     const cashfree = await loadCashfree();

// //     cashfree.checkout({
// //       paymentSessionId: cfResponse.payment_session_id,
// //     }).then(async (result) => {
// //       if (result.error) {
// //         alert("Payment failed: " + result.error.message);
// //         return;
// //       }

// //       // SUCCESS → Save order
// //       const payload = {
// //         userId: userData._id,
// //         products: context.cartData.map(item => ({
// //           productId: item._id,
// //           productTitle: item.productTitle,
// //           quantity: item.quantity,
// //           price: item.price,
// //           image: item.image,
// //           subTotal: item.price * item.quantity,
// //         })),
// //         totalAmt: totalAmount,
// //         delivery_address: selectedAddress,
// //         paymentId: result.payment?.paymentId || cfResponse.order_id,
// //         payment_status: "COMPLETED",
// //       };
// // // ←←← ADD THIS LINE TO SEE EXACTLY WHAT'S BEING SENT ←←←
// //   console.log("🚀 FINAL PAYLOAD SENT TO /api/order/create →", payload);

// //       const orderRes = await postData("/api/order/create", payload);
// //       if (orderRes?.error) {
// //         alert("Order saved failed!");
// //         return;
// //       }

// //       await deleteData(`/api/cart/emptyCart/${userData._id}`);
// //       context?.getCartItems();
// //       context.openAlertBox("success", "Payment & Order Successful!");
// //       history("/");
// //     });

// //   } catch (err) {
// //     console.error("Checkout Error:", err);
// //     alert("Error: " + err.message);
// //   }
// // };

//   // Load SDK only once

//  // ←←← PUT THIS OUTSIDE the component (top of file) ←←←
// // Prevents double trigger

// const Checkout = () => {
//   // ... all your existing code (useState, useEffect, etc.) ...

//   const checkout = async (e) => {
//     e.preventDefault();

//     if (!selectedAddress) return alert("Please select an address!");
//     if (totalAmount <= 0) return alert("Cart is empty!");
//     if (isCheckoutInProgress) return; // ← PREVENT DOUBLE CLICK

//     isCheckoutInProgress = true;

//     try {
//       // CLEAN PHONE (your existing code - perfect)
//       let cleanPhone = "9999999999";
//       if (userData?.mobile) {
//         cleanPhone = userData.mobile.toString().replace(/\D/g, "");
//         if (cleanPhone.startsWith("91") && cleanPhone.length === 12) {
//           cleanPhone = cleanPhone.slice(2);
//         }
//         if (cleanPhone.length !== 10) cleanPhone = "9999999999";
//       }

//       // 1. Create Cashfree order
//       const cfResponse = await postData("/api/payment/create-cf-order", {
//         amount: totalAmount,
//         userId: userData._id,
//         customer_name: userData.name || "Customer",
//         customer_email: userData.email || "customer@example.com",
//         customer_phone: cleanPhone,
//       });

//       if (!cfResponse?.payment_session_id) {
//         throw new Error(cfResponse?.message || "Failed to get payment session");
//       }

//       // 2. Load SDK only once
//       if (!cashfreeInstance) {
//         cashfreeInstance = await window.Cashfree({ mode: "sandbox" });
//       }

//       // 3. Open Checkout (NO FLASH!)
//       cashfreeInstance.checkout({
//         paymentSessionId: cfResponse.payment_session_id,
//       }).then(async (result) => {
//         isCheckoutInProgress = false; // Reset

//         if (result.error) {
//           alert("Payment failed: " + result.error.message);
//           return;
//         }

//         // SUCCESS → FINAL PAYLOAD
//         const payload = {
//           userId: userData._id,
//           products: context.cartData.map(item => ({
//             productId: item._id,
//             productTitle: item.productTitle,
//             quantity: item.quantity,
//             price: item.price,
//             image: item.image,
//             subTotal: item.price * item.quantity,
//           })),
//           totalAmt: totalAmount,
//           delivery_address: selectedAddress,
//           paymentId: result.payment?.paymentId || cfResponse.order_id,
//           payment_status: "COMPLETED",
//         };

//         console.log("FINAL PAYLOAD SENT TO BACKEND:", payload);

//         const orderRes = await postData("/api/order/create", payload);

//         if (orderRes?.error) {
//           alert("Order save failed: " + orderRes.message);
//           return;
//         }

//         await deleteData(`/api/cart/emptyCart/${userData._id}`);
//         await context?.getCartItems();
//         context.openAlertBox("success", "Payment & Order Successful!");
//         history("/");
//       }).catch((err) => {
//         isCheckoutInProgress = false;
//         console.error("Cashfree checkout error:", err);
//         alert("Payment cancelled or failed");
//       });

//     } catch (err) {
//       isCheckoutInProgress = false;
//       console.error("Checkout Error:", err);
//       alert("Error: " + err.message);
//     }
//   };

//   // ←←← REMOVE the old loadCashfree function entirely ←←←
//   // We now use global cashfreeInstance

// };

//   // const loadCashfree = async () => {
//   //   if (window.cashfreeInstance) return window.cashfreeInstance;

//   //   const cashfree = await window.Cashfree({
//   //     mode: "sandbox", // change to "production" when live
//   //   });
//   //   window.cashfreeInstance = cashfree;
//   //   return cashfree;
//   // };
//   // Helper to load latest SDK (add this function)

//   return (
//     <section className="py-10">
//       <form onSubmit={checkout}>
//         <div className="w-[70%] m-auto flex gap-5">
//           <div className="leftCol w-[60%]">
//             <div className="bg-white w-full rounded-md shadow-md p-3 card">
//               <div className="flex items-center justify-between">
//                 <h2>Select Delivery Address</h2>
//                 <Button
//                   onClick={() => {
//                     context?.setOpenAddressPanel(true);
//                     context?.setAddressMode("add");
//                   }}
//                   variant="outlined"
//                   className="btn-org btn-border btn-sm"
//                 >
//                   <FaPlus /> Add New Address
//                 </Button>
//               </div>
//               <br />
//               <div className="flex flex-col gap-4">
//                 {userData?.address?.length ? (
//                   userData.address.map((address, index) => (
//                     <label
//                       key={index}
//                       className={`flex gap-3 relative p-4 border rounded-md border-[rgba(0,0,0,0.1)] ${
//                         isChecked === index ? "bg-[#fff2f2]" : ""
//                       }`}
//                     >
//                       <Radio
//                         checked={isChecked === index}
//                         size="small"
//                         value={address?._id}
//                         onChange={(e) => handleChange(e, index)}
//                       />
//                       <div className="info">
//                         <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md ">
//                           {address?.addressType}
//                         </span>
//                         <h4 className="text-[20px]">
//                           {context?.userData?.name}
//                         </h4>
//                         <p>{`${address?.address_line1} ${address?.city} ${address?.state} ${address?.country} ${address?.landmark}`}</p>
//                         <p className="font-[500] mb-0">+{address?.mobile}</p>
//                       </div>
//                       <Button
//                         size="small"
//                         className="!top-[15px] !right-[15px] !absolute"
//                         variant="text"
//                         onClick={() => editAddress(address?._id)}
//                       >
//                         EDIT
//                       </Button>
//                     </label>
//                   ))
//                 ) : (
//                   <div className="flex flex-col items-center p-5 mt-5">
//                     <img width="100" src="/no-address.png" alt="" />
//                     <h5>No Addresses found in your account</h5>
//                     <p>Add a Delivery address</p>
//                     <Button className="btn-org btn-sm">Add Address</Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="rightCol w-[40%]">
//             <div className="card shadow-md bg-white p-4 rounded-md">
//               <h4 className="mb-4">Your Order</h4>
//               <div className="flex border-t border-b py-2 border-[rgba(0,0,0,0.1)] items-center justify-between">
//                 <span className="text-[16px] font-[600]">Product</span>
//                 <span className="text-[16px] font-[600]">SubTotal</span>
//               </div>
//               <div className="scroll pr-2 mb-3 max-h-[280px] overflow-y-scroll overflow-x-hidden">
//                 {context?.cartData?.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center py-2 justify-between"
//                   >
//                     <div className="part1 flex items-center gap-3">
//                       <img
//                         className="w-[60px] h-[60px] object-cover rounded-md"
//                         src={item.image}
//                         alt=""
//                       />
//                       <div className="info">
//                         <h4 className="text-[14px]" title={item.productTitle}>
//                           {item.productTitle.substr(0, 25) + "..."}
//                         </h4>
//                         <span className="text-[13px]">
//                           Qty : {item.quantity}
//                         </span>
//                       </div>
//                     </div>
//                     <span className="text-[14px] font-[500]">
//                       {(item.quantity * item.price).toLocaleString("en-US", {
//                         style: "currency",
//                         currency: "INR",
//                       })}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <Button
//                 type="submit"
//                 className="btn-org btn-lg flex gap-2 items-center w-full"
//               >
//                 <IoBagCheckOutline className="text-[20px]" /> CheckOut
//               </Button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Checkout;

import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import { Button, Radio } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { postData, deleteData, fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";

// ———— GLOBAL VARIABLES (outside component) ————
let cashfreeInstance = null;
let isCheckoutInProgress = false;

const Checkout = () => {
  const context = useContext(myContext);
  const [userData, setUserData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isChecked, setIsChecked] = useState(-1);
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    if (context?.userData) {
      setUserData(context.userData);

      // Auto-select the FIRST address when user has addresses
      if (context.userData.address && context.userData.address.length > 0) {
        const firstAddressId = context.userData.address[0]._id;
        setSelectedAddress(firstAddressId);
        setIsChecked(0); // Highlight the first radio button
      }
    }

    fetchDataFromApi(`/api/order/order-list`).then((res) => {
      console.log("res from fetch", res);
    });
  }, [context?.userData]); // ← ONLY this dependency! Remove userData
  useEffect(() => {
    const amount =
      context?.cartData?.reduce(
        (sum, item) => sum + parseInt(item.price) * item.quantity,
        0
      ) || 0;
    setTotalAmount(amount);
  }, [context?.cartData]);

  const handleChange = (e, index) => {
    setIsChecked(index);
    setSelectedAddress(e.target.value);
  };

  const editAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  // —————————— FINAL WORKING CHECKOUT FUNCTION ——————————
  const checkout = async (e) => {
    e.preventDefault();
    // if (!selectedAddress) return alert("Please select an address!");
    if (totalAmount <= 0) return alert("Cart is empty!");
    if (isCheckoutInProgress) return; // ← prevents double click / StrictMode issue

    isCheckoutInProgress = true;
    if (userData?.address?.length !== 0) {
      try {
        // Clean phone number (Cashfree requires exact 10 digits)
        let cleanPhone = "9999999999";
        if (userData?.mobile) {
          cleanPhone = userData.mobile.toString().replace(/\D/g, "");
          if (cleanPhone.startsWith("91") && cleanPhone.length === 12) {
            cleanPhone = cleanPhone.slice(2);
          }
          if (cleanPhone.length !== 10) cleanPhone = "9999999999";
        }

        // 1. Create Cashfree order
        const cfResponse = await postData("/api/payment/create-cf-order", {
          amount: totalAmount,
          userId: userData._id,
          customer_name: userData.name || "Customer",
          customer_email: userData.email || "customer@example.com",
          customer_phone: cleanPhone,
        });

        if (!cfResponse?.payment_session_id) {
          throw new Error(
            cfResponse?.message || "Failed to get payment session"
          );
        }

        // 2. Load SDK only once
        if (!cashfreeInstance) {
          cashfreeInstance = await window.Cashfree({ mode: "sandbox" }); // change to "production" when live
        }

        // 3. Open Checkout – NO FLASH!
        cashfreeInstance
          .checkout({
            paymentSessionId: cfResponse.payment_session_id,
          })
          .then(async (result) => {
            isCheckoutInProgress = false;

            if (result.error) {
              alert("Payment failed: " + result.error.message);
              return;
            }

            // ———— FINAL PAYLOAD (this will now show perfectly in console) ————
            const payload = {
              userId: userData._id,
              products: context.cartData.map((item) => ({
                productId: item.productId,
                productTitle: item.productTitle,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
                subTotal: item.price * item.quantity,
              })),
              totalAmt: totalAmount,
              delivery_address: selectedAddress,
              paymentId: result.payment?.paymentId || cfResponse.order_id,
              payment_status: "COMPLETED",
            };

            console.log("FINAL PAYLOAD SENT TO BACKEND:", payload);

            // const orderRes = await postData("/api/order/create", payload);
            // if (orderRes?.error) {
            //   alert("Order save failed!");
            //   return;
            // }
            // const orderRes = await postData("/api/order/create", payload);

            // if (!orderRes?.success) {           // ← THIS IS THE CORRECT CHECK
            //   alert("Order save failed: " + (orderRes?.message || "Unknown error"));
            //   return;
            // }
            //           context.openAlertBox("success", "Payment & Order Successful!");
            //           history("/order/success");
            //           await deleteData(`/api/cart/emptyCart/${userData._id}`);
            //           await context?.getCartItems();
            //           await context?.getProducts?.();
            //           context.openAlertBox("success", "Payment & Order Successful!");
            //           // history("/order/success");
            //           context.openAlertBox("success", "Payment & Order Successful!");
            // Frontend – inside .then() after payment success
            const orderRes = await postData("/api/order/create", payload);

            console.log("Order create response:", orderRes); // ← ADD THIS

            if (!orderRes?.success) {
              console.error("Order failed:", orderRes);
              alert(
                "Order save failed: " +
                  (orderRes?.message || "Please try again")
              );
              return;
            }

            // Only reaches here if really successful
            await deleteData(`/api/cart/emptyCart/${userData._id}`);
            await context?.getCartItems();
            await context?.getProducts?.();

            context.openAlertBox("success", "Payment & Order Successful!");
            history("/order/success");
          })
          .catch((err) => {
            isCheckoutInProgress = false;
            console.error("Cashfree error:", err);
            alert("Payment cancelled or failed");
            history("/order/failed");
          });
      } catch (err) {
        isCheckoutInProgress = false;
        console.error("Checkout Error:", err);
        alert("Error: " + err.message);
      }
    } else {
      context?.openAlertBox("error", "Please add address");
    }
  };

  // const cashOnDelivery = (e) => {
  //   const user = context?.userData;
  //   const payload = {
  //     userId: userData._id,
  //     products: context.cartData.map((item) => ({
  //       productId: item._id,
  //       productTitle: item.productTitle,
  //       quantity: item.quantity,
  //       price: item.price,
  //       image: item.image,
  //       subTotal: item.price * item.quantity,
  //     })),
  //     totalAmt: totalAmount,
  //     delivery_address: selectedAddress,
  //     paymentId: "",
  //     payment_status: "CASH ON DELIVERY",
  //   };

  //   postData("/api/order/create", payload).then((res) => {
  //     context?.openAlertBox("success", res?.message);
  //     if (res?.error === false) {

  //       deleteData(`/api/cart/emptyCart/${userData._id}`).then((res) => {
  //         context?.getCartItems();
  //          context?.getProducts?.();
  //       });
  //      history("/order/success");
  //     } else {
  //       context?.openAlertBox("error", res?.message);
  //     }
  //   });
  // };
  const cashOnDelivery = async (e) => {
    e.preventDefault();
    // if (!selectedAddress) return alert("Please select address");
    if (totalAmount <= 0) return alert("Cart is empty");

    if (userData?.address?.length !== 0) {
      const payload = {
        userId: userData._id,
        products: context.cartData.map((item) => ({
          productId: item.productId,
          productTitle: item.productTitle,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          subTotal: item.price * item.quantity,
        })),
        totalAmt: totalAmount,
        delivery_address: selectedAddress,
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
      };

      try {
        const res = await postData("/api/order/create", payload);
        if (res?.error) throw new Error(res.message);

        await deleteData(`/api/cart/emptyCart/${userData._id}`);
        await context?.getCartItems();
        await context?.getProducts?.();

        context.openAlertBox("success", "Order placed successfully!");
        history("/order/success");
      } catch (err) {
        context.openAlertBox("error", err.message || "Order failed");
      }
    } else {
      context?.openAlertBox("error", "Please add address");
    }
  };
  // —————————— JSX ——————————
  return (
    <section className="py-3 lg:py-10 px-3 ">
      <form onSubmit={checkout}>
        <div className="w-full lg:w-[70%] m-auto flex flex-col md:flex-row gap-5">
          {/* LEFT COLUMN – ADDRESS */}
          <div className="leftCol w-full md:w-[60%]">
            <div className="bg-white w-full rounded-md shadow-md p-3 card">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px]">Select Delivery Address</h2>
                <Button
                  onClick={() => {
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }}
                  variant="outlined"
                  className="btn-org  "
                >
                  <FaPlus /> Add {context?.windowWidth <767 ? '':'NEW ADDRESS'}
                </Button>
              </div>
              <br />
              <div className="flex flex-col gap-4">
                {userData?.address?.length ? (
                  userData.address.map((address, index) => (
                    <label
                      key={index}
                      className={`flex gap-3 relative p-4 border rounded-md border-[rgba(0,0,0,0.1)] ${
                        isChecked === index ? "bg-[#fff2f2]" : ""
                      }`}
                    >
                      <Radio
                        checked={isChecked === index}
                        size="small"
                        value={address?._id}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <div className="info">
                        <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md">
                          {address?.addressType}
                        </span>
                        <h4 className="text-[20px]">
                          {context?.userData?.name}
                        </h4>
                        <p>{`${address?.address_line1} ${address?.city} ${address?.state} ${address?.country}  ${address?.landmark} ${"+"+address?.mobile}`}</p>
                     
                     {userData?.mobile && <p className="font-[500] mb-0">+{userData?.mobile}</p>}   
                      </div>
                      <Button
                        size="small"
                        className="!top-[15px] btn-org !font-[500] !text-[15px] !right-[15px] !absolute"
                        variant="text"
                        onClick={() => editAddress(address?._id)}
                      >
                        EDIT
                      </Button>
                    </label>
                  ))
                ) : (
                  <div className="text-center p-5">
                    <img width="100" src="/no-address.png" alt="" />
                    <h5>No Addresses found</h5>
                    <p>Add a Delivery address</p>
                    <Button onClick={() => {
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }} className="btn-org btn-sm">Add Address</Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN – ORDER SUMMARY */}
          <div className="rightCol w-full md:w-[40%]">
            <div className="card shadow-md bg-white p-4 rounded-md">
              <h4 className="mb-4">Your Order</h4>
              <div className="flex border-t border-b py-2 border-[rgba(0,0,0,0.1)] justify-between">
                <span className="text-[16px] font-[600]">Product</span>
                <span className="text-[16px] font-[600]">SubTotal</span>
              </div>
              <div className="max-h-[280px] overflow-y-auto pr-2 mb-3">
                {context?.cartData?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-2 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="w-14 h-14 object-cover rounded"
                        src={item.image}
                        alt=""
                      />
                      <div>
                        <h4 className="text-sm">
                          {item.productTitle.substr(0, 25)}...
                        </h4>
                        <span className="text-xs">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-medium">
                      {(item.price * item.quantity).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center flex-col gap-3 mb-2">
                <Button
                  type="submit"
                  className="btn-org btn-lg w-full flex gap-2 items-center justify-center"
                >
                  <IoBagCheckOutline className="text-xl" /> CheckOut
                </Button>

                <Button
                  // type="submit"
                  onClick={cashOnDelivery}
                  className="btn-dark btn-lg w-full flex gap-2 items-center justify-center"
                >
                  <BsFillBagCheckFill className="text-[20px]" /> Cash On
                  Delivery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
