
// import Rating from "@mui/material/Rating";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import React, { useContext, useState } from "react";
// import { GoTriangleDown } from "react-icons/go";
// import { IoCloseSharp } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
// import { myContext } from "../../App";

// const CartItems = (props) => {
//   // ---------------- SIZE STATE ----------------
//   const [selectedSize, setSelectedSize] = useState(props.item?.size || "");
//   const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
//   const openSize = Boolean(sizeAnchorEl);

//   // ---------------- RAM STATE ----------------
//   const [selectedRam, setSelectedRam] = useState(props.item?.ram || "");
//   const [ramAnchorEl, setRamAnchorEl] = useState(null);
//   const openRam = Boolean(ramAnchorEl);

//   // ---------------- WEIGHT STATE ----------------
//   const [selectedWeight, setSelectedWeight] = useState(
//     props.item?.weight || ""
//   );
//   const [weightAnchorEl, setWeightAnchorEl] = useState(null);
//   const openWeight = Boolean(weightAnchorEl);

//   // ---------------- QTY STATE ----------------
//   const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
//   const [selectedQty, setSelectedQty] = useState(props.item?.quantity || 1);
//   const openQty = Boolean(qtyAnchorEl);
//   const context = useContext(myContext);

//   // ---------------- UPDATE BACKEND ----------------
//   // const updateCart = (updateType, value) => {
//   //   const cartObj = {
//   //     _id: props?.item?._id,
//   //     qty: selectedQty,
//   //     subTotal: props?.item?.price * selectedQty,
//   //     size: selectedSize,
//   //     ram: selectedRam,
//   //     weight: selectedWeight,
//   //   };

//   //   cartObj[updateType] = value; // update only changed field

//   //   editData(`/api/cart/update-qty`, cartObj).then((res) => {
//   //     if (res?.data?.error === false) {
//   //       console.log("res cartitems", res);

//   //       context?.openAlertBox("success", res?.data?.message);

//   //       context?.getCartItems();
//   //     }
//   //   });

//   //   if (updateType === "size") setSelectedSize(value);
//   //   if (updateType === "ram") setSelectedRam(value);
//   //   if (updateType === "weight") setSelectedWeight(value);
//   // };
//   const updateCart = (updateType, value, field) => {
//     // ---- Update UI instantly ----
//     if (updateType === "size") setSelectedSize(value);
//     if (updateType === "ram") setSelectedRam(value);
//     if (updateType === "weight") setSelectedWeight(value);
//     if (updateType === "qty") setSelectedQty(value);

//     // ---- Close related menu instantly ----
//     if (updateType === "size") setSizeAnchorEl(null);
//     if (updateType === "ram") setRamAnchorEl(null);
//     if (updateType === "weight") setWeightAnchorEl(null);
//     if (updateType === "qty") setQtyAnchorEl(null);

//     // ---- Build cartObj with updated values ----
//     const cartObj = {
//       _id: props?.item?._id,
//       qty: updateType === "qty" ? value : selectedQty,
//       subTotal:
//         props?.item?.price * (updateType === "qty" ? value : selectedQty),
//       size: updateType === "size" ? value : selectedSize,
//       ram: updateType === "ram" ? value : selectedRam,
//       weight: updateType === "weight" ? value : selectedWeight,
//     };

//     //if product size avaialble
//     if (updateType === "size") {
//       console.log("productId", props?.item?.productId);

//       fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
//         const product = res?.product;
//         console.log("product", product);

//         const item = product?.size?.filter((size) =>
//           size?.includes(selectedSize)
//         );
//         if (item?.length !== 0) {
//           editData(`/api/cart/update-qty`, cartObj).then((res) => {
//             if (res?.data?.error === false) {
//               context?.openAlertBox("success", res?.data?.message);
//               context?.getCartItems();
//             }
//           });
//         } else {
//           context?.openAlertBox("error", "Size not available");
//         }
//       });
//     }

//     //if product ram avaialble
//     if (updateType === "ram") {
//       console.log("productId", props?.item?.productId);

//       fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
//         const product = res?.product;
//         console.log("product", product);

//         const item = product?.productRam?.filter((ram) => ram?.includes(selectedRam));
//         if (item?.length !== 0) {
//           editData(`/api/cart/update-qty`, cartObj).then((res) => {
//             if (res?.data?.error === false) {
//               context?.openAlertBox("success", res?.data?.message);
//               context?.getCartItems();
//             }
//           });
//         } else {
//           context?.openAlertBox("error", "Ram not available");
//         }
//       });
//     }

//     //if product size avaialble
//     if (updateType === "weight") {
//       console.log("productId", props?.item?.productId);

//       fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
//         const product = res?.product;
//         console.log("product", product);

//         const item = product?.productWeight?.filter((weight) =>
//           weight?.includes(selectedWeight)
//         );
//         if (item?.length !== 0) {
//           editData(`/api/cart/update-qty`, cartObj).then((res) => {
//             if (res?.data?.error === false) {
//               context?.openAlertBox("success", res?.data?.message);
//               context?.getCartItems();
//             }
//           });
//         } else {
//           context?.openAlertBox("error", "Weight not available");
//         }
//       });
//     }

//     // ---- Call API ----
//   };
//   const removeItem = (id) => {
//     deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
//       context?.openAlertBox("success", "Product Removed from cart");

//       context?.getCartItems();
//     });
//   };

//   return (
//     <>
//       <div className="cartItem p-3 flex items-center pb-3 border-b !border-[rgba(0,0,0,0.1)] gap-4 w-full">
//         <div className="img w-[15%] rounded-md overflow-hidden">
//           <Link
//             className="group"
//             to={`product-details/${props?.item?.productId}`}
//           >
//             <img
//               src={props?.item?.image}
//               className="w-full group-hover:scale-125 transition-all"
//             />
//           </Link>
//         </div>

//         <div className="info w-[85%] relative">
//           <IoCloseSharp
//             onClick={() => removeItem(props?.item?._id)}
//             className="cursor-pointer link transition-all absolute !top-[0px] !right-[0px] text-[22px]"
//           />

//           <span className="text-[13px]">{props?.item?.brand}</span>

//           <h4 className="text-[16px]">
//             <Link
//               className="link"
//               to={`product-details/${props?.item?.productId}`}
//             >
//               {props?.item?.productTitle?.substr(0, 120) + "..."}
//             </Link>
//           </h4>

//           <Rating value={props?.item?.rating} size="small" readOnly />

//           <div className="items-center gap-4 mt-2 flex">
//             {/* -------------- SIZE -------------- */}
//             {props?.item?.size && (
//               <div className="relative">
//                 <span
//                   onClick={(e) => setSizeAnchorEl(e.currentTarget)}
//                   className="flex items-center py-1 px-2 bg-[#f1f1f1] text-[12px] cursor-pointer rounded-md"
//                 >
//                   Size: {selectedSize} <GoTriangleDown size={16} />
//                 </span>

//                 <Menu
//                   anchorEl={sizeAnchorEl}
//                   open={openSize}
//                   onClose={() => setSizeAnchorEl(null)}
//                 >
//                   {props?.productSizeData?.map((item, index) => (
//                     <MenuItem
//                       key={index}
//                       className={`${
//                         item?.name === selectedSize
//                           ? "!text-primary font-bold"
//                           : ""
//                       }`}
//                       onClick={() => {
//                         updateCart("size", item.name, props?.item?.quantity);
//                         setSizeAnchorEl(null);
//                       }}
//                     >
//                       {item.name}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </div>
//             )}

//             {/* -------------- RAM -------------- */}
//             {props?.item?.ram && (
//               <div className="relative">
//                 <span
//                   onClick={(e) => setRamAnchorEl(e.currentTarget)}
//                   className="flex items-center py-1 px-2 bg-[#f1f1f1] text-[12px] cursor-pointer rounded-md"
//                 >
//                   RAM: {selectedRam} <GoTriangleDown size={16} />
//                 </span>

//                 <Menu
//                   anchorEl={ramAnchorEl}
//                   open={openRam}
//                   onClose={() => setRamAnchorEl(null)}
//                 >
//                   {props?.productRamsData?.map((item, index) => (
//                     <MenuItem
//                       key={index}
//                       className={`${
//                         item?.name === selectedRam
//                           ? "!text-primary font-bold"
//                           : ""
//                       }`}
//                       onClick={() => {
//                         updateCart("ram", item.name, props?.item?.quantity);
//                         setRamAnchorEl(null);
//                       }}
//                     >
//                       {item.name}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </div>
//             )}

//             {/* -------------- WEIGHT -------------- */}
//             {props?.item?.weight && (
//               <div className="relative">
//                 <span
//                   onClick={(e) => setWeightAnchorEl(e.currentTarget)}
//                   className="flex items-center py-1 px-2 bg-[#f1f1f1] text-[12px] cursor-pointer rounded-md"
//                 >
//                   Weight: {selectedWeight} <GoTriangleDown size={16} />
//                 </span>

//                 <Menu
//                   anchorEl={weightAnchorEl}
//                   open={openWeight}
//                   onClose={() => setWeightAnchorEl(null)}
//                 >
//                   {props?.productWeightData?.map((item, index) => (
//                     <MenuItem
//                       key={index}
//                       className={`${
//                         item?.name === selectedWeight
//                           ? "!text-primary font-bold"
//                           : ""
//                       }`}
//                       onClick={() => {
//                         updateCart("weight", item.name, props?.item?.quantity);
//                         setWeightAnchorEl(null);
//                       }}
//                     >
//                       {item.name}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </div>
//             )}

//             {/* -------------- QTY -------------- */}
//             <div className="relative">
//               <span
//                 onClick={(e) => setQtyAnchorEl(e.currentTarget)}
//                 className="flex items-center py-1 px-2 bg-[#f1f1f1] text-[12px] cursor-pointer rounded-md"
//               >
//                 Qty: {selectedQty} <GoTriangleDown size={16} />
//               </span>

//               <Menu
//                 anchorEl={qtyAnchorEl}
//                 open={openQty}
//                 onClose={() => setQtyAnchorEl(null)}
//               >
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
//                   <MenuItem
//                     key={v}
//                     onClick={() => {
//                       updateCart("qty", v);

//                       setQtyAnchorEl(null);
//                     }}
//                   >
//                     {v}
//                   </MenuItem>
//                 ))}
//                 {/* {
//                   Array.from({length :10}).map((_,index)=>
//                   (
//                     <MenuItem onClick={()=>{
//                       updateCart("qty", v);

//                       setQtyAnchorEl(null);
//                     }} 
//                   ))
//                 } */}
//               </Menu>
//             </div>
//           </div>
//           <div className="flex items-center mt-2 cursor-default text-[15px] font-[500] gap-2">
//             &#x20b9; {props?.item?.price}
//             <span className="price !text-black text-[16px] font-[700]"></span>
//             <span className="oldPrice text-[16px] line-through text-gray-500">
//               &#x20b9; {props?.item?.oldPrice}
//             </span>
//             <span className="price !text-primary text-[16px] font-[700]">
//               {" "}
//               {props?.item?.discount}% OFF{" "}
//             </span>{" "}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartItems;
import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { myContext } from "../../App";

const CartItems = (props) => {
  const context = useContext(myContext);

  // States
  const [selectedSize, setSelectedSize] = useState(props.item?.size || "");
  const [selectedRam, setSelectedRam] = useState(props.item?.ram || "");
  const [selectedWeight, setSelectedWeight] = useState(props.item?.weight || "");
  const [selectedQty, setSelectedQty] = useState(props.item?.quantity || 1);

  // Menu anchors
  const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
  const [ramAnchorEl, setRamAnchorEl] = useState(null);
  const [weightAnchorEl, setWeightAnchorEl] = useState(null);
  const [qtyAnchorEl, setQtyAnchorEl] = useState(null);

  const openSize = Boolean(sizeAnchorEl);
  const openRam = Boolean(ramAnchorEl);
  const openWeight = Boolean(weightAnchorEl);
  const openQty = Boolean(qtyAnchorEl);

  // Generic update function
  const updateCart = async (type, newValue) => {
  let updatedSize = selectedSize;
  let updatedRam = selectedRam;
  let updatedWeight = selectedWeight;
  let updatedQty = selectedQty;

  // Immediate UI update
  if (type === "size") { updatedSize = newValue; setSelectedSize(newValue); setSizeAnchorEl(null); }
  if (type === "ram") { updatedRam = newValue; setSelectedRam(newValue); setRamAnchorEl(null); }
  if (type === "weight") { updatedWeight = newValue; setSelectedWeight(newValue); setWeightAnchorEl(null); }
  if (type === "qty") { updatedQty = newValue; setSelectedQty(newValue); setQtyAnchorEl(null); }

  // Only validate variants (not qty)
  // if (type !== "qty") {
  //   try {
  //     const res = await fetchDataFromApi(`/api/product/${props.item?.productId}`);
  //     const product = res?.product;

  //     // Helper to check if value exists (supports string[] or {name: string}[])
  //     const isValueAvailable = (arr, value) => {
  //       if (!arr || !Array.isArray(arr)) return false;
  //       return arr.some(item => 
  //         typeof item === "string" 
  //           ? item === value 
  //           : item.name === value
  //       );
  //     };

  //     let isAvailable = true;

  //     if (type === "size" && !isValueAvailable(product?.size, newValue)) isAvailable = false;
  //     if (type === "ram" && !isValueAvailable(product?.productRam, newValue)) isAvailable = false;
  //     if (type === "weight" && !isValueAvailable(product?.productWeight, newValue)) isAvailable = false;

  //     if (!isAvailable) {
  //      context?.openAlertBox("error", `This ${type}  is currently unavailable for this product.`);
  //       // Revert UI
  //       if (type === "size") setSelectedSize(props.item?.size || "");
  //       if (type === "ram") setSelectedRam(props.item?.ram || "");
  //       if (type === "weight") setSelectedWeight(props.item?.weight || "");
  //       return;
  //     }
  //   } catch (err) {
  //     context?.openAlertBox("error", "Failed to validate selection");
  //     // Revert on error
  //     if (type === "size") setSelectedSize(props.item?.size || "");
  //     if (type === "ram") setSelectedRam(props.item?.ram || "");
  //     if (type === "weight") setSelectedWeight(props.item?.weight || "");
  //     return;
  //   }
  // }
if (type !== "qty") {
  try {
    const res = await fetchDataFromApi(`/api/product/${props.item?.productId}`);
    const product = res?.product;

    const isValueAvailable = (arr, value) => {
      if (!arr || !Array.isArray(arr)) return false;
      return arr.some(item => 
        typeof item === "string" ? item === value : item.name === value
      );
    };

    let isAvailable = true;
    if (type === "size" && !isValueAvailable(product?.size, newValue)) isAvailable = false;
    if (type === "ram" && !isValueAvailable(product?.productRam, newValue)) isAvailable = false;
    if (type === "weight" && !isValueAvailable(product?.productWeight, newValue)) isAvailable = false;

    if (!isAvailable) {
      const selections = [];
      if (selectedSize) selections.push(`Size: ${newValue}`); // show the one they just tried
      if (selectedRam && type !== "ram") selections.push(`RAM: ${selectedRam}`);
      if (selectedWeight && type !== "weight") selections.push(`Weight: ${selectedWeight}`);

      const variantText = selections.length > 0 
        ? selections.join(" | ") 
        : `${type}: ${newValue}`;

      context?.openAlertBox("error", `Sorry, this product is not available with ${variantText}.`);

      // Revert
      if (type === "size") setSelectedSize(props.item?.size || "");
      if (type === "ram") setSelectedRam(props.item?.ram || "");
      if (type === "weight") setSelectedWeight(props.item?.weight || "");
      return;
    }
  } catch (err) {
    context?.openAlertBox("error", "Failed to check availability");
    if (type === "size") setSelectedSize(props.item?.size || "");
    if (type === "ram") setSelectedRam(props.item?.ram || "");
    if (type === "weight") setSelectedWeight(props.item?.weight || "");
    return;
  }
}
  // Final update to backend
  const cartObj = {
    _id: props.item._id,
    qty: updatedQty,
    subTotal: props.item.price * updatedQty,
    size: updatedSize || "",
    ram: updatedRam || "",
    weight: updatedWeight || "",
  };

  editData(`/api/cart/update-qty`, cartObj)
    .then((res) => {
      if (res?.data?.error === false) {
        context?.openAlertBox("success", "Cart updated!");
        context?.getCartItems();
      } else {
        context?.openAlertBox("error", res?.data?.message || "Update failed");
      }
    })
    .catch(() => {
      context?.openAlertBox("error", "Network error");
    });
};

  const removeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then(() => {
      context?.openAlertBox("success", "Product removed from cart");
      context?.getCartItems();
    });
  };

  return (
    <>
      <div className="cartItem p-3 flex items-center pb-3 border-b !border-[rgba(0,0,0,0.1)] gap-4 w-full">
        <div className="img w-[30%] sm:w-[20%] lg:w-[15%] rounded-md overflow-hidden">
          <Link className="group" to={`/product-details/${props.item?.productId}`}>
            <img src={props.item?.image} className="w-full group-hover:scale-125 transition-all" alt="" />
          </Link>
        </div>

        <div className="info w-[70%] sm:w-[80%] lg:w-[85%] relative">
          <IoCloseSharp
            onClick={() => removeItem(props.item._id)}
            className="cursor-pointer link transition-all absolute top-0 right-0 text-[22px]"
          />

          <span className="text-[13px]">{props.item?.brand}</span>
          <h4 className="text-[13px] w-[80%] sm:text-[16px] ">
            <Link className="link" to={`/product-details/${props.item?.productId}`}>
              {props.item?.productTitle?.substr(0, context?.windowWidth <992 ? 30:120) + "..."}
            </Link>
          </h4>

          <Rating value={props.item?.rating} size="small" readOnly />

          <div className="flex gap-4 mt-2">
            {/* Size */}
            {props.item?.size && props.productSizeData?.length > 0 && (
              <div className="relative">
                <span
                  onClick={(e) => setSizeAnchorEl(e.currentTarget)}
                  className="flex items-center gap-1 py-1 px-2 bg-[#f1f1f1] text-[12px] font-semibold cursor-pointer rounded-md"
                >
                  Size: {selectedSize} <GoTriangleDown size={16} />
                </span>
                <Menu anchorEl={sizeAnchorEl} open={openSize} onClose={() => setSizeAnchorEl(null)}>
                  {props.productSizeData.map((item) => (
                    <MenuItem
                      key={item.name}
                      selected={item.name === selectedSize}
                      onClick={() => updateCart("size", item.name)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}

            {/* RAM */}
            {props.item?.ram && props.productRamsData?.length > 0 && (
              <div className="relative">
                <span
                  onClick={(e) => setRamAnchorEl(e.currentTarget)}
                  className="flex items-center gap-1 py-1 px-2 bg-[#f1f1f1] text-[12px] font-semibold cursor-pointer rounded-md"
                >
                  RAM: {selectedRam} <GoTriangleDown size={16} />
                </span>
                <Menu anchorEl={ramAnchorEl} open={openRam} onClose={() => setRamAnchorEl(null)}>
                  {props.productRamsData.map((item) => (
                    <MenuItem
                      key={item.name}
                      selected={item.name === selectedRam}
                      onClick={() => updateCart("ram", item.name)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}

            {/* Weight */}
            {props.item?.weight && props.productWeightData?.length > 0 && (
              <div className="relative">
                <span
                  onClick={(e) => setWeightAnchorEl(e.currentTarget)}
                  className="flex items-center gap-1 py-1 px-2 bg-[#f1f1f1] text-[12px] font-semibold cursor-pointer rounded-md"
                >
                  Weight: {selectedWeight} <GoTriangleDown size={16} />
                </span>
                <Menu anchorEl={weightAnchorEl} open={openWeight} onClose={() => setWeightAnchorEl(null)}>
                  {props.productWeightData.map((item) => (
                    <MenuItem
                      key={item.name}
                      selected={item.name === selectedWeight}
                      onClick={() => updateCart("weight", item.name)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}

            {/* Quantity */}
            
          </div>

          <div className="flex items-center mt-2 gap-3 font-medium">
            <span className="text-lg font-bold">₹{props.item?.price}</span>
            {props.item?.oldPrice && (
              <del className="text-gray-500">₹{props.item?.oldPrice}</del>
            )}
            {props.item?.discount && (
              <span className="text-green-600 font-bold">{props.item?.discount}% OFF</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;