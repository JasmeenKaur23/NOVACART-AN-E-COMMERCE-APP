// import React, { useContext, useState, useEffect } from "react";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import QtyBox from "../QtyBox";
// import CircularProgress from "@mui/material/CircularProgress";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { FaRegHeart, FaMinus, FaPlus } from "react-icons/fa6";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { myContext } from "../../App";
// import { postData, deleteData, editData } from "../../utils/api";
// import { IoMdHeart } from "react-icons/io";

// const ProductDetailsComponent = (props) => {
//   const { item } = props;
//   const context = useContext(myContext);

//   const [quantity, setQuantity] = useState(1);
//   const [cartItem, setCartItem] = useState(null);
//   const [ramIndex, setRamIndex] = useState(null);
//   const [sizeIndex, setSizeIndex] = useState(null);
//   const [weightIndex, setWeightIndex] = useState(null);
//   const [selectedRam, setSelectedRam] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedWeight, setSelectedWeight] = useState("");
//   const [tabError, setTabError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAddedInMyList, setIsAddedInMyList] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);

//   const handleAddToMyList = (item) => {
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
//           context?.getMyListData();
//         } else {
//           context?.openAlertBox("error", res?.message);
//         }
//       });
//     }
//   };

//   // Sync MyList
//   useEffect(() => {
//     if (!context?.myListData || !item?._id) return;
//     const myListItem = context.myListData.find((listItem) => listItem.productId === item._id);
//     setIsAddedInMyList(!!myListItem);
//   }, [context?.myListData, item?._id]);

//   // Sync Cart
//   useEffect(() => {
//     if (!context?.cartData || !item?._id) return;

//     const matchingCartItem = context.cartData.find((cart) =>
//       cart.productId === item._id &&
//       cart.ram === selectedRam &&
//       cart.size === selectedSize &&
//       cart.weight === selectedWeight
//     );

//     if (matchingCartItem) {
//       setQuantity(matchingCartItem.quantity);
//       setCartItem(matchingCartItem);
//       setIsInCart(true);
//     } else {
//       setQuantity(1);
//       setCartItem(null);
//       setIsInCart(false);
//     }
//   }, [context?.cartData, item?._id, selectedRam, selectedSize, selectedWeight]);

//   const handleClickActiveTab = (type, index, name) => {
//     if (type === "ram") {
//       setRamIndex(index);
//       setSelectedRam(name);
//     }
//     if (type === "size") {
//       setSizeIndex(index);
//       setSelectedSize(name);
//     }
//     if (type === "weight") {
//       setWeightIndex(index);
//       setSelectedWeight(name);
//     }
//     setTabError(false);
//   };

//   const addToCart = async () => {
//     if (!context?.userData?._id) {
//       context?.openAlertBox("error", "Please login first");
//       return;
//     }

//     const needsRam = item?.productRam?.length > 0;
//     const needsSize = item?.size?.length > 0;
//     const needsWeight = item?.productWeight?.length > 0;

//     if (
//       (needsRam && selectedRam === "") ||
//       (needsSize && selectedSize === "") ||
//       (needsWeight && selectedWeight === "")
//     ) {
//       setTabError(true);
//       context?.openAlertBox("error", "Please select all required options");
//       return;
//     }

//     setIsLoading(true);

//     const productItem = {
//       _id: item?._id,
//       name: item?.name,
//       image: item?.images?.[0],
//       rating: item?.rating,
//       price: item?.price,
//       oldPrice: item?.oldPrice,
//       quantity,
//       subTotal: item?.price * quantity,
//       productId: item?._id,
//       countInStock: item?.countInStock,
//       userId: context?.userData?._id,
//       brand: item?.brand,
//       discount: item?.discount,
//       size: needsSize ? selectedSize : "",
//       ram: needsRam ? selectedRam : "",
//       weight: needsWeight ? selectedWeight : "",
//     };

//     try {
//       const res = await postData("/api/cart/add", productItem);

//       if (res?.error === false) {
//         context?.openAlertBox("success", res?.message || "Added to cart!");
//         context?.getCartItems();
//       } else {
//         if (res?.message?.toLowerCase().includes("already")) {
//           context?.openAlertBox("info", "Already in your cart");
//           context?.getCartItems();
//         } else {
//           context?.openAlertBox("error", res?.message);
//         }
//       }
//     } catch {
//       context?.openAlertBox("error", "Failed to add to cart");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addQty = () => {
//     const newQty = quantity + 1;
//     const obj = {
//       _id: cartItem._id,
//       qty: newQty,
//       subTotal: item.price * newQty,
//     };
//     editData("/api/cart/update-qty", obj).then(() => {
//       context.getCartItems();
//       setQuantity(newQty);
//     });
//   };

//   const minusQty = () => {
//     if (quantity === 1) {
//       deleteData(`/api/cart/delete-cart-item/${cartItem._id}`).then(() => {
//         context.getCartItems();
//         setIsInCart(false);
//         setQuantity(1);
//         setCartItem(null);
//       });
//       return;
//     }
//     const newQty = quantity - 1;
//     const obj = {
//       _id: cartItem._id,
//       qty: newQty,
//       subTotal: item.price * newQty,
//     };
//     editData("/api/cart/update-qty", obj).then(() => {
//       context.getCartItems();
//       setQuantity(newQty);
//     });
//   };

//   // Detect if in modal context (add conditional styling)
//   const isModal = props.isModal || false;

//   return (
//     <div className={`product-details-content ${isModal ? 'modal-content' : 'page-content'}`}>
//       {/* Title, Brand, Rating, Price, Description */}
//       <h1 className={`text-[20px] sm:text-[26px] font-[600] mb-3 ${isModal ? '!mt-0' : '!mt-[90px]'}`}>
//         {item?.name}
//       </h1>

//       <div className="flex items-start sm:items-center lg:items-center justify-start flex-col sm:flex-row md:flex-row lg:flex-row gap-3">
//         <span className="text-gray-500 text-[14px]">
//           Brand:{" "}
//           <span className="text-black font-[500] opacity-75">
//             {item?.brand}
//           </span>
//         </span>
//         <Rating value={Number(item?.rating) || 0} size="small" readOnly />
//         <span
//           onClick={props?.goToReviews}
//           className="cursor-pointer text-[13px]"
//         >
//           Review ({props?.reviewsCount})
//         </span>
//       </div>

//       <div className="flex mt-3 flex-col sm:flex-row md:flex-row lg:flex-row items-start lg:items-center text-[24px] font-[500] gap-3">
//         <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row text-[15px] font-[500] gap-3">
//           <div className="flex items-center gap-4">
//             <span className="line-through text-gray-500">
//               {Number(item?.oldPrice || 0).toLocaleString("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               })}
//             </span>
//             <span className="!text-primary font-[700]">
//               {Number(item?.price || 0).toLocaleString("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               })}
//             </span>
//           </div>{" "}
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-[14px] text-gray-600">
//             Available In Stock:{" "}
//             <span className="text-green-600 font-[700]">
//               {item?.countInStock}
//             </span>
//           </span>
//         </div>
//       </div>

//       <p className="mt-3 mb-3 pr-10 text-[15px]">
//         {item?.description || "No description available."}
//       </p>

//       {/* ====== RAM ====== */}
//       {item?.productRam?.length > 0 && (
//         <div className="flex items-center gap-3 mt-4">
//           <span className="text-[16px] font-medium">RAM:</span>
//           <div className="flex gap-2">
//             {item.productRam.map((ram, i) => (
//               <Button
//                 key={i}
//                 variant="outlined"
//                 className={`
//                   min-w-[60px] border-2
//                   ${
//                     ramIndex === i
//                       ? "bg-primary text-white border-primary"
//                       : "border-gray-300 text-gray-700"
//                   }
//                   ${
//                     tabError && selectedRam === ""
//                       ? "!border-red-500 !text-red-500 ring-2 ring-red-200"
//                       : ""
//                   }
//                 `}
//                 onClick={() => handleClickActiveTab("ram", i, ram)}
//               >
//                 {ram}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ====== SIZE ====== */}
//       {item?.size?.length > 0 && (
//         <div className="flex items-center gap-3 mt-4">
//           <span className="text-[16px] font-medium">Size:</span>
//           <div className="flex gap-2">
//             {item.size.map((s, i) => (
//               <Button
//                 key={i}
//                 variant="outlined"
//                 className={`
//                   min-w-[50px] border-2
//                   ${
//                     sizeIndex === i
//                       ? "bg-primary text-white border-primary"
//                       : "border-gray-300 text-gray-700"
//                   }
//                   ${
//                     tabError && selectedSize === ""
//                       ? "!border-red-500 !text-red-500 ring-2 ring-red-200"
//                       : ""
//                   }
//                 `}
//                 onClick={() => handleClickActiveTab("size", i, s)}
//               >
//                 {s}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ====== WEIGHT ====== */}
//       {item?.productWeight?.length > 0 && (
//         <div className="flex items-center gap-3 mt-4">
//           <span className="text-[16px] font-medium">Weight:</span>
//           <div className="flex gap-2">
//             {item.productWeight.map((w, i) => (
//               <Button
//                 key={i}
//                 variant="outlined"
//                 className={`
//                   min-w-[70px] border-2
//                   ${
//                     weightIndex === i
//                       ? "bg-primary text-white border-primary"
//                       : "border-gray-300 text-gray-700"
//                   }
//                   ${
//                     tabError && selectedWeight === ""
//                       ? "!border-red-500 !text-red-500 ring-2 ring-red-200"
//                       : ""
//                   }
//                 `}
//                 onClick={() => handleClickActiveTab("weight", i, w)}
//               >
//                 {w}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}

//       <p className="text-[14px] mt-3 mb-2">
//         Free Shipping (Est. Delivery Time 2–3 Days)
//       </p>

//       {/* ====== QUANTITY & ADD TO CART ====== */}
//       {isInCart ? (
//         <div className="flex items-center gap-2 mt-4">
//           <Button
//             onClick={minusQty}
//             className="!bg-primary !h-[40px] !min-w-[40px] !rounded-l-full"
//           >
//             <FaMinus className="text-white text-sm" />
//           </Button>
//           <span className="px-4 py-2 font-bold border-t border-b border-gray-300">
//             {quantity}
//           </span>
//           <Button
//             onClick={addQty}
//             className="!bg-primary !h-[40px] !min-w-[40px] !rounded-r-full"
//           >
//             <FaPlus className="text-white text-sm" />
//           </Button>
//           <Link to="/cart" className="ml-3 text-primary underline font-medium">
//             Go to Cart →
//           </Link>
//         </div>
//       ) : (
//         <div className="flex mt-4 gap-3 items-center">
//           <div className="w-[70px]">
//             <QtyBox handleSelectQty={setQuantity} />
//           </div>
//           <Button
//             onClick={addToCart}
//             disabled={isLoading}
//             className="btn-org !min-w-[180px] flex gap-2 items-center justify-center"
//           >
//             {isLoading ? (
//               <CircularProgress size={20} color="inherit" />
//             ) : (
//               <>
//                 <MdOutlineShoppingCart size={24} /> Add to Cart
//               </>
//             )}
//           </Button>
//         </div>
//       )}

//       {/* Wishlist & Compare */}
//       <div className="flex items-center mt-4 gap-6">
//         <span
//           onClick={() => handleAddToMyList(props?.item)}
//           className="flex items-center gap-2 font-[500] cursor-pointer text-[13px] lg:text-[16px]"
//         >
//           {isAddedInMyList === true ? (
//             <IoMdHeart className="text-[18px] !text-primary" />
//           ) : (
//             <FaRegHeart className="text-[18px] !text-primary" />
//           )}
//           Add To WishList{" "}
//         </span>

//       </div>

//       <style jsx>{`
//         .modal-content {
//           padding: 20px;
//           max-height: 80vh;
//           overflow-y: auto;
//           background: white;
//           border-radius: 8px;
//         }
//         .page-content {
//           padding: 0;
//           max-height: none;
//           overflow: visible;
//           background: transparent;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductDetailsComponent;

// import React, { useContext, useState, useEffect } from "react";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import QtyBox from "../QtyBox";
// import CircularProgress from "@mui/material/CircularProgress";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { FaRegHeart, FaMinus, FaPlus } from "react-icons/fa6";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { myContext } from "../../App";
// import { postData, deleteData, editData } from "../../utils/api";
// import { IoMdHeart } from "react-icons/io";
// import { MdClose } from "react-icons/md";

// const ProductDetailsComponent = (props) => {
//   const { item } = props;
//   const context = useContext(myContext);
//   const [quantity, setQuantity] = useState(1);
//   const [cartItem, setCartItem] = useState(null);
//   const [ramIndex, setRamIndex] = useState(null);
//   const [sizeIndex, setSizeIndex] = useState(null);
//   const [weightIndex, setWeightIndex] = useState(null);
//   const [selectedRam, setSelectedRam] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedWeight, setSelectedWeight] = useState("");
//   const [tabError, setTabError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAddedInMyList, setIsAddedInMyList] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [isShowTabs, setIsShowTabs] = useState(false);
// useEffect(() => {
//     if (!item) return;

//     const foundCartItem = context?.cartData?.find(
//       (cart) => cart.productId === item._id
//     );
//     if (foundCartItem) {
//       setQuantity(foundCartItem.quantity);
//       setCartItem(foundCartItem);
//       setIsAdded(true);
//     } else {
//       setQuantity(1);
//       setCartItem(null);
//       setIsAdded(false);
//     }

//     const foundMyListItem = context?.myListData?.find(
//       (myListItem) => myListItem.productId === item._id
//     );
//     setIsAddedInMyList(!!foundMyListItem);

//     // Reset variant selection when modal opens
//     setActiveTab(null);
//     setSelectedTabName(null);
//     setIsShowTabs(false);
//   }, [item, context.cartData, context.myListData]);
//   // Combined Sync for Cart & MyList
//   useEffect(() => {
//     if (!context?.myListData || !item?._id) return;
//     const myListItem = context.myListData.find((listItem) => listItem.productId === item._id);
//     setIsAddedInMyList(!!myListItem);
//   }, [context?.myListData, item?._id]);

//   useEffect(() => {
//     if (!context?.cartData || !item?._id) return;
//     const matchingCartItem = context.cartData.find((cart) =>
//       cart.productId === item._id &&
//       cart.ram === selectedRam &&
//       cart.size === selectedSize &&
//       cart.weight === selectedWeight
//     );
//     if (matchingCartItem) {
//       setQuantity(matchingCartItem.quantity);
//       setCartItem(matchingCartItem);
//       setIsInCart(true);
//     } else {
//       setQuantity(1);
//       setCartItem(null);
//       setIsInCart(false);
//     }
//   }, [context?.cartData, item?._id, selectedRam, selectedSize, selectedWeight]);

//   const handleAddToMyList = (item) => {
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
//           context?.getMyListData();
//         } else {
//           context?.openAlertBox("error", res?.message);
//         }
//       });
//     }
//   };

//   const handleClickActiveTab = (type, index, name) => {
//     if (type === "ram") {
//       setRamIndex(index);
//       setSelectedRam(name);
//     }
//     if (type === "size") {
//       setSizeIndex(index);
//       setSelectedSize(name);
//     }
//     if (type === "weight") {
//       setWeightIndex(index);
//       setSelectedWeight(name);
//     }
//     setTabError(false);
//   };

//   const addToCart = async () => {
//     if (!context?.userData?._id) {
//       context?.openAlertBox("error", "Please login first");
//       return;
//     }
//     const needsRam = item?.productRam?.length > 0;
//     const needsSize = item?.size?.length > 0;
//     const needsWeight = item?.productWeight?.length > 0;
//     if (
//       (needsRam && selectedRam === "") ||
//       (needsSize && selectedSize === "") ||
//       (needsWeight && selectedWeight === "")
//     ) {
//       setIsShowTabs(true);
//       setTabError(true);
//       context?.openAlertBox("error", "Please select all required options");
//       return;
//     }
//     setIsLoading(true);
//   const productItem = {
//   _id: item?._id,
//   productTitle: item?.name,  // <-- Change this line (was 'name')
//   image: item?.images?.[0],
//   rating: item?.rating,
//   price: item?.price,
//   oldPrice: item?.oldPrice,
//   quantity,
//   subTotal: item?.price * quantity,
//   productId: item?._id,
//   countInStock: item?.countInStock,
//   userId: context?.userData?._id,
//   brand: item?.brand,
//   discount: item?.discount,
//   size: needsSize ? selectedSize : "",
//   ram: needsRam ? selectedRam : "",
//   weight: needsWeight ? selectedWeight : "",
// };
//     try {
//       const res = await postData("/api/cart/add", productItem);
//       if (res?.error === false) {
//         context?.openAlertBox("success", res?.message || "Added to cart!");
//         context?.getCartItems();
//         setIsShowTabs(false);
//       } else {
//         if (res?.message?.toLowerCase().includes("already")) {
//           context?.openAlertBox("info", "Already in your cart");
//           context?.getCartItems();
//         } else {
//           context?.openAlertBox("error", res?.message);
//         }
//       }
//     } catch {
//       context?.openAlertBox("error", "Failed to add to cart");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addQty = () => {
//     const newQty = quantity + 1;
//     const obj = {
//       _id: cartItem._id,
//       qty: newQty,
//       subTotal: item.price * newQty,
//     };
//     editData("/api/cart/update-qty", obj).then(() => {
//       context.getCartItems();
//       setQuantity(newQty);
//     });
//   };

//   const minusQty = () => {
//     if (quantity === 1) {
//       deleteData(`/api/cart/delete-cart-item/${cartItem._id}`).then(() => {
//         context.getCartItems();
//         setIsInCart(false);
//         setQuantity(1);
//         setCartItem(null);
//       });
//       return;
//     }
//     const newQty = quantity - 1;
//     const obj = {
//       _id: cartItem._id,
//       qty: newQty,
//       subTotal: item.price * newQty,
//     };
//     editData("/api/cart/update-qty", obj).then(() => {
//       context.getCartItems();
//       setQuantity(newQty);
//     });
//   };

//   // Detect if in modal context (add conditional styling)
//   const isModal = props.isModal || false;

//   return (
//     <div className={`product-details-content relative ${isModal ? 'modal-content' : 'page-content'}`}>
//       {/* Title, Brand, Rating, Price, Description */}
//       <h1 className={`text-[20px] sm:text-[26px] font-[600] mb-3 ${isModal ? '!mt-0' : '!mt-[90px]'}`}>
//         {item?.name}
//       </h1>
//       <div className="flex items-start sm:items-center lg:items-center justify-start flex-col sm:flex-row md:flex-row lg:flex-row gap-3">
//         <span className="text-gray-500 text-[14px]">
//           Brand:{" "}
//           <span className="text-black font-[500] opacity-75">
//             {item?.brand}
//           </span>
//         </span>
//         <Rating value={Number(item?.rating) || 0} size="small" readOnly />
//         <span
//           onClick={props?.goToReviews}
//           className="cursor-pointer text-[13px]"
//         >
//           Review ({props?.reviewsCount})
//         </span>
//       </div>
//       <div className="flex mt-3 flex-col sm:flex-row md:flex-row lg:flex-row items-start lg:items-center text-[24px] font-[500] gap-3">
//         <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row text-[15px] font-[500] gap-3">
//           <div className="flex items-center gap-4">
//             <span className="line-through text-gray-500">
//               {Number(item?.oldPrice || 0).toLocaleString("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               })}
//             </span>
//             <span className="!text-primary font-[700]">
//               {Number(item?.price || 0).toLocaleString("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               })}
//             </span>
//           </div>{" "}
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-[14px] text-gray-600">
//             Available In Stock:{" "}
//             <span className="text-green-600 font-[700]">
//               {item?.countInStock}
//             </span>
//           </span>
//         </div>
//       </div>
//       <p className="mt-3 mb-3 pr-10 text-[15px]">
//         {item?.description || "No description available."}
//       </p>
//       <p className="text-[14px] mt-3 mb-2">
//         Free Shipping (Est. Delivery Time 2–3 Days)
//       </p>
//       {/* ====== QUANTITY & ADD TO CART ====== */}
//       {isInCart ? (
//         <div className="flex items-center gap-2 mt-4">
//           <Button
//             onClick={minusQty}
//             className="!bg-primary !h-[40px] !min-w-[40px] !rounded-l-full"
//           >
//             <FaMinus className="text-white text-sm" />
//           </Button>
//           <span className="px-4 py-2 font-bold border-t border-b border-gray-300">
//             {quantity}
//           </span>
//           <Button
//             onClick={addQty}
//             className="!bg-primary !h-[40px] !min-w-[40px] !rounded-r-full"
//           >
//             <FaPlus className="text-white text-sm" />
//           </Button>
//           <Link to="/cart" className="ml-3 text-primary underline font-medium">
//             Go to Cart →
//           </Link>
//         </div>
//       ) : (
//         <div className="flex mt-4 gap-3 items-center">
//           <div className="w-[70px]">
//             <QtyBox handleSelectQty={setQuantity} />
//           </div>
//           <Button
//             onClick={addToCart}
//             disabled={isLoading}
//             className="btn-org !min-w-[180px] flex gap-2 items-center justify-center"
//           >
//             {isLoading ? (
//               <CircularProgress size={20} color="inherit" />
//             ) : (
//               <>
//                 <MdOutlineShoppingCart size={24} /> Add to Cart
//               </>
//             )}
//           </Button>
//         </div>
//       )}
//       {/* Wishlist & Compare */}
//       <div className="flex items-center mt-4 gap-6">
//         <span
//           onClick={() => handleAddToMyList(props?.item)}
//           className="flex items-center gap-2 font-[500] cursor-pointer text-[13px] lg:text-[16px]"
//         >
//           {isAddedInMyList === true ? (
//             <IoMdHeart className="text-[18px] !text-primary" />
//           ) : (
//             <FaRegHeart className="text-[18px] !text-primary" />
//           )}
//           Add To WishList{" "}
//         </span>
//       </div>

//       {/* ====== VARIANT OVERLAY ====== */}
//       {isShowTabs && (
//         <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-[999] flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative">
//             <Button
//               onClick={() => setIsShowTabs(false)}
//               className="!absolute !top-2 !right-2 !min-w-[30px] !h-[30px] !text-black !bg-white !rounded-full"
//             >
//               <MdClose className="text-[20px]" />
//             </Button>
//             <h3 className="text-lg font-semibold mb-4 text-center">Select Options</h3>
//             {/* ====== RAM ====== */}
//             {item?.productRam?.length > 0 && (
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-[16px] font-medium min-w-[40px]">RAM:</span>
//                 <div className="flex gap-2 flex-wrap">
//                   {item.productRam.map((ram, i) => (
//                     <span
//                       key={i}
//                       className={`
//                         px-3 py-2 border-2 rounded cursor-pointer min-w-[60px] text-center
//                         ${
//                           ramIndex === i
//                             ? "bg-primary text-white border-primary"
//                             : "border-gray-300 text-gray-700 hover:border-primary"
//                         }
//                         ${
//                           tabError && selectedRam === ""
//                             ? "!border-red-500 !text-red-500"
//                             : ""
//                         }
//                       `}
//                       onClick={() => handleClickActiveTab("ram", i, ram)}
//                     >
//                       {ram}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* ====== SIZE ====== */}
//             {item?.size?.length > 0 && (
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-[16px] font-medium min-w-[40px]">Size:</span>
//                 <div className="flex gap-2 flex-wrap">
//                   {item.size.map((s, i) => (
//                     <span
//                       key={i}
//                       className={`
//                         px-3 py-2 border-2 rounded cursor-pointer min-w-[50px] text-center
//                         ${
//                           sizeIndex === i
//                             ? "bg-primary text-white border-primary"
//                             : "border-gray-300 text-gray-700 hover:border-primary"
//                         }
//                         ${
//                           tabError && selectedSize === ""
//                             ? "!border-red-500 !text-red-500"
//                             : ""
//                         }
//                       `}
//                       onClick={() => handleClickActiveTab("size", i, s)}
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* ====== WEIGHT ====== */}
//             {item?.productWeight?.length > 0 && (
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-[16px] font-medium min-w-[50px]">Weight:</span>
//                 <div className="flex gap-2 flex-wrap">
//                   {item.productWeight.map((w, i) => (
//                     <span
//                       key={i}
//                       className={`
//                         px-3 py-2 border-2 rounded cursor-pointer min-w-[70px] text-center
//                         ${
//                           weightIndex === i
//                             ? "bg-primary text-white border-primary"
//                             : "border-gray-300 text-gray-700 hover:border-primary"
//                         }
//                         ${
//                           tabError && selectedWeight === ""
//                             ? "!border-red-500 !text-red-500"
//                             : ""
//                         }
//                       `}
//                       onClick={() => handleClickActiveTab("weight", i, w)}
//                     >
//                       {w}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {tabError && (
//               <p className="text-red-500 text-sm text-center mb-4">Please select all required options</p>
//             )}
//             <Button
//               onClick={() => {
//                 setIsShowTabs(false);
//                 addToCart();
//               }}
//               className="w-full bg-primary text-white py-2 rounded"
//               disabled={isLoading || (item?.productRam?.length > 0 && selectedRam === "") || (item?.size?.length > 0 && selectedSize === "") || (item?.productWeight?.length > 0 && selectedWeight === "")}
//             >
//               {isLoading ? <CircularProgress size={20} color="inherit" /> : "Confirm & Add to Cart"}
//             </Button>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .modal-content {
//           padding: 20px;
//           max-height: 80vh;
//           overflow-y: auto;
//           background: white;
//           border-radius: 8px;
//         }
//         .page-content {
//           padding: 0;
//           max-height: none;
//           overflow: visible;
//           background: transparent;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductDetailsComponent;
import React, { useContext, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import QtyBox from "../QtyBox";
import CircularProgress from "@mui/material/CircularProgress";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { myContext } from "../../App";
import { postData, deleteData, editData } from "../../utils/api";
import { IoMdHeart } from "react-icons/io";
import { MdClose } from "react-icons/md";

const ProductDetailsComponent = ({
  item,
  isModal = false,
  goToReviews,
  reviewsCount,
}) => {
  const context = useContext(myContext);

  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isAddedInMyList, setIsAddedInMyList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [tabError, setTabError] = useState(false);

  // Variant states
  const [ramIndex, setRamIndex] = useState(null);
  const [sizeIndex, setSizeIndex] = useState(null);
  const [weightIndex, setWeightIndex] = useState(null);
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");

  const hasVariants =
    item?.size?.length > 0 ||
    item?.productRam?.length > 0 ||
    item?.productWeight?.length > 0;

  // Reset everything when item changes (modal/page load)
  useEffect(() => {
    if (!item?._id) return;

    setQuantity(1);
    setIsInCart(false);
    setCartItem(null);
    setSelectedRam("");
    setSelectedSize("");
    setSelectedWeight("");
    setRamIndex(null);
    setSizeIndex(null);
    setWeightIndex(null);
    setIsShowTabs(false);
    setTabError(false);

    // Sync Wishlist
    const inWishlist = context?.myListData?.some(
      (w) => w.productId === item._id
    );
    setIsAddedInMyList(!!inWishlist);
  }, [item, context?.myListData]);

  // CART SYNC: Loose match by productId only (same as List/Grid)
  useEffect(() => {
    if (!context?.cartData || !item?._id) return;

    const found = context.cartData.find((cart) => cart.productId === item._id);

    if (found) {
      setQuantity(found.quantity);
      setCartItem(found);
      setIsInCart(true);

      // Pre-fill selected variant from cart
      if (found.ram) {
        setSelectedRam(found.ram);
        setRamIndex(item.productRam?.indexOf(found.ram));
      }
      if (found.size) {
        setSelectedSize(found.size);
        setSizeIndex(item.size?.indexOf(found.size));
      }
      if (found.weight) {
        setSelectedWeight(found.weight);
        setWeightIndex(item.productWeight?.indexOf(found.weight));
      }
    } else {
      setIsInCart(false);
      setQuantity(1);
      setCartItem(null);
    }
  }, [context?.cartData, item]);

  const handleClickActiveTab = (type, index, value) => {
    if (type === "ram") {
      setRamIndex(index);
      setSelectedRam(value);
    }
    if (type === "size") {
      setSizeIndex(index);
      setSelectedSize(value);
    }
    if (type === "weight") {
      setWeightIndex(index);
      setSelectedWeight(value);
    }
    setTabError(false);
  };

  const addToCart = async () => {
    if (!context?.userData?._id) {
      context.openAlertBox("error", "Please login first");
      return;
    }

    const needsRam = item?.productRam?.length > 0;
    const needsSize = item?.size?.length > 0;
    const needsWeight = item?.productWeight?.length > 0;

    if (
      (needsRam && !selectedRam) ||
      (needsSize && !selectedSize) ||
      (needsWeight && !selectedWeight)
    ) {
      setIsShowTabs(true);
      setTabError(true);
      context.openAlertBox("error", "Please select all required options");
      return;
    }

    setIsLoading(true);

    const productItem = {
      productId: item._id,
      productTitle: item.name,
      image: item.images?.[0],
      rating: item.rating || 0,
      price: Number(item.price),
      oldPrice: Number(item.oldPrice || 0),
      quantity: 1,
      subTotal: Number(item.price),
      countInStock: item.countInStock,
      userId: context.userData._id,
      brand: item.brand,
      discount: item.discount || 0,
      ram: selectedRam,
      size: selectedSize,
      weight: selectedWeight,
    };

    try {
      const res = await postData("/api/cart/add", productItem);
      if (res?.error === false) {
        context.openAlertBox("success", res.message || "Added to cart!");
        setTimeout(() => context.getCartItems(), 500);
        setIsShowTabs(false);
      } else {
        context.openAlertBox("error", res?.message || "Failed to add");
      }
    } catch {
      context.openAlertBox("error", "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const addQty = () => {
    if (!cartItem) return;
    const newQty = quantity + 1;
    if (newQty > item.countInStock) {
      context.openAlertBox("error", `Only ${item.countInStock} left in stock!`);
      return;
    }
    editData("/api/cart/update-qty", {
      _id: cartItem._id,
      qty: newQty,
      subTotal: item.price * newQty,
    }).then(() => {
      context.getCartItems();
      setQuantity(newQty);
    });
  };

  const minusQty = () => {
    if (quantity <= 1) {
      deleteData(`/api/cart/delete-cart-item/${cartItem._id}`).then(() => {
        context.getCartItems();
        setIsInCart(false);
        setQuantity(1);
      });
      return;
    }
    const newQty = quantity - 1;
    editData("/api/cart/update-qty", {
      _id: cartItem._id,
      qty: newQty,
      subTotal: item.price * newQty,
    }).then(() => {
      context.getCartItems();
      setQuantity(newQty);
    });
  };

  const handleWishlist = () => {
    if (!context?.userData)
      return context.openAlertBox("error", "Please login first");

    const obj = {
      productId: item._id,
      userId: context.userData._id,
      productTitle: item.name,
      image: item.images?.[0],
      rating: item.rating,
      price: item.price,
      oldPrice: item.oldPrice,
      brand: item.brand,
      discount: item.discount,
    };

    postData("/api/myList/add", obj).then((res) => {
      if (res?.error === false) {
        context.openAlertBox("success", res.message);
        setIsAddedInMyList(true);
        context.getMyListData();
      }
    });
  };

  const handleAddClick = () =>
    hasVariants ? setIsShowTabs(true) : addToCart();

  return (
    <div
      className={`product-details-content ${
        isModal ? "modal-content" : "page-content"
      } relative`}
    >
      <h1
        className={`text-[30px] sm:text-4xl font-bold mb-4 ${
          isModal ? "" : "mt-0"
        }`}
      >
        {item?.name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <span>
          Brand: <strong className="text-black">{item?.brand}</strong>
        </span>
        <Rating value={item?.rating || 0} readOnly size="small" />
        <span onClick={goToReviews} className="cursor-pointer underline">
          Reviews ({reviewsCount})
        </span>
      </div>

      <div className="mt-4 flex items-center gap-6 text-2xl font-bold">
        <span className="line-through text-gray-500">₹{item?.oldPrice}</span>
        <span className="!text-primary">₹{item?.price}</span>
      </div>

      <p className="mt-4 text-gray-700">
        {item?.description || "No description available."}
      </p>

      {/* Variant Overlay */}
      {isShowTabs && (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <Button
              onClick={() => setIsShowTabs(false)}
              className="!absolute top-4 right-4 !bg-gray-200 !p-2"
            >
              <MdClose className="text-2xl" />
            </Button>

            <h3 className="text-2xl font-bold text-center mb-6">
              Select Variant
            </h3>

            {item.productRam?.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-3">RAM:</p>
                <div className="flex gap-3 flex-wrap">
                  {item.productRam.map((ram, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickActiveTab("ram", i, ram)}
                      className={`px-6 py-3 rounded-lg font-medium transition ${
                        ramIndex === i ? "bg-primary text-white" : "bg-gray-100"
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item.size?.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-3">Size:</p>
                <div className="flex gap-3 flex-wrap">
                  {item.size.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickActiveTab("size", i, s)}
                      className={`px-6 py-3 rounded-lg font-medium transition ${
                        sizeIndex === i
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item.productWeight?.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-3">Weight:</p>
                <div className="flex gap-3 flex-wrap">
                  {item.productWeight.map((w, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickActiveTab("weight", i, w)}
                      className={`px-6 py-3 rounded-lg font-medium transition ${
                        weightIndex === i
                          ? "!bg-primary text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tabError && (
              <p className="text-red-500 text-center font-medium">
                Please select all options
              </p>
            )}

            <Button
              onClick={() => {
                setIsShowTabs(false);
                addToCart();
              }}
              disabled={isLoading}
              className="w-full !bg-primary !text-white !py-4 !text-lg !rounded-xl mt-4"
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirm & Add to Cart"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="mt-8 flex items-center gap-4">
        {isInCart ? (
          <div className="flex items-center border-2 !border-primary rounded-full overflow-hidden">
            <Button
              onClick={minusQty}
              className="!bg-primary !text-white !h-16 !min-w-16"
            >
              <FaMinus />
            </Button>
            <span className="px-8 py-3 font-bold text-xl">{quantity}</span>
            <Button
              onClick={addQty}
              className="!bg-primary !text-white !h-16 !min-w-16"
            >
              <FaPlus />
            </Button>
          </div>
        ) : (
          <>
            <QtyBox handleSelectQty={setQuantity} value={quantity} />
            <Button
              onClick={handleAddClick}
              disabled={isLoading}
              className="btn-org !py-4 !px-10 !text-lg flex items-center gap-3"
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <MdOutlineShoppingCart size={28} />
              )}
              Add to Cart
            </Button>
          </>
        )}
      </div>

      {/* Wishlist */}
      <div className="mt-6">
        <span
          onClick={handleWishlist}
          className="flex items-center gap-2 cursor-pointer font-medium text-lg"
        >
          {isAddedInMyList ? (
            <IoMdHeart className="!text-primary text-2xl" />
          ) : (
            <FaRegHeart className="text-2xl" />
          )}
          Add to Wishlist
        </span>
      </div>

      <style jsx>{`
        .modal-content {
          padding: 20px;
          max-height: 85vh;
          overflow-y: auto;
          background: white;
          border-radius: 12px;
        }
        .page-content {
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsComponent;
// import React, { useContext, useState, useEffect } from "react";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import QtyBox from "../QtyBox";
// import CircularProgress from "@mui/material/CircularProgress";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { FaRegHeart, FaMinus, FaPlus } from "react-icons/fa6";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { myContext } from "../../App";
// import { postData, deleteData, editData } from "../../utils/api";
// import { IoMdHeart } from "react-icons/io";
// import { MdClose } from "react-icons/md";

// const ProductDetailsComponent = (props) => {
//   const { item } = props;
//   const context = useContext(myContext);
//   const [quantity, setQuantity] = useState(1);
//   const [cartItem, setCartItem] = useState(null);
//   const [ramIndex, setRamIndex] = useState(null);
//   const [sizeIndex, setSizeIndex] = useState(null);
//   const [weightIndex, setWeightIndex] = useState(null);
//   const [selectedRam, setSelectedRam] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedWeight, setSelectedWeight] = useState("");
//   const [tabError, setTabError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAddedInMyList, setIsAddedInMyList] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [isShowTabs, setIsShowTabs] = useState(false);

//   // Initial load/reset and MyList sync
//   useEffect(() => {
//     if (!item) return;

//     // Reset variant selection when item changes (e.g., modal opens or page loads)
//     setRamIndex(null);
//     setSizeIndex(null);
//     setWeightIndex(null);
//     setSelectedRam("");
//     setSelectedSize("");
//     setSelectedWeight("");
//     setIsShowTabs(false);

//     // Sync MyList (no variants, just productId)
//     if (context?.myListData && item?._id) {
//       const foundMyListItem = context.myListData.find(
//         (myListItem) => myListItem.productId === item._id
//       );
//       setIsAddedInMyList(!!foundMyListItem);
//     }
//   }, [item, context?.myListData]);

//   // Cart sync (variant-aware to handle selections accurately)
//   useEffect(() => {
//     if (!context?.cartData || !item?._id) return;

//     const matchingCartItem = context.cartData.find((cart) =>
//       cart.productId === item._id &&
//       cart.ram === selectedRam &&
//       cart.size === selectedSize &&
//       cart.weight === selectedWeight
//     );

//     if (matchingCartItem) {
//       setQuantity(matchingCartItem.quantity);
//       setCartItem(matchingCartItem);
//       setIsInCart(true);
//     } else {
//       setQuantity(1);
//       setCartItem(null);
//       setIsInCart(false);
//     }
//   }, [context?.cartData, item?._id, selectedRam, selectedSize, selectedWeight]);

//   const handleAddToMyList = (item) => {
//     if (context?.userData === null) {
//       context?.openAlertBox("error", "Please login first ");
//       return false;
//     }

//     const obj = {
//       productId: item?._id,
//       userId: context?.userData?._id,
//       productTitle: item?.name,
//       image: item?.images[0],
//       rating: item?.rating,
//       price: item?.price,
//       oldPrice: item?.oldPrice,
//       brand: item?.brand,
//       discount: item?.discount,
//     };

//     postData(`/api/myList/add`, obj).then((res) => {
//       if (res?.error === false) {
//         context?.openAlertBox("success", res?.message);
//         setIsAddedInMyList(true); // Immediate local update to match list view
//         context?.getMyListData(); // Trigger global sync
//       } else {
//         context?.openAlertBox("error", res?.message);
//       }
//     });
//   };

//   const handleClickActiveTab = (type, index, name) => {
//     if (type === "ram") {
//       setRamIndex(index);
//       setSelectedRam(name);
//     }
//     if (type === "size") {
//       setSizeIndex(index);
//       setSelectedSize(name);
//     }
//     if (type === "weight") {
//       setWeightIndex(index);
//       setSelectedWeight(name);
//     }
//     setTabError(false);
//   };

//   const addToCart = async () => {
//     if (!context?.userData?._id) {
//       context?.openAlertBox("error", "Please login first");
//       return;
//     }

//     const needsRam = item?.productRam?.length > 0;
//     const needsSize = item?.size?.length > 0;
//     const needsWeight = item?.productWeight?.length > 0;

//     if (
//       (needsRam && selectedRam === "") ||
//       (needsSize && selectedSize === "") ||
//       (needsWeight && selectedWeight === "")
//     ) {
//       setIsShowTabs(true);
//       setTabError(true);
//       context?.openAlertBox("error", "Please select all required options");
//       return;
//     }

//     setIsLoading(true);

//     const productItem = {
//       _id: item?._id,
//       productTitle: item?.name,
//       image: item?.images?.[0],
//       rating: item?.rating,
//       price: item?.price,
//       oldPrice: item?.oldPrice,
//       quantity,
//       subTotal: item?.price * quantity,
//       productId: item?._id,
//       countInStock: item?.countInStock,
//       userId: context?.userData?._id,
//       brand: item?.brand,
//       discount: item?.discount,
//       size: needsSize ? selectedSize : "",
//       ram: needsRam ? selectedRam : "",
//       weight: needsWeight ? selectedWeight : "",
//     };

//     try {
//       const res = await postData("/api/cart/add", productItem);
//       if (res?.error === false) {
//         context?.openAlertBox("success", res?.message || "Added to cart!");
//         context?.getCartItems(); // Trigger global sync (useEffect will update local state)
//         setIsShowTabs(false);
//       } else {
//         if (res?.message?.toLowerCase().includes("already")) {
//           context?.openAlertBox("info", "Already in your cart");
//           context?.getCartItems();
//         } else {
//           context?.openAlertBox("error", res?.message);
//         }
//       }
//     } catch {
//       context?.openAlertBox("error", "Failed to add to cart");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addQty = () => {
//     const newQty = quantity + 1;
//     const obj = {
//       _id: cartItem._id,
//       qty: newQty,
//       subTotal: item.price * newQty,
//     };
//     editData("/api/cart/update-qty", obj).then(() => {
//       context.getCartItems();
//       setQuantity(newQty);
//     });
//   };

//   const minusQty = () => {
//     if (quantity === 1) {
//       deleteData(`/api/cart/delete-cart-item/${cartItem._id}`).then(() => {
//         context.getCartItems();
//         setIsInCart(false);
//         setQuantity(1);
//         setCartItem(null);
//       });
//       return;
//     }
//     const newQty = quantity - 1;
//     const obj = {
//       _id: cartItem._id,
//       qty: newQty,
//       subTotal: item.price * newQty,
//     };
//     editData("/api/cart/update-qty", obj).then(() => {
//       context.getCartItems();
//       setQuantity(newQty);
//     });
//   };

//   // Detect if in modal context (add conditional styling)
//   const isModal = props.isModal || false;

//   return (
//     <div className={`product-details-content relative ${isModal ? 'modal-content' : 'page-content'}`}>
//       {/* Title, Brand, Rating, Price, Description */}
//       <h1 className={`text-[20px] sm:text-[26px] font-[600] mb-3 ${isModal ? '!mt-0' : '!mt-[90px]'}`}>
//         {item?.name}
//       </h1>
//       <div className="flex items-start sm:items-center lg:items-center justify-start flex-col sm:flex-row md:flex-row lg:flex-row gap-3">
//         <span className="text-gray-500 text-[14px]">
//           Brand:{" "}
//           <span className="text-black font-[500] opacity-75">
//             {item?.brand}
//           </span>
//         </span>
//         <Rating value={Number(item?.rating) || 0} size="small" readOnly />
//         <span
//           onClick={props?.goToReviews}
//           className="cursor-pointer text-[13px]"
//         >
//           Review ({props?.reviewsCount})
//         </span>
//       </div>
//       <div className="flex mt-3 flex-col sm:flex-row md:flex-row lg:flex-row items-start lg:items-center text-[24px] font-[500] gap-3">
//         <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row text-[15px] font-[500] gap-3">
//           <div className="flex items-center gap-4">
//             <span className="line-through text-gray-500">
//               {Number(item?.oldPrice || 0).toLocaleString("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               })}
//             </span>
//             <span className="!text-primary font-[700]">
//               {Number(item?.price || 0).toLocaleString("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               })}
//             </span>
//           </div>{" "}
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-[14px] text-gray-600">
//             Available In Stock:{" "}
//             <span className="text-green-600 font-[700]">
//               {item?.countInStock}
//             </span>
//           </span>
//         </div>
//       </div>
//       <p className="mt-3 mb-3 pr-10 text-[15px]">
//         {item?.description || "No description available."}
//       </p>
//       <p className="text-[14px] mt-3 mb-2">
//         Free Shipping (Est. Delivery Time 2–3 Days)
//       </p>
//       {/* ====== QUANTITY & ADD TO CART ====== */}
//       {isInCart ? (
//         <div className="flex items-center gap-2 mt-4">
//           <Button
//             onClick={minusQty}
//             className="!bg-primary !h-[40px] !min-w-[40px] !rounded-l-full"
//           >
//             <FaMinus className="text-white text-sm" />
//           </Button>
//           <span className="px-4 py-2 font-bold border-t border-b border-gray-300">
//             {quantity}
//           </span>
//           <Button
//             onClick={addQty}
//             className="!bg-primary !h-[40px] !min-w-[40px] !rounded-r-full"
//           >
//             <FaPlus className="text-white text-sm" />
//           </Button>
//           <Link to="/cart" className="ml-3 text-primary underline font-medium">
//             Go to Cart →
//           </Link>
//         </div>
//       ) : (
//         <div className="flex mt-4 gap-3 items-center">
//           <div className="w-[70px]">
//             <QtyBox handleSelectQty={setQuantity} />
//           </div>
//           <Button
//             onClick={addToCart}
//             disabled={isLoading}
//             className="btn-org !min-w-[180px] flex gap-2 items-center justify-center"
//           >
//             {isLoading ? (
//               <CircularProgress size={20} color="inherit" />
//             ) : (
//               <>
//                 <MdOutlineShoppingCart size={24} /> Add to Cart
//               </>
//             )}
//           </Button>
//         </div>
//       )}
//       {/* Wishlist & Compare */}
//       <div className="flex items-center mt-4 gap-6">
//         <span
//           onClick={() => handleAddToMyList(item)}
//           className="flex items-center gap-2 font-[500] cursor-pointer text-[13px] lg:text-[16px]"
//         >
//           {isAddedInMyList === true ? (
//             <IoMdHeart className="text-[18px] !text-primary" />
//           ) : (
//             <FaRegHeart className="text-[18px] !text-primary" />
//           )}
//           Add To WishList{" "}
//         </span>
//       </div>

//       {/* ====== VARIANT OVERLAY ====== */}
//       {isShowTabs && (
//         <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-[999] flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative">
//             <Button
//               onClick={() => setIsShowTabs(false)}
//               className="!absolute !top-2 !right-2 !min-w-[30px] !h-[30px] !text-black !bg-white !rounded-full"
//             >
//               <MdClose className="text-[20px]" />
//             </Button>
//             <h3 className="text-lg font-semibold mb-4 text-center">Select Options</h3>
//             {/* ====== RAM ====== */}
//             {item?.productRam?.length > 0 && (
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-[16px] font-medium min-w-[40px]">RAM:</span>
//                 <div className="flex gap-2 flex-wrap">
//                   {item.productRam.map((ram, i) => (
//                     <span
//                       key={i}
//                       className={`
//                         px-3 py-2 border-2 rounded cursor-pointer min-w-[60px] text-center
//                         ${
//                           ramIndex === i
//                             ? "bg-primary text-white border-primary"
//                             : "border-gray-300 text-gray-700 hover:border-primary"
//                         }
//                         ${
//                           tabError && selectedRam === ""
//                             ? "!border-red-500 !text-red-500"
//                             : ""
//                         }
//                       `}
//                       onClick={() => handleClickActiveTab("ram", i, ram)}
//                     >
//                       {ram}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* ====== SIZE ====== */}
//             {item?.size?.length > 0 && (
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-[16px] font-medium min-w-[40px]">Size:</span>
//                 <div className="flex gap-2 flex-wrap">
//                   {item.size.map((s, i) => (
//                     <span
//                       key={i}
//                       className={`
//                         px-3 py-2 border-2 rounded cursor-pointer min-w-[50px] text-center
//                         ${
//                           sizeIndex === i
//                             ? "bg-primary text-white border-primary"
//                             : "border-gray-300 text-gray-700 hover:border-primary"
//                         }
//                         ${
//                           tabError && selectedSize === ""
//                             ? "!border-red-500 !text-red-500"
//                             : ""
//                         }
//                       `}
//                       onClick={() => handleClickActiveTab("size", i, s)}
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* ====== WEIGHT ====== */}
//             {item?.productWeight?.length > 0 && (
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-[16px] font-medium min-w-[50px]">Weight:</span>
//                 <div className="flex gap-2 flex-wrap">
//                   {item.productWeight.map((w, i) => (
//                     <span
//                       key={i}
//                       className={`
//                         px-3 py-2 border-2 rounded cursor-pointer min-w-[70px] text-center
//                         ${
//                           weightIndex === i
//                             ? "bg-primary text-white border-primary"
//                             : "border-gray-300 text-gray-700 hover:border-primary"
//                         }
//                         ${
//                           tabError && selectedWeight === ""
//                             ? "!border-red-500 !text-red-500"
//                             : ""
//                         }
//                       `}
//                       onClick={() => handleClickActiveTab("weight", i, w)}
//                     >
//                       {w}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {tabError && (
//               <p className="text-red-500 text-sm text-center mb-4">Please select all required options</p>
//             )}
//             <Button
//               onClick={() => {
//                 setIsShowTabs(false);
//                 addToCart();
//               }}
//               className="w-full bg-primary text-white py-2 rounded"
//               disabled={isLoading || (item?.productRam?.length > 0 && selectedRam === "") || (item?.size?.length > 0 && selectedSize === "") || (item?.productWeight?.length > 0 && selectedWeight === "")}
//             >
//               {isLoading ? <CircularProgress size={20} color="inherit" /> : "Confirm & Add to Cart"}
//             </Button>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .modal-content {
//           padding: 20px;
//           max-height: 80vh;
//           overflow-y: auto;
//           background: white;
//           border-radius: 8px;
//         }
//         .page-content {
//           padding: 0;
//           max-height: none;
//           overflow: visible;
//           background: transparent;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductDetailsComponent;
