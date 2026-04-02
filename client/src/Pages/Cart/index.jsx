// import React, { useContext, useState } from "react";

// import Button from "@mui/material/Button";

// import { BsFillBagCheckFill } from "react-icons/bs";
// import CartItems from "./cartItems";
// import { myContext } from "../../App";

// const CartPage = () => {
//   const context=useContext(myContext)
//   return (
//     <>
//       <section className="section pb-10 py-5">
//         <div className="container w-[80%] max-w-[80%] gap-4 flex">
//           <div className="leftPart w-[70%]">
//             <div className="shadow-md rounded-md  bg-white">
//               <div className="py-2 px-3 border-b border-[rgba(0,0,0,0,1)]">
//                 <h2>Your Cart</h2>
//                 <p className="mt-0">
//                   There are <span className="font-bold !text-primary">{context?.cartData.length}</span>{" "}
//                   products in your cart
//                 </p>
//               </div>
//               {
//                 context?.cartData?.length !==0 &&
//                 context?.cartData?.map((item,index)=>
//                 {
//                   return ( <CartItems item={item} key={index} size="S" qty={item?.quantity} />)
//                 })
//               }

//             </div>
//           </div>

//           <div className="rightpart  w-[30%]">
//             <div className="shadow-md px-4 py-4 rounded-md bg-white">
//               <h4 className="">Cart Total</h4>
//               <hr />
//               <p className="flex items-center justify-between">
//                 <span className="text-[14px] font-[500] ">SubTotal</span>
//                 <span className="!text-primary font-bold">₹1300.00</span>
//               </p>
//               <p className="flex items-center justify-between">
//                 <span className="text-[14px] font-[500] ">Shipping</span>
//                 <span className=" font-bold">Free</span>
//               </p>
//               <p className="flex items-center justify-between">
//                 <span className="text-[14px] font-[500] ">Estimate for</span>
//                 <span className=" font-bold">United Kingdom</span>
//               </p>
//               <p className="flex items-center justify-between">
//                 <span className="text-[14px] font-[500] ">Total</span>
//                 <span className="!text-primary font-bold">₹1300.00</span>
//               </p>
//               <br />
//               <Button className="btn-org w-full btn-lg flex gap-2">
//                 <BsFillBagCheckFill className="text-[20px]" />
//                 CheckOut
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default CartPage;
import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./cartItems";
import { myContext } from "../../App";
import { Link } from "react-router-dom";

const CartPage = () => {
  const context = useContext(myContext);

  // No need to fetch variant data — it's already in cart item!
  const getVariantLabel = (item) => {
    if (item.size && item.size !== "") return `Size: ${item.size}`;
    if (item.ram && item.ram !== "") return `RAM: ${item.ram}`;
    if (item.weight && item.weight !== "") return `Weight: ${item.weight}`;
    return null;
  };

  const subtotal = context?.cartData?.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0) || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="section py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT - CART ITEMS */}
            <div className="w-full lg:w-[70%]">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6">
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                  <p className="mt-1 opacity-90">
                    {context?.cartData?.length > 0 ? (
                      <>There are <span className="font-bold text-xl">{context.cartData.length}</span> items in your cart</>
                    ) : (
                      "Your cart is empty"
                    )}
                  </p>
                </div>

                {context?.cartData?.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {context.cartData.map((item, index) => {
                      const variantLabel = getVariantLabel(item);

                      return (
                        <div key={item._id || index} className="p-6 hover:bg-gray-50 transition">
                          <CartItems item={item} />

                          {/* Variant & Quantity Badge */}
                          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                            {variantLabel && (
                              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full border border-primary/30">
                                {variantLabel}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 text-black font-bold rounded-full">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <img src="/shopping.png" alt="Empty Cart" className="w-32 mx-auto mb-6 opacity-70" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Cart is Empty</h3>
                    <Link to="/">
                      <Button className="btn-org !py-3 !px-8 text-lg">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT - CART SUMMARY */}
            {context?.cartData?.length > 0 && (
              <div className="w-full lg:w-[30%]">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    Order Summary
                  </h3>

                  <div className="space-y-4 text-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold text-primary">
                        {subtotal.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimate for</span>
                      <span className="font-medium">India</span>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary text-2xl">
                        {subtotal.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                      </span>
                    </div>

                    <Button className="w-full btn-org !py-4 !text-lg !font-bold mt-6 flex items-center justify-center gap-3 hover:shadow-xl transition">
                      <BsFillBagCheckFill className="text-2xl" />
                      Proceed to Checkout
                    </Button>

                    <Link to="/" className="block text-center mt-4">
                      <Button variant="outlined" className="!w-full !py-3">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;