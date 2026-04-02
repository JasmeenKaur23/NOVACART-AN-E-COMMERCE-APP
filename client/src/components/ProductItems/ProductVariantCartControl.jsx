// src/components/ProductItems/ProductVariantCartControl.jsx

import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
// import { GlobalContext } from "../../context/GlobalContext";
import { myContext } from "../../App";

const ProductVariantCartControl = ({ item, selectedVariant }) => {
  const context = useContext(myContext);

  const variantStock = selectedVariant?.stock || 0;

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
    setIsLoading(false);
  }, [selectedVariant]);
useEffect(() => {
  setActiveTab(null);
  setSelectedTabName(null);
  setIsShowTabs(false);
}, [props?.item?._id]);

//   const addToCart = async () => {
//     setIsLoading(true);

//     if (variantStock === 0) {
//       context.openAlertBox("error", "No Stock Available");
//       setIsLoading(false);
//       setIsAdded(false);
//       return;
//     }

//     try {
//       // API call here
//       // await context.addToCart(item._id, selectedVariant, quantity);

//       setIsAdded(true);
//       context.openAlertBox("success", "Added to cart");
//     } catch (error) {
//       context.openAlertBox("error", "Unable to add to cart");
//     }

//     setIsLoading(false);
//   };
const addToCart = (product, userId, quantity) => {
  const hasVariants =
    (props?.item?.size?.length ?? 0) > 0 ||
    (props?.item?.productRam?.length ?? 0) > 0 ||
    (props?.item?.productWeight?.length ?? 0) > 0;

  // 1️⃣ If product has variants but none selected → show popup
  if (hasVariants && !selectedTabName) {
    setIsShowTabs(true);
    return;
  }

  // 2️⃣ Build product object
  const productItem = {
    _id: product?._id,
    name: product?.name,
    image: product?.images[0],
    rating: product?.rating,
    price: product?.price,
    oldPrice: product?.oldPrice,
    quantity: quantity,
    subTotal: parseInt(product?.price * quantity),
    productId: product?._id,
    countInStock: product?.countInStock,
    userId: userId,
    brand: product?.brand,
    discount: product?.discount,
    size: props?.item?.size?.length ? selectedTabName : "",
    weight: props?.item?.productWeight?.length ? selectedTabName : "",
    ram: props?.item?.productRam?.length ? selectedTabName : "",
  };

  // 3️⃣ Start loader
  setIsLoading(true);

  // 4️⃣ Add to cart
  context.addToCart(productItem, userId, quantity);

  // 5️⃣ Close popup and show success UI after 1s
  setTimeout(() => {
    setIsLoading(false);
    setIsAdded(true);
    setIsShowTabs(false);
  }, 1000);
};

  const addQty = () => {
    if (quantity >= variantStock) {
      context.openAlertBox("error", "Stock limit reached");
      return;
    }
    setQuantity(quantity + 1);
  };

  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full mt-3">
      {variantStock === 0 ? (
        <Button
          disabled
          className="btn-org btn-sml justify-center w-full !bg-gray-400"
        >
          No Stock Available
        </Button>
      ) : !isAdded ? (
        <Button
          onClick={addToCart}
          className="btn-org btn-sml addtocartBtn justify-center w-full flex gap-2"
        >
          <MdOutlineShoppingCart /> Add to cart
        </Button>
      ) : (
        <>
          {isLoading ? (
            <Button className="btn-org btn-sml w-full flex justify-center">
              <CircularProgress size={22} />
            </Button>
          ) : (
            <div className="flex items-center overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)] justify-between">
              <Button
                onClick={minusQty}
                className="!rounded-none !bg-primary !min-w-[35px] !w-[35px] !h-[30px]"
              >
                <FaMinus className="text-white" />
              </Button>

              <span className="px-4">{quantity}</span>

              <Button
                onClick={addQty}
                disabled={quantity >= variantStock}
                className="!rounded-none !bg-primary !min-w-[35px] !w-[35px] !h-[30px]"
              >
                <FaPlus className="text-white" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductVariantCartControl;
