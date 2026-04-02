// import React, { useContext, useEffect, useState } from "react";
// import "../ProductItems/style.css";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { MdClose, MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
// import { myContext } from "../../App";
// import { deleteData, editData, postData } from "../../utils/api";
// import CircularProgress from "@mui/material/CircularProgress";
// import { IoMdHeart } from "react-icons/io";

// const ProductItem = (props) => {
//   const [quantity, setQuantity] = useState(1);
//   const [isAdded, setIsAdded] = useState(false);
//   const context = useContext(myContext);
//   const [cartItem, setCartItem] = useState(null)
//   const [activeTab, setActiveTab] = useState(null);
//   const [isAddedInMyList, setIsAddedInMyList] = useState(false);
//   const [isShowTabs, setIsShowTabs] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedTabName, setSelectedTabName] = useState(null);
//   const addToCart = (product, userId, quantity) => {
//     const productItem = {
//       _id: product?._id,
//       name: product?.name,
//       image: product?.images[0],
//       rating: product?.rating,
//       price: product?.price, //see if error
//       oldPrice: product?.oldPrice,

//       quantity: quantity,
//       subTotal: parseInt(product?.price * quantity),
//       productId: product?._id,
//       countInStock: product?.countInStock,

//       userId: userId,
//       brand: product?.brand,
//       discount: product?.discount,
//       size: props?.item?.size?.length !== 0 ? selectedTabName : "",
//       weight: props?.item?.productWeight?.length !== 0 ? selectedTabName : "",
//       ram: props?.item?.productRam?.length !== 0 ? selectedTabName : "",
//     };

//     setIsLoading(true);
//     if (
//       props?.item?.size?.length !== 0 ||
//       props?.item?.productRam?.length !== 0 ||
//       props?.item?.productWeight?.length !== 0
//     ) {
//       setIsShowTabs(true);
//     } else {
//       context?.addToCart(productItem, userId, quantity);

//       setTimeout(() => {
//         setIsLoading(false);
//         setIsAdded(true);
//         setIsShowTabs(false);
//       }, 1000); // smooth loader visible
//     }
//     if (activeTab !== null) {
//       context?.addToCart(productItem, userId, quantity);
//       setIsAdded(true);
//       setIsShowTabs(false);
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000); // ✅ FIX – stop loader when variant chosen
//     }
//   };

//   // useEffect(() => {
//   //   const item = context?.cartData?.filter((cartItem) =>
//   //     cartItem.productId.includes(props?.item?._id)
//   //   );
//   //   const myListItem = context?.myListData?.filter((item) =>
//   //     item.productId.includes(props?.item?._id)
//   //   );
//   //   // console.log(myListItem);

//   //   if (item?.length !== 0) {
//   //     setCartItem(item);
//   //     console.log(item);

//   //     setIsAdded(true);
//   //     setQuantity(item[0]?.quantity);
//   //   } else {
//   //     setQuantity(1);
//   //   }
//   //   if (myListItem?.length !== 0) {
//   //     // setCartItem(item);
//   //     console.log(item);

//   //     setIsAddedInMyList(true);
//   //     // setQuantity(item[0]?.quantity);
//   //   } else {
//   //     setIsAddedInMyList(false);
//   //   }
//   // }, [context?.cartData]);
//  useEffect(() => {
//   if (!context?.cartData || !props?.item?._id) return;

//   const found = context.cartData.find(
//     (cart) => cart.productId === props.item._id
//   );

//   if (found) {
//     setQuantity(found.quantity);
//     setCartItem(found);   // ✅ SINGLE OBJECT
//     setIsAdded(true);
//   } else {
//     setQuantity(1);
//     setCartItem(null);
//     setIsAdded(false);
//   }

//   const myListItem = context?.myListData?.find(
//     (item) => item.productId === props?.item?._id
//   );

//   setIsAddedInMyList(!!myListItem);
// }, [context.cartData, context.myListData, props?.item?._id]);

//  const addQty = () => {
//   const newQty = quantity + 1;

//   const obj = {
//     _id: cartItem._id,
//     qty: newQty,
//     subTotal: props.item.price * newQty,
//   };

//   editData("/api/cart/update-qty", obj).then(() => {
//     context.getCartItems();
//     setQuantity(newQty);
//   });
// };
// const minusQty = () => {
//   if (quantity === 1) {
//     deleteData(`/api/cart/delete-cart-item/${cartItem._id}`).then(() => {
//       context.getCartItems();
//       setIsAdded(false);
//       setQuantity(1);
//     });
//     return;
//   }

//   const newQty = quantity - 1;

//   const obj = {
//     _id: cartItem._id,
//     qty: newQty,
//     subTotal: props.item.price * newQty,
//   };

//   editData("/api/cart/update-qty", obj).then(() => {
//     context.getCartItems();
//     setQuantity(newQty);
//   });
// };

//   const handleClickActiveTab = (index, name) => {
//     setActiveTab(index);
//     setSelectedTabName(name);
//   };

//   const handleAddToMyList = (item) => {
//     console.log("item", item);

//     if (context?.userData === null) {
//       context?.openAlertBox("error", "Please login first ");
//       return false;
//     } else {
//       const obj = {
//         productId: item?._id,
//         userId: context?.userData?._id,
//         productTitle: item?.name,
//         image: item?.images[0],
//         rating: item?.rating,
//         price: item?.price,
//         oldPrice: item?.oldPrice,
//         brand: item?.brand,
//         discount: item?.discount,
//       };

//       postData(`/api/myList/add`, obj).then((res) => {
//         if (res?.error === false) {
//           context?.openAlertBox("success", res?.message);
//           setIsAddedInMyList(true);
//           context?.getMyListData();
//         } else {
//           context?.openAlertBox("error", res?.message);
//         }
//       });
//       // return true;
//     }
//   };

//   return (
//     <>
//       <div className="product-item shadow-md shadow-[#bdb9bc] rounded-md overflow-hidden border border-[rgba(0,0,0,0.2)]">
//         <div className="imgWrapper group relative w-[100%] rounded-md group overflow-hidden">
//           <Link to={`/product-details/${props?.item?._id}`}>
//             <div className="img  h-[220px] overflow-hidden rounded-md">
//               {" "}
//               {/* Added group-hover:bg-red-500 for debugging: if it turns red on hover, group is working */}
//               {/* First image (default) */}
//               <img
//                 src={props?.item?.images[0]}
//                 alt="main productitems"
//                 className="w-full h-full hover:scale-110 object-cover"
//               />
//               {/* Second image (hover) */}
//               <img
//                 src={props?.item?.images[1]}
//                 alt="alt 2nd image productitems"
//                 className="w-full  hover:scale-110  absolute object-cover top-0 left-0 opacity-0 h-full group-hover:scale-105 group-hover:!opacity-100"
//               />
//             </div>
//           </Link>
//           {isShowTabs === true && (
//             <div
//               className="flex items-center justify-center
//            absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2"
//             >
//               {
//                 <Button
//                   onClick={() => setIsShowTabs(false)}
//                   className="!absolute top-[10px] !min-w-[30px] !min-h-[30px]
//                  !w-[30px] !h-[30px] text-black !rounded-full !bg-[rgba(255,255,255,1)] right-[10px]"
//                 >
//                   {" "}
//                   <MdClose className=" text-[25px] text-black z-90 " />
//                 </Button>
//               }
//               {props?.item?.size?.length !== 0 &&
//                 props?.item?.size?.map((item, index) => {
//                   return (
//                     <span
//                       key={index}
//                       className={`flex items-center justify-center min-w-[30px] p-1 max-w-[35px]  bg-[rgba(255,255,255,0.8)] px-2 py-2 w-[25px] h-[25px] rounded-sm cursor-pointer
//                  hover:bg-white ${
//                    activeTab === index && "!bg-primary text-white"
//                  }  `}
//                       onClick={() => handleClickActiveTab(index, item)}
//                     >
//                       {item}
//                     </span>
//                   );
//                 })}
//               {props?.item?.productRam?.length !== 0 &&
//                 props?.item?.productRam?.map((item, index) => {
//                   return (
//                     <span
//                       key={index}
//                       className={`flex items-center justify-center min-w-[45px] p-1 max-w-[45px]  bg-[rgba(255,255,255,0.8)] px-2 py-2 w-[45px] h-[25px] rounded-sm cursor-pointer
//                  hover:bg-white ${
//                    activeTab === index && "!bg-primary text-white"
//                  }  `}
//                       onClick={() => handleClickActiveTab(index, item)}
//                     >
//                       {item}
//                     </span>
//                   );
//                 })}
//               {props?.item?.productWeight?.length !== 0 &&
//                 props?.item?.productWeight?.map((item, index) => {
//                   return (
//                     <span
//                       key={index}
//                       className={`flex items-center justify-center min-w-[45px] p-1 max-w-[45px]  bg-[rgba(255,255,255,0.8)] px-2 py-2 w-[50px] h-[35px] rounded-sm cursor-pointer
//                  hover:bg-white ${
//                    activeTab === index && "!bg-primary text-white"
//                  }  `}
//                       onClick={() => handleClickActiveTab(index, item)}
//                     >
//                       {item}
//                     </span>
//                   );
//                 })}
//             </div>
//           )}

//           <span className="discount p-1 flex items-center text-[12px] font-[500] absolute z-50 text-white rounded-lg !bg-primary top-[10px] left-[10px]">
//             {props?.item?.discount}%
//           </span>
//           <div className="actions group-hover:top-[15px] transition-all duration-700 absolute top-[-200px] flex-col w-[50px] right-[5px] z-50 flex items-center gap-2">
//             <Button
//               onClick={() =>
//                 context.handleClickOpenProductDetailModal(true, { ...props.item, isModal: true })
//               }
//               className="!w-[35px] hover:!text-white text-black !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary"
//             >
//               <MdZoomOutMap className="text-[18px] hover:!text-white group-hover:text-white !text-black" />
//             </Button>
//             {/* <Button className="!w-[35px] group hover:!text-white text-black !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary">
//               <IoGitCompareOutline className="text-[18px] hover:!text-white group-hover:text-white !text-black" />
//             </Button> */}
//             <Button
//               onClick={() => handleAddToMyList(props?.item)}
//               className={`  !w-[35px] group hover:!text-white text-black
//              !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary`}
//             >
//               {isAddedInMyList === true ? (
//                 <IoMdHeart className="text-[18px] hover:!text-white group-hover:text-white !text-primary" />
//               ) : (
//                 <FaRegHeart className="text-[18px] hover:!text-white group-hover:text-white !text-black" />
//               )}
//             </Button>
//           </div>
//         </div>

//         <div className="info pb-[60px] h-[200px] relative p-3 py-4 bg-[#f1f1f1]">
//           <h6 className="!text-[13px] !font-[400]">
//             <Link
//               to={`/product-details/${props?.item?._id}`}
//               className="link transition-all"
//             >
//               {props?.item?.brand}
//             </Link>
//           </h6>
//           <h3 className="text-[13px] lg:text-[15px] mb-1 mt-2 font-[500] title text-[black]">
//             <Link
//               to={`/product-details/${props?.item?._id}`}
//               className="link transition-all"
//             >
//               {props?.item?.name.substring(0, 25) + "..."}
//             </Link>
//           </h3>
//           <Rating
//             name="size-small"
//             defaultValue={props?.item?.rating}
//             size="small"
//             readOnly
//           />

//           <div className="flex items-center cursor-default text-[13px] lg:text-[15px] font-[500] gap-3">
//             <span className="oldPrice line-through text-gray-500">
//               {" "}
//               &#x20b9;{props?.item?.oldPrice}
//             </span>
//             <span className="price !text-primary font-[700]">
//               {" "}
//               &#x20b9;{props?.item?.price}
//             </span>
//           </div>

//           <div className=" left-0 pl-3 mt-5  pr-3 w-full bottom-[25px] !absolute">
//             {isAdded === false ? (
//               <Button
//                 onClick={() =>
//                   addToCart(props?.item, context?.userData?._id, quantity)
//                 }
//                 className="btn-org btn-sml  addtocartBtn justify-center w-full flex gap-2 "
//               >
//                 <MdOutlineShoppingCart /> Add to cart
//               </Button>
//             ) : (
//               <>
//                 {isLoading === true ? (
//                   <Button
//                     onClick={() =>
//                       addToCart(props?.item, context?.userData?._id, quantity)
//                     }
//                     className="btn-org btn-sml addtocartBtn justify-center w-full flex gap-2 "
//                   >
//                     <CircularProgress />
//                   </Button>
//                 ) : (
//                   <div className="flex items-center overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)] justify-between ">
//                     <Button
//                       onClick={minusQty}
//                       className="!rounded-none  !bg-primary !min-w-[35px] !w-[35px] !h-[30px] "
//                     >
//                       {" "}
//                       <FaMinus className="text-white" />
//                     </Button>
//                     <span>{quantity}</span>
//                     <Button
//                       onClick={addQty}
//                       className="!rounded-none !bg-primary !min-w-[35px] !w-[35px] !h-[30px] "
//                     >
//                       {" "}
//                       <FaPlus className="text-white" />
//                     </Button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductItem;

import React, { useContext, useEffect, useState } from "react";
import "../ProductItems/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdClose, MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { myContext } from "../../App";
import { deleteData, editData, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdHeart } from "react-icons/io";

const ProductItem = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const context = useContext(myContext);
  const [cartItem, setCartItem] = useState(null);
  const [ramIndex, setRamIndex] = useState(null); // Separate index for ram
  const [sizeIndex, setSizeIndex] = useState(null); // Separate index for size
  const [weightIndex, setWeightIndex] = useState(null); // Separate index for weight
  const [selectedRam, setSelectedRam] = useState(""); // Separate selection for ram
  const [selectedSize, setSelectedSize] = useState(""); // Separate selection for size
  const [selectedWeight, setSelectedWeight] = useState(""); // Separate selection for weight
  const [isAddedInMyList, setIsAddedInMyList] = useState(false);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync Cart & MyList (loose match by productId only, like before; for strict variant match, see notes below)
  useEffect(() => {
    if (!context?.cartData || !props?.item?._id) return;

    const found = context.cartData.find(
      (cart) => cart.productId === props.item._id // Loose match (ignores variants for now)
    );

    if (found) {
      setQuantity(found.quantity);
      setCartItem(found);
      setIsAdded(true);
    } else {
      setQuantity(1);
      setCartItem(null);
      setIsAdded(false);
    }

    const myListItem = context?.myListData?.find(
      (item) => item.productId === props?.item?._id
    );

    setIsAddedInMyList(!!myListItem);
  }, [context.cartData, context.myListData, props?.item?._id]);

  // Reset selections when overlay closes or item changes
  useEffect(() => {
    if (!isShowTabs) {
      setRamIndex(null);
      setSizeIndex(null);
      setWeightIndex(null);
      setSelectedRam("");
      setSelectedSize("");
      setSelectedWeight("");
    }
  }, [isShowTabs]);

  const addToCart = async () => {
    if (!context?.userData?._id) {
      context?.openAlertBox("error", "Please login first");
      return;
    }

    const needsRam = props?.item?.productRam?.length > 0;
    const needsSize = props?.item?.size?.length > 0;
    const needsWeight = props?.item?.productWeight?.length > 0;

    // Validate all required variants are selected
    if (
      (needsRam && selectedRam === "") ||
      (needsSize && selectedSize === "") ||
      (needsWeight && selectedWeight === "")
    ) {
      setIsShowTabs(true); // Open overlay if not already
      context?.openAlertBox("error", "Please select all required options");
      return;
    }

    setIsLoading(true);
    // Inside addToCart
    if (quantity > props.item.countInStock) {
      context?.openAlertBox("error", "Stock limit reached");
      setQuantity(props.item.countInStock); // optional: reset to max
      return;
    }

    const productItem = {
      productId: props.item.productId || props.item._id, // THIS IS THE MOST IMPORTANT LINE
      productTitle: props.item.name,
      image: props.item.images[0],
      rating: props.item.rating || 4,
      price: parseFloat(props.item.price),
      oldPrice: parseFloat(props.item.oldPrice || 0),
      quantity: quantity,
      subTotal: parseFloat(props.item.price) * quantity,
      countInStock: props.item.countInStock,
      userId: context.userData._id,
      brand: props.item.brand,
      discount: props.item.discount || 0,
      ram: selectedRam || "",
      size: selectedSize || "",
      weight: selectedWeight || "",
    };
    try {
      console.log("FINAL PAYLOAD GOING TO BACKEND:", productItem);
      const res = await postData("/api/cart/add", productItem);
      if (res?.error === false) {
        context?.openAlertBox("success", res?.message || "Added to cart!");
        context.getCartItems(); // Refresh global context
        setIsAdded(true); // Optimistic local update
        setIsShowTabs(false);
      } else {
        if (res?.message?.toLowerCase().includes("already")) {
          context?.openAlertBox("info", "Already in your cart");
          context.getCartItems();
        } else {
          context?.openAlertBox("error", res?.message);
        }
      }
    } catch (error) {
      context?.openAlertBox("error", "Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const addQty = () => {
    if (!cartItem) return;

    const newQty = quantity + 1;

    // CORRECT: Block if newQty would EXCEED stock
    if (newQty > props.item.countInStock) {
      context?.openAlertBox(
        "error",
        `Only ${props.item.countInStock} items in stock!`
      );
      return;
    }

    const obj = {
      _id: cartItem._id,
      qty: newQty,
      subTotal: props.item.price * newQty,
    };

    editData("/api/cart/update-qty", obj).then(() => {
      context.getCartItems();
      setQuantity(newQty);
    });
  };
  const minusQty = () => {
    if (quantity === 1) {
      deleteData(`/api/cart/delete-cart-item/${cartItem._id}`).then(() => {
        context.getCartItems();
        setIsAdded(false);
        setQuantity(1);
        setCartItem(null);
      });
      return;
    }
    const newQty = quantity - 1;
    const obj = {
      _id: cartItem._id,
      qty: newQty,
      subTotal: props.item.price * newQty,
    };
    editData("/api/cart/update-qty", obj).then(() => {
      context.getCartItems();
      setQuantity(newQty);
    });
  };

  // Separate handlers for each variant type (like in details)
  const handleClickActiveTab = (type, index, name) => {
    if (type === "ram") {
      setRamIndex(index);
      setSelectedRam(name);
    }
    if (type === "size") {
      setSizeIndex(index);
      setSelectedSize(name);
    }
    if (type === "weight") {
      setWeightIndex(index);
      setSelectedWeight(name);
    }
  };

  const handleAddToMyList = (item) => {
    if (context?.userData === null) {
      context?.openAlertBox("error", "Please login first ");
      return false;
    } else {
      const obj = {
        productId: item.productId || item._id, // ← FIX THIS TOO!
        userId: context?.userData?._id,
        productTitle: item.name,
        image: item.images[0],
        rating: item.rating,
        price: item.price,
        oldPrice: item.oldPrice,
        brand: item.brand,
        discount: item.discount,
      };

      postData(`/api/myList/add`, obj).then((res) => {
        if (res?.error === false) {
          context?.openAlertBox("success", res?.message);
          setIsAddedInMyList(true); // Optimistic update
          context?.getMyListData();
        } else {
          context?.openAlertBox("error", res?.message);
        }
      });
    }
  };

  // Trigger addToCart on button click (opens overlay if needed, or adds directly)
  const handleAddToCartClick = () => {
    if (
      props?.item?.size?.length > 0 ||
      props?.item?.productRam?.length > 0 ||
      props?.item?.productWeight?.length > 0
    ) {
      setIsShowTabs(true); // Open overlay for selection
    } else {
      addToCart(); // Direct add if no variants
    }
  };

  // Close overlay and add (called from overlay's confirm/close logic)
  const handleConfirmAndAdd = () => {
    setIsShowTabs(false);
    addToCart();
  };

  return (
    <>
      <div className="product-item shadow-md shadow-[#bdb9bc] rounded-md overflow-hidden border border-[rgba(0,0,0,0.2)]">
        <div className="imgWrapper group relative w-[100%] rounded-md group overflow-hidden">
          <Link to={`/product-details/${props?.item?._id}`}>
            <div className="img  h-[220px] overflow-hidden rounded-md">
              <img
                src={props?.item?.images[0]}
                alt="main productitems"
                className="w-full h-full hover:scale-110 object-cover"
              />
              <img
                src={props?.item?.images[1]}
                alt="alt 2nd image productitems"
                className="w-full  hover:scale-110  absolute object-cover top-0 left-0 opacity-0 h-full group-hover:scale-105 group-hover:!opacity-100"
              />
            </div>
          </Link>

          {/* VARIANT OVERLAY - Updated with separate sections like details */}
          {isShowTabs && (
            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2 flex-col">
              <Button
                onClick={() => setIsShowTabs(false)}
                className="!absolute top-[10px] !min-w-[30px] !min-h-[30px] !w-[30px] !h-[30px] text-black !rounded-full !bg-[rgba(255,255,255,1)] right-[10px]"
              >
                <MdClose className=" text-[25px] text-black z-90 " />
              </Button>

              {/* RAM Section */}
              {props?.item?.productRam?.length > 0 && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white min-w-[40px]">RAM:</span>
                  <div className="flex gap-2 flex-wrap">
                    {props.item.productRam.map((ram, i) => (
                      <span
                        key={i}
                        className={`
                          px-1 py-1 border-2 rounded cursor-pointer min-w-[60px] text-center text-black
                          ${
                            ramIndex === i
                              ? "!bg-primary text-white !border-primary"
                              : "bg-[rgba(255,255,255,0.8)] border-gray-300 hover:!border-primary"
                          }
                        `}
                        onClick={() => handleClickActiveTab("ram", i, ram)}
                      >
                        {ram}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SIZE Section */}
              {props?.item?.size?.length > 0 && (
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-white min-w-[40px]">Size:</span>
                  <div className="flex gap-2 flex-wrap">
                    {props.item.size.map((s, i) => (
                      <span
                        key={i}
                        className={`
                          px-1 py-1 border-2 rounded cursor-pointer min-w-[50px] text-center text-black
                          ${
                            sizeIndex === i
                              ? "!bg-primary text-white !border-primary"
                              : "bg-[rgba(255,255,255,0.8)] border-gray-300 hover:!border-primary"
                          }
                        `}
                        onClick={() => handleClickActiveTab("size", i, s)}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* WEIGHT Section */}
              {props?.item?.productWeight?.length > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white min-w-[50px]">Weight:</span>
                  <div className="flex gap-2 flex-wrap">
                    {props.item.productWeight.map((w, i) => (
                      <span
                        key={i}
                        className={`
                          px-3 py-2 border-2 rounded cursor-pointer min-w-[70px] text-center text-black
                          ${
                            weightIndex === i
                              ? "!bg-primary text-white !border-primary"
                              : "bg-[rgba(255,255,255,0.8)] border-gray-300 hover:!border-primary"
                          }
                        `}
                        onClick={() => handleClickActiveTab("weight", i, w)}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm Button - Like in details */}
              <Button
                onClick={handleConfirmAndAdd}
                disabled={
                  isLoading ||
                  (props?.item?.productRam?.length > 0 && selectedRam === "") ||
                  (props?.item?.size?.length > 0 && selectedSize === "") ||
                  (props?.item?.productWeight?.length > 0 &&
                    selectedWeight === "")
                }
                className="w-full !bg-primary !text-[13px] text-white py-2 rounded mt-2"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Confirm & Add to Cart"
                )}
              </Button>
            </div>
          )}

          <span className="discount p-1 flex items-center text-[12px] font-[500] absolute z-50 text-white rounded-lg !bg-primary top-[10px] left-[10px]">
            {props?.item?.discount}%
          </span>
          <div className="actions group-hover:top-[15px] transition-all duration-700 absolute top-[-200px] flex-col w-[50px] right-[5px] z-50 flex items-center gap-2">
            {console.log("Images:", props.item.images)}
            <Button
              onClick={() =>
                context.handleClickOpenProductDetailModal(true, {
                  ...props.item,
                })
              }
              className="!w-[35px] hover:!text-white text-black !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary"
            >
              <MdZoomOutMap className="text-[18px] hover:!text-white group-hover:text-white !text-black" />
            </Button>
            <Button
              onClick={() => handleAddToMyList(props?.item)}
              className={`!w-[35px] group hover:!text-white text-black 
             !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary`}
            >
              {isAddedInMyList === true ? (
                <IoMdHeart className="text-[18px] hover:!text-white group-hover:text-white !text-primary" />
              ) : (
                <FaRegHeart className="text-[18px] hover:!text-white group-hover:text-white !text-black" />
              )}
            </Button>
          </div>
        </div>

        <div className="info pb-[60px] h-[200px] relative p-3 py-4 bg-[#f1f1f1]">
          <h6 className="!text-[13px] !font-[400]">
            <Link
              to={`/product-details/${props?.item?._id}`}
              className="link transition-all"
            >
              {props?.item?.brand}
            </Link>
          </h6>
          <h3 className="text-[13px] lg:text-[15px] mb-1 mt-2 font-[500] title text-[black]">
            <Link
              to={`/product-details/${props?.item?._id}`}
              className="link transition-all"
            >
              {props?.item?.name.substring(0, 25) + "..."}
            </Link>
          </h3>
          <Rating
            name="size-small"
            defaultValue={props?.item?.rating}
            size="small"
            readOnly
          />

          <div className="flex items-center cursor-default text-[13px] lg:text-[15px] font-[500] gap-3">
            <span className="oldPrice line-through text-gray-500">
              &#x20b9;{props?.item?.oldPrice}
            </span>
            <span className="price !text-primary font-[700]">
              &#x20b9;{props?.item?.price}
            </span>
          </div>

          <div className="left-0 pl-3 mt-5 pr-3 w-full bottom-[25px] !absolute">
            {isAdded === false ? (
              <Button
                onClick={handleAddToCartClick} // Updated to handle overlay logic
                disabled={isLoading}
                className="btn-org btn-sml addtocartBtn justify-center w-full flex gap-2"
              >
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    <MdOutlineShoppingCart /> Add to cart
                  </>
                )}
              </Button>
            ) : (
              <div className="flex items-center overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)] justify-between">
                <Button
                  onClick={minusQty}
                  className="!rounded-none !bg-primary !min-w-[35px] !w-[35px] !h-[30px]"
                >
                  <FaMinus className="text-white" />
                </Button>
                <span>{quantity}</span>
                <Button
                  onClick={addQty}
                  className="!rounded-none !bg-primary !min-w-[35px] !w-[35px] !h-[30px]"
                >
                  <FaPlus className="text-white" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
