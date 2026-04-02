import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId;

    const {
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      quantity,
      subTotal,
      productId,
      countInStock,
      discount,
      size,
      weight,
      ram,
      brand
    } = request.body;

    if (!productId) {
      return response.status(400).json({
        message: "Provide productId",
        success: false,
        error: true
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId,
      productId,
      size: size || "",
      ram: ram || "",
      weight: weight || ""
    });

    if (checkItemCart) {
      return response.status(409).json({
        message: "Item already in cart",
        success: false,
        error: true
      });
    }

    const cartItem = new CartProductModel({
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      quantity,
      subTotal,
      productId,
      countInStock,
      userId,
      discount,
      brand,
      size: size || "",
      ram: ram || "",
      weight: weight || ""
    });

    const save = await cartItem.save();

    return response.status(201).json({
      message: "Product added to cart successfully",
      success: true,
      error: false,
      data: save
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true
    });
  }
};

// export const addToCartItemController = async (request, response) => {
//   try {
//     const userId = request.userId; //middleware
//     const {
//       productTitle,
//       image,
//       rating,
//       price,
//       oldPrice,
//       quantity,
//       subTotal,
//       productId,
//       countInStock,
//       discount,
//       size,
//       weight,
//       ram,
//       brand,
//     } = request.body;

//     if (!productId) {
//       return response.status(400).json({
//         message: "Provide productId",
//         success: false,
//         error: true,
//       });
//     }

//     const checkItemCart = await CartProductModel.findOne({
//       userId: userId,
//       productId: productId,
//     });

//     if (checkItemCart) {
//       return response.status(400).json({
//         message: "Item alreday in cart",
//         success: false,
//         error: true,
//       });
//     }

//     const cartItem = new CartProductModel({
//       productTitle: productTitle,
//       image: image,
//       rating: rating,
//       price: price,
//       oldPrice: oldPrice,
//       quantity: quantity,
//       subTotal: subTotal,
//       productId: productId,
//       countInStock: countInStock,
//       userId: userId,
//       brand: brand,
//       discount: discount,
//       size: size,
//       weight: weight,
//       ram: ram,
//     });

//     const save = await cartItem.save();

//     return response.status(201).json({
//       message: "Product added to cart successfully",
//       success: true,
//       error: false,
//       data: save,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message:
//         error.message || "Internal Server Error while adding item to cart",
//       success: false,
//       error: true,
//     });
//   }
// };

export const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const cartItems = await CartProductModel.find({
      userId: userId,
    });

    return response.status(200).json({
      message: "Product fetched from cart successfully",
      success: true,
      error: false,
      data: cartItems,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while adding item to cart",
      success: false,
      error: true,
    });
  }
};

export const updateCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, qty, subTotal, size, weight, ram } = request.body;

    // 1️⃣ Validate inputs
    if (!_id || !qty) {
      return response.status(400).json({
        message: "Provide id and qty",
        success: false,
        error: true,
      });
    }

    if (qty == null || qty < 1) {
      return response.status(400).json({
        message: "Quantity must be at least 1",
        success: false,
        error: true,
      });
    }

    // 2️⃣ Check if the product exists in cart
    const updateCartItem = await CartProductModel.updateOne(
      { _id: _id, userId: userId },
      {
        quantity: qty,
        subTotal: subTotal,
        size: size,
        ram: ram,
        weight: weight,
      },
      {
        new: true,
      }
    );
    if (!updateCartItem) {
      return response.status(404).json({
        message: "Item not found in cart",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "Cart item updated successfully",
      success: true,
      error: false,
      data: updateCartItem,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while updating cart item",
      success: false,
      error: true,
    });
  }
};
//34 video if any error  error not delted from cart table
export const deleteCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { id } = request.params;
    console.log(id, "===_id");
    console.log(id, "===_id");

    if (!id) {
      return response.status(400).json({
        message: "provide Id",
        success: false,
        error: true,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: id,
      userId: userId,
    });
    if (!deleteCartItem) {
      return response.status(404).json({
        message: "The product in cart not found",
        success: false,
        error: true,
      });
    }

    // const user = await UserModel.findOne({
    //   _id: userId,
    // });
    // const cartItems = user?.shopping_cart;

    // const updatedUserCart = [
    //   ...cartItems.slice(0, cartItems.indexOf(productId)),
    //   ...cartItems.slice(cartItems.indexOf(productId) + 1),
    // ];
    // user.shopping_cart = updatedUserCart;
    // await user.save();
    return response.status(200).json({
      message: "Cart item removed successfully",
      success: true,
      error: false,
      data: deleteCartItem,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while updating cart item",
      success: false,
      error: true,
    });
  }
};

export const emptyCartController = async (request, response) => {
  try {
    const userId = request.params.id;
    // const cartItems = await CartProductModel.find({
    //   userId: userId,
    // });
    await CartProductModel.deleteMany({ userId: userId });
    return response.status(200).json({
      message: "Product Deleted from cart",
      success: true,
      error: false,
    });
    
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while updating cart item",
      success: false,
      error: true,
    });
  }
};
