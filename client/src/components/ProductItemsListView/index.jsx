

// // import React, { useContext, useEffect, useState } from "react";
// // import "../ProductItems/style.css";
// // import { Link } from "react-router-dom";
// // import Rating from "@mui/material/Rating";
// // import Button from "@mui/material/Button";
// // import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6";
// // import { IoGitCompareOutline } from "react-icons/io5";
// // import { MdZoomOutMap } from "react-icons/md";
// // import { MdOutlineShoppingCart } from "react-icons/md";
// // import { myContext } from "../../App";

// // const ProductItemListView = (props) => {
// //   const context = useContext(myContext);
// //   const item = item;

// //   const [quantity, setQuantity] = useState(1);
// //   const [isAdded, setIsAdded] = useState(false);
// //   const [cartItem, setCartItem] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   useEffect(() => {
// //     if (!context?.cartData || !item?._id) return;

// //     const foundItem = context.cartData.find(
// //       (cart) => cart.productId === item._id
// //     );

// //     if (foundItem) {
// //       setQuantity(foundItem.quantity);
// //       setCartItem(foundItem);
// //       setIsAdded(true);
// //     } else {
// //       setQuantity(1);
// //       setCartItem(null);
// //       setIsAdded(false);
// //     }
// //   }, [context.cartData, item?._id]);
// //   const addQty = () => {
// //     const newQty = quantity + 1;
// //     setQuantity(newQty);

// //     const obj = {
// //       _id: cartItem._id,
// //       qty: newQty,
// //       subTotal: item.price * newQty,
// //     };

// //     context.editCart(obj); // OR use editData directly
// //   };

// //   const minusQty = () => {
// //     if (quantity === 1) {
// //       context.removeCartItem(cartItem._id);
// //       return;
// //     }

// //     const newQty = quantity - 1;
// //     setQuantity(newQty);

// //     const obj = {
// //       _id: cartItem._id,
// //       qty: newQty,
// //       subTotal: item.price * newQty,
// //     };

// //     context.editCart(obj);
// //   };

// //   return (
// //     <>
// //       <div className="product-item flex flex-col lg:flex-row items-center bg-[#f1f1f1] shadow-md shadow-[#bdb9bc] rounded-md overflow-hidden border border-[rgba(0,0,0,0.2)]">
// //         {/* IMAGE SECTION */}
// //         <div className="imgWrapper group relative w-full lg:w-[25%] rounded-md overflow-hidden">
// //           <Link to={`/product-details/${item?._id}`}>
// //             <div className="img  overflow-hidden rounded-md">
// //               {/* First image */}
// //               <img
// //                 src={item?.images?.[0]}
// //                 alt={item?.name}
// //                 className="w-full h-[300px] object-cover"
// //               />

// //               {/* Hover image */}
// //               <img
// //                 src={item?.images?.[1]}
// //                 alt={item?.name}
// //                 className="w-full absolute top-0 left-0 h-full object-cover opacity-0 group-hover:!opacity-100 transition-all duration-500"
// //               />
// //             </div>
// //           </Link>

// //           {/* DISCOUNT */}
// //           {item?.discount && (
// //             <span className="discount p-1 flex items-center text-[12px] font-[500] absolute z-50 text-white rounded-lg !bg-primary top-[10px] left-[10px]">
// //               {item.discount}%
// //             </span>
// //           )}

// //           {/* ACTION BUTTONS */}
// //           <div className="actions group-hover:top-[15px] transition-all duration-700 absolute top-[-200px] flex-col w-[50px] right-[5px] z-50 flex items-center gap-2">
// //             {/* Quick View */}
// //             <Button
// //               onClick={() =>
// //                 context.handleClickOpenProductDetailModal(true, item)
// //               }
// //               className="!w-[35px] !text-black !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary hover:!text-white"
// //             >
// //               <MdZoomOutMap className="text-[18px]" />
// //             </Button>

// //             {/* Wishlist */}
// //             <Button className="!w-[35px] !text-black !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary hover:!text-white">
// //               <FaRegHeart className="text-[18px]" />
// //             </Button>
// //           </div>
// //         </div>

// //         {/* INFO SECTION */}
// //         <div className="info  w-full p-4 lg:w-[75%] flex items-start flex-col justify-start h-full  px-2 lg:px-8 bg-[#f1f1f1]">
// //           {/* BRAND */}
// //           <h6 className="!text-[14px] !font-[400]">
// //             <Link
// //               to={`/product-details/${item?._id}`}
// //               className="link transition-all"
// //             >
// //               {item?.brand}
// //             </Link>
// //           </h6>

// //           {/* NAME */}
// //           <h3 className="text-[18px] mb-1 mt-2 font-[500] title text-[black]">
// //             <Link
// //               to={`/product-details/${item?._id}`}
// //               className="link transition-all"
// //             >
// //               {item?.name}
// //             </Link>
// //           </h3>

// //           {/* DESCRIPTION (Trimmed) */}
// //           <p className="text-[14px] mb-3">
// //             {item?.description}
// //             {/* //?.substring(0, 150) + "..." */}
// //           </p>

// //           {/* RATING */}
// //           <Rating
// //             name="size-small"
// //             defaultValue={item?.rating}
// //             size="small"
// //             readOnly
// //           />

// //           {/* PRICE */}
// //           <div className="flex items-center cursor-default text-[15px] font-[500] gap-4">
// //             <span className="oldPrice line-through text-gray-500">
// //               ₹{item?.oldPrice}
// //             </span>
// //             <span className="price !!text-primary font-[700]">
// //               ₹{item?.price}
// //             </span>
// //           </div>

// //           {/* ADD TO CART */}
// //           {isAdded === false ? (
// //             <Button
// //               onClick={() => {
// //                 context.addToCart(item, context.userData?._id, 1);
// //                 setIsLoading(true);
// //               }}
// //               className="btn-org flex gap-2 !mt-3"
// //             >
// //               <MdOutlineShoppingCart size={20} /> Add to Cart
// //             </Button>
// //           ) : (
// //             <div className="flex items-center gap-2 !mt-3 border rounded-full overflow-hidden">
// //               <Button onClick={minusQty} className="!bg-primary !min-w-[40px]">
// //                 <FaMinus className="text-white" />
// //               </Button>

// //               <span className="px-4 font-bold">{quantity}</span>

// //               <Button onClick={addQty} className="!bg-primary !min-w-[40px]">
// //                 <FaPlus className="text-white" />
// //               </Button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ProductItemListView;


// // import React, { useContext, useEffect, useState } from "react";
// // import "../ProductItems/style.css";
// // import { Link } from "react-router-dom";
// // import Rating from "@mui/material/Rating";
// // import Button from "@mui/material/Button";
// // import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6";
// // import { MdZoomOutMap, MdOutlineShoppingCart } from "react-icons/md";
// // import { myContext } from "../../App";

// // const ProductItemListView = (props) => {
// //   const context = useContext(myContext);
// //   const item = item;

// //   const [quantity, setQuantity] = useState(1);
// //   const [isAdded, setIsAdded] = useState(false);
// //   const [cartItem, setCartItem] = useState(null);

// //   const [isShowTabs, setIsShowTabs] = useState(false);
// //   const [activeTab, setActiveTab] = useState(null);
// //   const [selectedTabName, setSelectedTabName] = useState(null);

// //   // ===== Sync Cart State =====
// //   useEffect(() => {
// //     if (!context?.cartData || !item?._id) return;

// //     const foundItem = context.cartData.find(
// //       (cart) => cart.productId === item._id
// //     );

// //     if (foundItem) {
// //       setQuantity(foundItem.quantity);
// //       setCartItem(foundItem);
// //       setIsAdded(true);
// //     } else {
// //       setQuantity(1);
// //       setCartItem(null);
// //       setIsAdded(false);
// //     }
// //   }, [context.cartData, item?._id]);

// //   // ===== Add To Cart Object Builder =====
// //   const addToCart = (product, variant = "") => {
// //     const obj = {
// //       _id: product._id,
// //       name: product.name,
// //       image: product.images?.[0],   // ✅ REQUIRED BY BACKEND
// //       rating: product.rating,
// //       price: product.price,
// //       oldPrice: product.oldPrice,
// //       quantity: 1,
// //       subTotal: product.price,
// //       productId: product._id,
// //       countInStock: product.countInStock,
// //       userId: context.userData?._id,
// //       brand: product.brand,
// //       discount: product.discount,
// //       size: product?.size?.length ? variant : "",
// //       ram: product?.productRam?.length ? variant : "",
// //       weight: product?.productWeight?.length ? variant : ""
// //     };

// //     context.addToCart(obj, context.userData?._id, 1);
// //     setIsShowTabs(false);
// //   };

// //   // ===== Quantity Controls =====
// //   const addQty = () => {
// //     const newQty = quantity + 1;
// //     setQuantity(newQty);

// //     const obj = {
// //       _id: cartItem._id,
// //       qty: newQty,
// //       subTotal: item.price * newQty
// //     };

// //     context.editCart(obj);
// //   };

// //   const minusQty = () => {
// //     if (quantity === 1) {
// //       context.removeCartItem(cartItem._id);
// //       return;
// //     }

// //     const newQty = quantity - 1;
// //     setQuantity(newQty);

// //     const obj = {
// //       _id: cartItem._id,
// //       qty: newQty,
// //       subTotal: item.price * newQty
// //     };

// //     context.editCart(obj);
// //   };

// //   // ===== Variant Click =====
// //   const handleClickActiveTab = (index, value) => {
// //     setActiveTab(index);
// //     setSelectedTabName(value);
// //   };

// //   return (
// //     <>
// //       <div className="product-item flex flex-col lg:flex-row items-center bg-[#f1f1f1] shadow-md rounded-md overflow-hidden border">

// //         {/* IMAGE */}
// //         <div className="imgWrapper group relative w-full lg:w-[25%]">
// //           <Link to={`/product-details/${item?._id}`}>
// //             <img src={item?.images?.[0]} alt={item?.name} className="h-[300px] w-full object-cover" />
// //             <img src={item?.images?.[1]} alt={item?.name} className="absolute top-0 left-0 h-[300px] w-full opacity-0 group-hover:opacity-100 transition" />
// //           </Link>

// //           {/* VARIANT OVERLAY */}
// //           {isShowTabs && (
// //             <div className="absolute inset-0 bg-black/70 z-50 flex flex-wrap items-center justify-center gap-3 p-4">
              
// //               <Button onClick={() => setIsShowTabs(false)} className="absolute top-2 right-2 !bg-white !min-w-[32px]">✕</Button>

// //               {item?.size?.map((v, i) => (
// //                 <span key={i} className={`px-3 py-2 bg-white cursor-pointer rounded ${activeTab === i && "bg-primary text-white"}`}
// //                       onClick={() => addToCart(item, v)}>
// //                   {v}
// //                 </span>
// //               ))}

// //               {item?.productRam?.map((v, i) => (
// //                 <span key={i} className={`px-3 py-2 bg-white cursor-pointer rounded ${activeTab === i && "bg-primary text-white"}`}
// //                       onClick={() => addToCart(item, v)}>
// //                   {v}
// //                 </span>
// //               ))}

// //               {item?.productWeight?.map((v, i) => (
// //                 <span key={i} className={`px-3 py-2 bg-white cursor-pointer rounded ${activeTab === i && "bg-primary text-white"}`}
// //                       onClick={() => addToCart(item, v)}>
// //                   {v}
// //                 </span>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* INFO */}
// //         <div className="w-full lg:w-[75%] p-4">
// //           <h3 className="font-bold">{item?.name}</h3>
// //           <Rating value={item?.rating} size="small" readOnly/>

// //           <div className="price mt-2">
// //             <span className="line-through">₹{item?.oldPrice}</span>
// //             <span className="ml-3 !text-primary font-bold">₹{item?.price}</span>
// //           </div>

// //           {isAdded === false ? (
// //             <Button
// //               className="btn-org mt-3"
// //               onClick={() => {
// //                 if (item?.size?.length || item?.productRam?.length || item?.productWeight?.length) {
// //                   setIsShowTabs(true);        // ✅ OPEN VARIANT
// //                 } else {
// //                   addToCart(item);           // ✅ DIRECT ADD
// //                 }
// //               }}
// //             >
// //               <MdOutlineShoppingCart /> Add To Cart
// //             </Button>
// //           ) : (
// //             <div className="flex gap-2 mt-3">
// //               <Button onClick={minusQty}><FaMinus /></Button>
// //               <span>{quantity}</span>
// //               <Button onClick={addQty}><FaPlus /></Button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ProductItemListView;

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

// const ProductItemListView = (props) => {
//   const context = useContext(myContext);
//   const item = item;
//   const [quantity, setQuantity] = useState(1);
//   const [isAdded, setIsAdded] = useState(false);
//   const [cartItem, setCartItem] = useState(null);
//   const [activeTab, setActiveTab] = useState(null);
//   const [isAddedInMyList, setIsAddedInMyList] = useState(false);
//   const [isShowTabs, setIsShowTabs] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedTabName, setSelectedTabName] = useState(null);

//   // ===== Sync Cart & MyList State =====
//   useEffect(() => {
//     if (!context?.cartData || !item?._id) return;

//     // const found = context.cartData.find(
//     //   (cart) => cart.productId === item._id
//     // );
//     const found = context.cartData.find(
//   (cart) => cart.productId === item._id  // ← Only matches by productId; ignores variants!
// );

//     if (found) {
//       setQuantity(found.quantity);
//       setCartItem(found);
//       setIsAdded(true);
//     } else {
//       setQuantity(1);
//       setCartItem(null);
//       setIsAdded(false);
//     }

//     const myListItem = context?.myListData?.find(
//       (listItem) => listItem.productId === item._id
//     );

//     setIsAddedInMyList(!!myListItem);
//   }, [context.cartData, context.myListData, item?._id]);

//   const addToCart = (product, userId, quantity) => {
//     const productItem = {
//       _id: product?._id,
//       productTitle: product?.productTitle,//changed frm name
//       image: product?.images[0],
//       rating: product?.rating,
//       price: product?.price,
//       oldPrice: product?.oldPrice,
//       quantity: quantity,
//       subTotal: parseInt(product?.price * quantity),
//       productId: product?._id,
//       countInStock: product?.countInStock,
//       userId: userId,
//       brand: product?.brand,
//       discount: product?.discount,
//       size: product?.size?.length !== 0 ? selectedTabName : "",
//       weight: product?.productWeight?.length !== 0 ? selectedTabName : "",
//       ram: product?.productRam?.length !== 0 ? selectedTabName : "",
//     };

//     setIsLoading(true);
//     if (
//       product?.size?.length !== 0 ||
//       product?.productRam?.length !== 0 ||
//       product?.productWeight?.length !== 0
//     ) {
//       setIsShowTabs(true);
      
//     } else {
//       context?.addToCart(productItem, userId, quantity);

//       setTimeout(() => {
//         setIsLoading(false);
//         setIsAdded(true);
//         setIsShowTabs(false);
//       }, 1000);
//     }
//     if (activeTab !== null) {
//       context?.addToCart(productItem, userId, quantity);
//       setIsAdded(true);
//       setIsShowTabs(false);
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//     }
//   };

//   // ===== Quantity Controls =====
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
//         setIsAdded(false);
//         setQuantity(1);
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

//   // ===== Variant Selection =====
//   const handleClickActiveTab = (index, name) => {
//     setActiveTab(index);
//     setSelectedTabName(name);
//   };

//   // ===== Wishlist Handler =====
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
//           setIsAddedInMyList(true);
//           context?.getMyListData();
//         } else {
//           context?.openAlertBox("error", res?.message);
//         }
//       });
//     }
//   };

//   return (
//     <>
//       <div className="product-item flex flex-col lg:flex-row items-center bg-[#f1f1f1] shadow-md rounded-md overflow-hidden border pb-[60px] lg:pb-4 relative">
//         {/* IMAGE */}
//         <div className="imgWrapper group relative w-full lg:w-[25%] h-[300px] overflow-hidden rounded-md">
//           <Link to={`/product-details/${item?._id}`}>
//             <img
//               src={item?.images?.[0]}
//               alt={item?.name}
//               className="w-full h-full hover:scale-110 object-cover transition-transform duration-300"
//             />
//             <img
//               src={item?.images?.[1]}
//               alt={item?.name}
//               className="w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 hover:scale-110 object-cover transition-all duration-300"
//             />
//           </Link>

//           {/* Discount Badge */}
//           <span className="discount p-1 flex items-center text-[12px] font-[500] absolute z-50 text-white rounded-lg !bg-primary top-[10px] left-[10px]">
//             {item?.discount}%
//           </span>

//           {/* Actions */}
//           <div className="actions group-hover:top-[15px] transition-all duration-700 absolute top-[-200px] flex-col w-[50px] right-[5px] z-50 flex items-center gap-2">
//             <Button
//               onClick={() =>
//                 context.handleClickOpenProductDetailModal(true, item)
//               }
//               className="!w-[35px] hover:!text-white text-black !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary"
//             >
//               <MdZoomOutMap className="text-[18px] hover:!text-white group-hover:text-white !text-black" />
//             </Button>
//             <Button
//               onClick={() => handleAddToMyList(item)}
//               className={`!w-[35px] group hover:!text-white text-black 
//              !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary`}
//             >
//               {isAddedInMyList === true ? (
//                 <IoMdHeart className="text-[18px] hover:!text-white group-hover:text-white !!text-primary" />
//               ) : (
//                 <FaRegHeart className="text-[18px] hover:!text-white group-hover:text-white !text-black" />
//               )}
//             </Button>
//           </div>

//           {/* VARIANT OVERLAY */}
//           {isShowTabs && (
//             <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2 flex-wrap">
//               <Button
//                 onClick={() => setIsShowTabs(false)}
//                 className="!absolute top-[10px] !min-w-[30px] !min-h-[30px] !w-[30px] !h-[30px] text-black !rounded-full !bg-[rgba(255,255,255,1)] right-[10px]"
//               >
//                 <MdClose className="text-[25px] text-black z-90" />
//               </Button>
//               {item?.size?.length !== 0 &&
//                 item?.size?.map((v, index) => (
//                   <span
//                     key={index}
//                     className={`flex items-center justify-center min-w-[30px] p-1 max-w-[35px] bg-[rgba(255,255,255,0.8)] px-2 py-2 w-[25px] h-[25px] rounded-sm cursor-pointer hover:bg-white ${
//                       activeTab === index && "!bg-primary text-white"
//                     }`}
//                     onClick={() => handleClickActiveTab(index, v)}
//                   >
//                     {v}
//                   </span>
//                 ))}
//               {item?.productRam?.length !== 0 &&
//                 item?.productRam?.map((v, index) => (
//                   <span
//                     key={index}
//                     className={`flex items-center justify-center min-w-[45px] p-1 max-w-[45px] bg-[rgba(255,255,255,0.8)] px-2 py-2 w-[45px] h-[25px] rounded-sm cursor-pointer hover:bg-white ${
//                       activeTab === index && "!bg-primary text-white"
//                     }`}
//                     onClick={() => handleClickActiveTab(index, v)}
//                   >
//                     {v}
//                   </span>
//                 ))}
//               {item?.productWeight?.length !== 0 &&
//                 item?.productWeight?.map((v, index) => (
//                   <span
//                     key={index}
//                     className={`flex items-center justify-center min-w-[45px] p-1 max-w-[45px] bg-[rgba(255,255,255,0.8)] px-2 py-2 w-[50px] h-[35px] rounded-sm cursor-pointer hover:bg-white ${
//                       activeTab === index && "!bg-primary text-white"
//                     }`}
//                     onClick={() => handleClickActiveTab(index, v)}
//                   >
//                     {v}
//                   </span>
//                 ))}
//             </div>
//           )}
//         </div>

//         {/* INFO */}
//         <div className="w-full lg:w-[75%] p-3 py-4 relative">
          
//           <h6 className="!text-[13px] !font-[400] mb-1">
//             <Link
//               to={`/product-details/${item?._id}`}
//               className="link transition-all"
//             >
//               {item?.brand}
//             </Link>
//           </h6>
//           <h3 className="text-[13px] lg:text-[15px] mb-1 mt-2 font-[500] title text-[black]">
//             <Link
//               to={`/product-details/${item?._id}`}
//               className="link transition-all"
//             >
//               {item?.name.length > 50 ? item.name.substring(0, 50) + "..." : item.name}
//             </Link>
//           </h3>
//           <Rating
//             name="size-small"
//             defaultValue={item?.rating}
//             size="small"
//             readOnly
//           />
//           <div className="flex items-center cursor-default text-[13px] lg:text-[15px] font-[500] gap-3 mt-2">
//             <span className="oldPrice line-through text-gray-500">
//               ₹{item?.oldPrice}
//             </span>
//             <span className="price !!text-primary font-[700]">
//               ₹{item?.price}
//             </span>
//           </div>

//           <div className="left-0 pl-3 mt-5 pr-3 w-full bottom-[25px] !absolute lg:!static lg:mt-3">
//             {isAdded === false ? (
//               <Button
//                 onClick={() =>
//                   addToCart(item, context?.userData?._id, quantity)
//                 }
//                 className="btn-org btn-sml addtocartBtn justify-centerw-1/2 flex gap-2"
//               >
//                 <MdOutlineShoppingCart /> Add to cart
//               </Button>
//             ) : (
//               <>
//                 {isLoading === true ? (
//                   <Button className="btn-org btn-sml addtocartBtn justify-center w-1/2 flex gap-2">
//                     <CircularProgress size={20} />
//                   </Button>
//                 ) : (
//                   <div className="flex items-center w-1/4 overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)] justify-between">
//                     <Button
//                       onClick={minusQty}
//                       className="!rounded-none !bg-primary !min-w-[35px] !w-[35px] !h-[30px]"
//                     >
//                       <FaMinus className="text-white" />
//                     </Button>
//                     <span className="px-0 py-0">{quantity}</span>
//                     <Button
//                       onClick={addQty}
//                       className="!rounded-none !bg-primary !min-w-[35px] !w-[35px] !h-[30px]"
//                     >
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

// export default ProductItemListView;
import React, { useContext, useEffect, useState } from "react";
import "../ProductItems/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6";
import { MdClose, MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { myContext } from "../../App";
import { deleteData, editData, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdHeart } from "react-icons/io";

const ProductItemListView = ({ item }) => {
  const context = useContext(myContext);

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [isAddedInMyList, setIsAddedInMyList] = useState(false);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [ramIndex, setRamIndex] = useState(null);
  const [sizeIndex, setSizeIndex] = useState(null);
  const [weightIndex, setWeightIndex] = useState(null);
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");

  const hasVariants = item?.size?.length > 0 || item?.productRam?.length > 0 || item?.productWeight?.length > 0;

  useEffect(() => {
    if (!context?.cartData || !item?._id) return;

    const found = context.cartData.find((cart) => {
      if (cart.productId !== item._id) return false;
      const saved = cart.size || cart.ram || cart.weight || "";
      if (!hasVariants) return true;
      return saved !== "";
    });

    if (found) {
      setQuantity(found.quantity);
      setCartItem(found);
      setIsAdded(true);
      if (found.size) { setSelectedSize(found.size); setSizeIndex(item.size?.indexOf(found.size)); }
      if (found.ram) { setSelectedRam(found.ram); setRamIndex(item.productRam?.indexOf(found.ram)); }
      if (found.weight) { setSelectedWeight(found.weight); setWeightIndex(item.productWeight?.indexOf(found.weight)); }
    } else {
      setQuantity(1);
      setCartItem(null);
      setIsAdded(false);
      setSelectedRam(""); setSelectedSize(""); setSelectedWeight("");
      setRamIndex(null); setSizeIndex(null); setWeightIndex(null);
    }

    const inWishlist = context?.myListData?.some((w) => w.productId === item._id);
    setIsAddedInMyList(!!inWishlist);
  }, [context.cartData, context.myListData, item, hasVariants]);

  useEffect(() => {
    if (!isShowTabs) {
      setSelectedRam(""); setSelectedSize(""); setSelectedWeight("");
      setRamIndex(null); setSizeIndex(null); setWeightIndex(null);
    }
  }, [isShowTabs]);

  const addToCart = async () => {
    if (!context?.userData?._id) {
      context.openAlertBox("error", "Please login first");
      return;
    }

    const needsRam = item?.productRam?.length > 0;
    const needsSize = item?.size?.length > 0;
    const needsWeight = item?.productWeight?.length > 0;

    if ((needsRam && !selectedRam) || (needsSize && !selectedSize) || (needsWeight && !selectedWeight)) {
      setIsShowTabs(true);
      context.openAlertBox("error", "Please select all required options");
      return;
    }

    if (quantity > item.countInStock) {
      context.openAlertBox("error", `Only ${item.countInStock} left in stock!`);
      return;
    }

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

    setIsLoading(true);
    try {
      const res = await postData("/api/cart/add", productItem);
      if (res?.error === false) {
        context.openAlertBox("success", res.message || "Added to cart!");
        setTimeout(() => context.getCartItems(), 500);
        setIsAdded(true);
        setIsShowTabs(false);
      } else {
        context.openAlertBox("error", res?.message || "Failed");
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
      context.openAlertBox("error", `Only ${item.countInStock} items in stock!`);
      return;
    }
    editData("/api/cart/update-qty", { _id: cartItem._id, qty: newQty, subTotal: item.price * newQty })
      .then(() => { context.getCartItems(); setQuantity(newQty); });
  };

  const minusQty = () => {
    if (quantity <= 1) {
      deleteData(`/api/cart/delete-cart-item/${cartItem._id}`).then(() => {
        context.getCartItems();
        setIsAdded(false);
        setQuantity(1);
        setSelectedRam(""); setSelectedSize(""); setSelectedWeight("");
      });
      return;
    }
    const newQty = quantity - 1;
    editData("/api/cart/update-qty", { _id: cartItem._id, qty: newQty, subTotal: item.price * newQty })
      .then(() => { context.getCartItems(); setQuantity(newQty); });
  };

  const handleClickActiveTab = (type, index, value) => {
    if (type === "ram") { setRamIndex(index); setSelectedRam(value); }
    if (type === "size") { setSizeIndex(index); setSelectedSize(value); }
    if (type === "weight") { setWeightIndex(index); setSelectedWeight(value); }
  };

  const handleWishlist = () => {
    if (!context?.userData) return context.openAlertBox("error", "Please login first");
    postData("/api/myList/add", {
      productId: item._id,
      userId: context.userData._id,
      productTitle: item.name,
      image: item.images?.[0],
      rating: item.rating,
      price: item.price,
      oldPrice: item.oldPrice,
      brand: item.brand,
      discount: item.discount,
    }).then(res => {
      if (res?.error === false) {
        context.openAlertBox("success", res.message);
        setIsAddedInMyList(true);
        context.getMyListData();
      }
    });
  };

  const handleAddToCartClick = () => hasVariants ? setIsShowTabs(true) : addToCart();
  const confirmAndAdd = () => { setIsShowTabs(false); addToCart(); };

  return (
    <div className="product-item flex flex-col lg:flex-row items-center bg-[#f1f1f1] shadow-md rounded-md overflow-hidden border pb-[60px] lg:pb-4 relative">
      
      {/* IMAGE SECTION */}
      <div className="imgWrapper group relative w-full lg:w-[25%] h-[300px] overflow-hidden rounded-md">
        <Link to={`/product-details/${item._id}`}>
          <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition" />
          {item.images?.[1] && (
            <img src={item.images[1]} alt="hover" className="absolute inset-0 opacity-0 group-hover:opacity-100 object-cover hover:scale-110 transition" />
          )}
        </Link>

        {item.discount > 0 && (
          <span className="absolute top-3 left-3 !bg-primary text-white text-xs px-2 py-1 rounded z-10">
            {item.discount}% OFF
          </span>
        )}

        <div className="actions group-hover:top-[15px] transition-all duration-700 absolute top-[-200px] right-3 flex flex-col gap-2 z-10">
          <Button onClick={() => context.handleClickOpenProductDetailModal(true, item)} className="!bg-white !p-2 rounded-full shadow">
            <MdZoomOutMap />
          </Button>
          <Button onClick={handleWishlist} className="!bg-white !p-2 rounded-full shadow">
            {isAddedInMyList ? <IoMdHeart className="!text-primary" /> : <FaRegHeart />}
          </Button>
        </div>

        {/* Variant Overlay */}
        {isShowTabs && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-6 z-50 p-6">
            <Button onClick={() => setIsShowTabs(false)} className="absolute top-4 right-4 !bg-white !p-2 rounded-full">
              <MdClose className="text-xl" />
            </Button>
            <h3 className="text-white text-xl font-bold">Select Variant</h3>

            {item.productRam?.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-white">RAM:</span>
                <div className="flex gap-3 flex-wrap justify-center">
                  {item.productRam.map((ram, i) => (
                    <button key={i} onClick={() => handleClickActiveTab("ram", i, ram)}
                      className={`px-6 py-3 rounded-lg font-medium ${ramIndex === i ? "!bg-primary text-white" : "bg-white text-black"}`}>
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item.size?.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-white">Size:</span>
                <div className="flex gap-3 flex-wrap justify-center">
                  {item.size.map((s, i) => (
                    <button key={i} onClick={() => handleClickActiveTab("size", i, s)}
                      className={`px-6 py-3 rounded-lg font-medium ${sizeIndex === i ? "!bg-primary text-white" : "bg-white text-black"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item.productWeight?.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-white">Weight:</span>
                <div className="flex gap-3 flex-wrap justify-center">
                  {item.productWeight.map((w, i) => (
                    <button key={i} onClick={() => handleClickActiveTab("weight", i, w)}
                      className={`px-6 py-3 rounded-lg font-medium ${weightIndex === i ? "!bg-primary text-white" : "bg-white text-black"}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={confirmAndAdd}
              disabled={isLoading}
              className="mt-6 !bg-primary !text-white px-10 py-4 rounded-lg text-lg font-bold"
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Confirm & Add to Cart"}
            </Button>
          </div>
        )}
      </div>

      {/* INFO SECTION */}
      <div className="w-full lg:w-[75%] p-6 flex flex-col justify-between h-full">
        <div>
          <h6 className="text-sm text-gray-600 font-medium">
            <Link to={`/product-details/${item._id}`} className="text-black no-underline hover:!text-primary">{item.brand}</Link>
          </h6>
          <h3 className="text-lg font-bold mt-1 line-clamp-2">
            <Link to={`/product-details/${item._id}`} className="no-underline text-black hover:!text-primary">
              {item.name}
            </Link>
          </h3>

          <Rating value={item.rating || 0} readOnly size="small" className="mt-3" />

          <div className="flex items-center gap-4 mt-4 text-xl">
            <span className="line-through text-gray-500">₹{item.oldPrice}</span>
            <span className="!text-primary font-bold">₹{item.price}</span>
          </div>

          {item.countInStock <= 5 && (
            <p className="text-red-600 font-medium mt-2">Only {item.countInStock} left in stock!</p>
          )}
        </div>

        {/* ADD TO CART / QUANTITY - PERFECTLY ALIGNED */}
        <div className="mt-6">
          {isAdded ? (
            // QUANTITY BUTTONS - SAME AS GRID VIEW
            <div className="flex items-center justify-center gap-0 border-2 !border-primary rounded-full overflow-hidden w-fit">
              <Button onClick={minusQty} className="!bg-primary !text-white !rounded-none !min-w-16 !h-8">
                <FaMinus />
              </Button>
              <span className="px-8 py-0 font-bold text-lg bg-white !text-primary min-w-4 text-center">
                {quantity}
              </span>
              <Button onClick={addQty} className="!bg-primary !text-white !rounded-none !min-w-16 !h-8">
                <FaPlus />
              </Button>
            </div>
          ) : (
            // ADD TO CART BUTTON - FULL WIDTH & SAME HEIGHT
            <Button
              onClick={handleAddToCartClick}
              disabled={isLoading}
              className="w-[30%] !bg-primary !text-white !py-2 !text-lg  rounded-full flex items-center justify-center gap-3 hover:!bg-primary/90 transition"
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : <MdOutlineShoppingCart size={24} />}
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;