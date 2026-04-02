import React, { useContext, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import QtyBox from "../QtyBox";
import CircularProgress from "@mui/material/CircularProgress";
import { MdOutlineShoppingCart, MdCheck } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { myContext } from "../../App";
import { postData } from "../../utils/api";

const ProductDetailsComponent = (props) => {
  const { item } = props;
  const context = useContext(myContext);

  const [quantity, setQuantity] = useState(1);
  const [ramIndex, setRamIndex] = useState(null);
  const [sizeIndex, setSizeIndex] = useState(null);
  const [weightIndex, setWeightIndex] = useState(null);
  const [selectedTabName, setSelectedTabName] = useState(null);
  const [tabError, setTabError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // NEW: Detect if exact variant combination is already in cart
  const [isInCart, setIsInCart] = useState(false);

  // Check cart on mount & whenever cart or selection changes
  useEffect(() => {
    if (!context?.cartData || !item?._id) return;

    const exists = context.cartData.some((cartItem) => {
      return (
        cartItem.productId === item._id &&
        cartItem.size === (selectedTabName || cartItem.size || "") &&
        cartItem.ram === (selectedTabName || cartItem.ram || "") &&
        cartItem.weight === (selectedTabName || cartItem.weight || "")
      );
    });

    setIsInCart(exists);
  }, [context?.cartData, item?._id, selectedTabName]);

  const handleClickActiveTab = (type, index, name) => {
    if (type === "ram") setRamIndex(index);
    if (type === "size") setSizeIndex(index);
    if (type === "weight") setWeightIndex(index);

    setSelectedTabName(name);
    setTabError(false); // clear red border when user selects
  };

  const addToCart = async () => {
    if (!context?.userData?._id) {
      context?.openAlertBox("error", "Please login first");
      return;
    }

    const hasVariants =
      (item?.productRam?.length > 0) ||
      (item?.size?.length > 0) ||
      (item?.productWeight?.length > 0);

    if (hasVariants && !selectedTabName) {
      setTabError(true);
      context?.openAlertBox("error", "Please select all required options");
      return;
    }

    setIsLoading(true);

    const productItem = {
      _id: item?._id,
      productTitle: item?.name,
      image: item?.images?.[0],
      rating: item?.rating,
      price: item?.price,
      oldPrice: item?.oldPrice,
      quantity,
      subTotal: item?.price * quantity,
      productId: item?._id,
      countInStock: item?.countInStock,
      userId: context?.userData?._id,
      brand: item?.brand,
      discount: item?.discount,
      size: item?.size?.length > 0 ? selectedTabName : "",
      ram: item?.productRam?.length > 0 ? selectedTabName : "",
      weight: item?.productWeight?.length > 0 ? selectedTabName : "",
    };

    try {
      const res = await postData("/api/cart/add", productItem);

      if (res?.error === false) {
        context?.openAlertBox("success", res?.message || "Added to cart!");
        context?.getCartItems();
        setIsInCart(true);
      } else {
        if (res?.message?.toLowerCase().includes("already")) {
          context?.openAlertBox("info", "Already in your cart");
          setIsInCart(true);
        } else {
          context?.openAlertBox("error", res?.message);
        }
      }
    } catch {
      context?.openAlertBox("error", "Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Title, Brand, Rating, Price, Description – unchanged */}
      <h1 className="text-[26px] mt-[90px] font-[600] mb-3">{item?.name}</h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-[14px]">
          Brand: <span className="text-black font-[500] opacity-75">{item?.brand}</span>
        </span>
        <Rating value={Number(item?.rating) || 0} size="small" readOnly />
        <span onClick={props?.goToReviews} className="cursor-pointer text-[13px]">
          Review ({props?.reviewsCount})
        </span>
      </div>

      <div className="flex mt-3 items-center text-[24px] font-[500] gap-3">
        <div className="flex items-center text-[15px] font-[500] gap-3">
          <span className="line-through text-gray-500">₹{item?.oldPrice}</span>
          <span className="!text-primary font-[700]">₹{item?.price}</span>
        </div>
        <span className="text-[14px] text-gray-600">
          Available In Stock:{" "}
          <span className="text-green-600 font-[700]">{item?.countInStock}</span>
        </span>
      </div>

      <p className="mt-3 mb-3 pr-10 text-[15px]">{item?.description || "No description available."}</p>

      {/* ====== RAM ====== */}
      {item?.productRam?.length > 0 && (
        <div className="flex items-center gap-3 mt-4">
          <span className="text-[16px] font-medium">RAM:</span>
          <div className="flex gap-2">
            {item.productRam.map((ram, i) => (
              <Button
                key={i}
                variant="outlined"
                className={`
                  min-w-[60px] border-2
                  ${ramIndex === i ? "bg-primary text-white border-primary" : "border-gray-300 text-gray-700"}
                  ${tabError && ramIndex === null ? "!border-red-500 !text-red-500 ring-2 ring-red-200" : ""}
                `}
                onClick={() => handleClickActiveTab("ram", i, ram)}
              >
                {ram}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* ====== SIZE ====== */}
      {item?.size?.length > 0 && (
        <div className="flex items-center gap-3 mt-4">
          <span className="text-[16px] font-medium">Size:</span>
          <div className="flex gap-2">
            {item.size.map((s, i) => (
              <Button
                key={i}
                variant="outlined"
                className={`
                  min-w-[50px] border-2
                  ${sizeIndex === i ? "bg-primary text-white border-primary" : "border-gray-300 text-gray-700"}
                  ${tabError && sizeIndex === null ? "!border-red-500 !text-red-500 ring-2 ring-red-200" : ""}
                `}
                onClick={() => handleClickActiveTab("size", i, s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* ====== WEIGHT ====== */}
      {item?.productWeight?.length > 0 && (
        <div className="flex items-center gap-3 mt-4">
          <span className="text-[16px] font-medium">Weight:</span>
          <div className="flex gap-2">
            {item.productWeight.map((w, i) => (
              <Button
                key={i}
                variant="outlined"
                className={`
                  min-w-[70px] border-2
                  ${weightIndex === i ? "bg-primary text-white border-primary" : "border-gray-300 text-gray-700"}
                  ${tabError && weightIndex === null ? "!border-red-500 !text-red-500 ring-2 ring-red-200" : ""}
                `}
                onClick={() => handleClickActiveTab("weight", i, w)}
              >
                {w}
              </Button>
            ))}
          </div>
        </div>
      )}

      <p className="text-[14px] mt-3 mb-2">Free Shipping (Est. Delivery Time 2–3 Days)</p>

      {/* ====== ADD TO CART BUTTON ====== */}
      <div className="flex mt-4 gap-3 items-center">
        <div className="w-[70px]">
          <QtyBox handleSelectQty={setQuantity} />
        </div>

        <Button
          onClick={addToCart}
          disabled={isLoading}
          className={`!min-w-[180px] flex gap-2 items-center justify-center transition-all ${
            isInCart ? "!bg-green-600 hover:!bg-green-700 text-white" : "btn-org"
          }`}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : isInCart ? (
            <>
              <MdCheck size={24} /> Added
            </>
          ) : (
            <>
              <MdOutlineShoppingCart size={24} /> Add to Cart
            </>
          )}
        </Button>
      </div>

      {/* Optional "Go to Cart" link */}
      {isInCart && (
        <div className="mt-2">
          <Link to="/cart" className="text-primary btn-org font-medium underline">
            Go to Cart →
          </Link>
        </div>
      )}

      {/* Wishlist & Compare */}
      <div className="flex items-center mt-4 gap-6">
        <span className="flex items-center gap-2 font-[500] cursor-pointer text-[16px]">
          <FaRegHeart /> Add to WishList
        </span>
        <span className="flex items-center gap-2 font-[500] cursor-pointer text-[16px]">
          <IoGitCompareOutline /> Add to Compare
        </span>
      </div>
    </>
  );
};

export default ProductDetailsComponent;