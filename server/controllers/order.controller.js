// import OrderModel from "../models/order.model.js";
// import ProductModel from "../models/product.model.js";

// // export const createOrderController = async (request, response) => {
// //   let order = new OrderModel({
// //     userId: request.body.userId,
// //     products: request.body.products,
// //     paymentId: request.body.paymentId,
// //     payment_status: request.body.payment_status,
// //     delivery_address: request.body.delivery_address,
// //     totalAmt: request.body.totalAmt,
// //     date: request?.body?.date,
// //   });

// //   if (!order) {
// //     response.status(500).json({
// //       error: true,
// //       success: false,
// //     });
// //   }

// //   for (let i = 0; i < request.body.products.length; i++) {
// //     await ProductModel.findByIdAndUpdate(
// //       request.body.products[i].productId,
// //       {
// //         countInStock: parseInt(
// //           request?.body?.products[i].countInStock -
// //             request?.body.products[i].quantity
// //         ),
// //       },
// //       {
// //         new: true,
// //       }
// //     );
// //   }

// //   order = await order.save();
// //   return response.status(200).json({
// //     error: false,
// //     success: true,
// //     message: "Order Placed",
// //     order: order,
// //   });
// // };
// // controllers/orderController.js (or wherever your order create is)

// // import ProductModel from "../models/productModel.model.js";
// // import Order from "../models/orderModel.js";

// export const createOrderController = async (req, res) => {
//   try {
//     const {
//       userId,
//       products,
//       totalAmt,
//       delivery_address,
//       paymentId,
//       payment_status,
//     } = req.body;

//     if (!products || products.length === 0) {
//       return res.status(400).json({
//         message: "No products in order",
//         success: false,
//         error: true,
//       });
//     }

//     // === STEP 1: Decrease stock for each product ===
//     for (let item of products) {
//       const product = await ProductModel.findById(item.productId);

//       if (!product) {
//         return res.status(404).json({
//           message: `Product not found: ${item.productTitle}`,
//           success: false,
//           error: true,
//         });
//       }

//       if (product.countInStock < item.quantity) {
//         return res.status(400).json({
//           message: `Not enough stock for ${item.productTitle}. Only ${product.countInStock} left.`,
//           success: false,
//           // error: true,
//         });
//       }

//       // Decrease the stock
//       product.countInStock -= item.quantity;
//       await product.save();
//     }

//     // === STEP 2: Create the order ===
//     const newOrder = new OrderModel({
//       userId,
//       products: products.map((p) => ({
//         productId: p.productId,
//         productTitle: p.productTitle,
//         quantity: p.quantity,
//         price: p.price,
//         image: p.image,
//         subTotal: p.subTotal,
//       })),
//       totalAmt,
//       delivery_address,
//       paymentId: paymentId || "",
//       payment_status,
//     });

//     await newOrder.save();

//     // return res.status(201).json({
//     //   success: true,
//     //   error: false,
//     //   message: "Order placed successfully & stock updated!",
//     //   data: newOrder,
//     // });
//     // At the very end of success
//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully & stock updated!",
//       data: newOrder,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message || "Error creating order",
//       success: false,
//       error: true,
//     });
//   }
// };
// // export const createOrderController = async (request, response) => {
// //   try {
// //     const {
// //       userId,
// //       products,
// //       totalAmt,
// //       delivery_address,
// //       paymentId,
// //       payment_status,
// //     } = request.body;

// //     if (!userId || !products?.length || !delivery_address) {
// //       return response.status(400).json({
// //         error: true,
// //         success: false,
// //         message: "Missing required fields",
// //       });
// //     }

// //     // Update stock properly
// //     for (let i = 0; i < products.length; i++) {
// //       const item = products[i];

// //       // Fetch latest DB product
// //       const dbProduct = await ProductModel.findById(item.productId);

// //       if (!dbProduct) continue;

// //       const newStock = dbProduct.countInStock - item.quantity;
// //       console.log("new stock", newStock);
// //       await ProductModel.findByIdAndUpdate(
// //         item.productId,
// //         { countInStock: newStock },
// //         { new: true }
// //       );
// //       console.log("Before:", dbProduct.countInStock, "Qty:", item.quantity, "After:", newStock);

// //     }

// //     // Create order
// //     const order = new OrderModel({
// //       userId,
// //       products,
// //       totalAmt,
// //       delivery_address,
// //       paymentId: paymentId || "",
// //       payment_status: payment_status || "pending",
// //       date: new Date(),
// //     });

// //     await order.save();

// //     return response.status(200).json({
// //       error: false,
// //       success: true,
// //       message: "Order Placed",
// //       order,
// //       // generate actual token if needed
// //     });
// //   } catch (error) {
// //     console.error("Create Order Error:", error);
// //     return response.status(500).json({
// //       error: true,
// //       success: false,
// //       message: error.message || "Internal Server Error",
// //     });
// //   }
// // };

// export const getOrderDetailsController = async (request, response) => {
//   try {
//     const userId = request.userId;
//     const { page, limit } = request.query;
//     const orderList = await OrderModel.find()
//       .sort({
//         createdAt: -1,
//       })
//       .populate("delivery_address userId");
//     const total = await OrderModel.countDocuments(orderList);
//     return response.status(200).json({
//       error: false,
//       success: true,
//       message: "Order List",
//       data: orderList,
//       total: total,
//       page: parseInt(page),
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message:
//         error.message || "Internal Server Error while updating cart item",
//       success: false,
//       error: true,
//     });
//   }
// };

// export const updateOrderStatusController = async (request, response) => {
//   try {
//     const { id, order_status } = request?.body;
//     const userId = request.userId;

//     const updateOrder = await OrderModel.updateOne(
//       { _id: id }, // Change this line
//       {
//         order_status: order_status,
//       },
//       {
//         new: true,
//       }
//     );

//     return response.status(200).json({
//       message: "Order updated successfully",
//       success: true,
//       error: false,
//       data: updateOrder,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message:
//         error.message || "Internal Server Error while updating cart item",
//       success: false,
//       error: true,
//     });
//   }
// };
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

// export const createOrderController = async (request, response) => {
//   let order = new OrderModel({
//     userId: request.body.userId,
//     products: request.body.products,
//     paymentId: request.body.paymentId,
//     payment_status: request.body.payment_status,
//     delivery_address: request.body.delivery_address,
//     totalAmt: request.body.totalAmt,
//     date: request?.body?.date,
//   });

//   if (!order) {
//     response.status(500).json({
//       error: true,
//       success: false,
//     });
//   }

//   for (let i = 0; i < request.body.products.length; i++) {
//     await ProductModel.findByIdAndUpdate(
//       request.body.products[i].productId,
//       {
//         countInStock: parseInt(
//           request?.body?.products[i].countInStock -
//             request?.body.products[i].quantity
//         ),
//       },
//       {
//         new: true,
//       }
//     );
//   }

//   order = await order.save();
//   return response.status(200).json({
//     error: false,
//     success: true,
//     message: "Order Placed",
//     order: order,
//   });
// };
// controllers/orderController.js (or wherever your order create is)

// import ProductModel from "../models/productModel.model.js";
// import Order from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalAmt,
      delivery_address,
      paymentId,
      payment_status,
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No products in order",
        success: false,
        error: true,
      });
    }

    // === STEP 1: Decrease stock for each product ===
    for (let item of products) {
      const product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.productTitle}`,
          success: false,
          error: true,
        });
      }

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.productTitle}. Only ${product.countInStock} left.`,
          success: false,
          // error: true,
        });
      }

      // Decrease the stock
      product.countInStock -= item.quantity;
      await product.save();
    }

    // === STEP 2: Create the order ===
    const newOrder = new OrderModel({
      userId,
      products: products.map((p) => ({
        productId: p.productId,
        productTitle: p.productTitle,
        quantity: p.quantity,
        price: p.price,
        image: p.image,
        subTotal: p.subTotal,
      })),
      totalAmt,
      delivery_address,
      paymentId: paymentId || "",
      payment_status,
    });

    await newOrder.save();

    // return res.status(201).json({
    //   success: true,
    //   error: false,
    //   message: "Order placed successfully & stock updated!",
    //   data: newOrder,
    // });
    // At the very end of success
    return res.status(201).json({
      success: true,
      message: "Order placed successfully & stock updated!",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Error creating order",
      success: false,
      error: true,
    });
  }
};
// export const createOrderController = async (request, response) => {
//   try {
//     const {
//       userId,
//       products,
//       totalAmt,
//       delivery_address,
//       paymentId,
//       payment_status,
//     } = request.body;

//     if (!userId || !products?.length || !delivery_address) {
//       return response.status(400).json({
//         error: true,
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     // Update stock properly
//     for (let i = 0; i < products.length; i++) {
//       const item = products[i];

//       // Fetch latest DB product
//       const dbProduct = await ProductModel.findById(item.productId);

//       if (!dbProduct) continue;

//       const newStock = dbProduct.countInStock - item.quantity;
//       console.log("new stock", newStock);
//       await ProductModel.findByIdAndUpdate(
//         item.productId,
//         { countInStock: newStock },
//         { new: true }
//       );
//       console.log("Before:", dbProduct.countInStock, "Qty:", item.quantity, "After:", newStock);

//     }

//     // Create order
//     const order = new OrderModel({
//       userId,
//       products,
//       totalAmt,
//       delivery_address,
//       paymentId: paymentId || "",
//       payment_status: payment_status || "pending",
//       date: new Date(),
//     });

//     await order.save();

//     return response.status(200).json({
//       error: false,
//       success: true,
//       message: "Order Placed",
//       order,
//       // generate actual token if needed
//     });
//   } catch (error) {
//     console.error("Create Order Error:", error);
//     return response.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// };

export const getOrderDetailsController = async (request, response) => {
  try {
    const userId = request.userId;
    const { page = 1, limit = 5 } = request.query;
    const currentPage = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (currentPage - 1) * limitNum;

    const orderList = await OrderModel.find()
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limitNum)
      .populate("delivery_address userId")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await OrderModel.countDocuments();
    const totalPages = Math.ceil(total / limitNum);
    return response.status(200).json({
      error: false,
      success: true,
      message: "Order List",
      data: orderList,
      total: total,
      page: currentPage,
      totalPages: totalPages,
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

export const updateOrderStatusController = async (request, response) => {
  try {
    const { id, order_status } = request?.body;
    const userId = request.userId;

    const updateOrder = await OrderModel.updateOne(
      { _id: id }, // Change this line
      {
        order_status: order_status,
      },
      {
        new: true,
      }
    );

    return response.status(200).json({
      message: "Order updated successfully",
      success: true,
      error: false,
      data: updateOrder,
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

export const getTotalOrdersCountController = async (request, response) => {
  try {
    const ordersCount = await OrderModel.countDocuments();

    return response.status(200).json({
      message: "Order updated successfully",
      success: true,
      error: false,
      count: ordersCount,
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
export const totalSalesController = async (request, response) => {
  try {
    const currentYear = new Date().getFullYear();

    const ordersList = await OrderModel.find();

    let totalSales = 0;

    const monthlySales = [
      { name: "JAN", TotalSales: 0 },
      { name: "FEB", TotalSales: 0 },
      { name: "MAR", TotalSales: 0 },
      { name: "APR", TotalSales: 0 },
      { name: "MAY", TotalSales: 0 },
      { name: "JUN", TotalSales: 0 },
      { name: "JUL", TotalSales: 0 },
      { name: "AUG", TotalSales: 0 },
      { name: "SEP", TotalSales: 0 },
      { name: "OCT", TotalSales: 0 },
      { name: "NOV", TotalSales: 0 },
      { name: "DEC", TotalSales: 0 },
    ];

    for (let i = 0; i < ordersList.length; i++) {
      totalSales = totalSales + parseInt(ordersList[i].totalAmt);

      const str = JSON.stringify(ordersList[i]?.createdAt);

      const year = str.substr(1, 4);
      const monthStr = str.substr(6, 8);
      const month = parseInt(monthStr.substr(0, 2)); // 1–12

      if (currentYear == year) {
        if (month === 1) {
          monthlySales[0].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 2) {
          monthlySales[1].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 3) {
          monthlySales[2].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 4) {
          monthlySales[3].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 5) {
          monthlySales[4].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 6) {
          monthlySales[5].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 7) {
          monthlySales[6].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 8) {
          monthlySales[7].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 9) {
          monthlySales[8].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 10) {
          monthlySales[9].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 11) {
          monthlySales[10].TotalSales += parseInt(ordersList[i].totalAmt);
        }
        if (month === 12) {
          monthlySales[11].TotalSales += parseInt(ordersList[i].totalAmt);
        }
      }
    }

    return response.status(200).json({
      message: "Sales data fetched",
      success: true,
      error: false,
      totalSales: totalSales,
      monthlySales: monthlySales,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while fetching sales data",
      success: false,
      error: true,
    });
  }
};

export const totalUsersController = async (request, response) => {
  try {
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const monthlyUsers = [
      { name: "JAN", TotalUsers: 0 },
      { name: "FEB", TotalUsers: 0 },
      { name: "MAR", TotalUsers: 0 },
      { name: "APR", TotalUsers: 0 },
      { name: "MAY", TotalUsers: 0 },
      { name: "JUN", TotalUsers: 0 },
      { name: "JUL", TotalUsers: 0 },
      { name: "AUG", TotalUsers: 0 },
      { name: "SEP", TotalUsers: 0 },
      { name: "OCT", TotalUsers: 0 },
      { name: "NOV", TotalUsers: 0 },
      { name: "DEC", TotalUsers: 0 },
    ];

    for (let i = 0; i < users.length; i++) {
      if (users[i]?._id?.month === 1) {
        monthlyUsers[0] = { name: "JAN", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 2) {
        monthlyUsers[1] = { name: "FEB", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 3) {
        monthlyUsers[2] = { name: "MAR", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 4) {
        monthlyUsers[3] = { name: "APR", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 5) {
        monthlyUsers[4] = { name: "MAY", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 6) {
        monthlyUsers[5] = { name: "JUN", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 7) {
        monthlyUsers[6] = { name: "JUL", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 8) {
        monthlyUsers[7] = { name: "AUG", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 9) {
        monthlyUsers[8] = { name: "SEP", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 10) {
        monthlyUsers[9] = { name: "OCT", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 11) {
        monthlyUsers[10] = { name: "NOV", TotalUsers: users[i].count };
      }
      if (users[i]?._id?.month === 12) {
        monthlyUsers[11] = { name: "DEC", TotalUsers: users[i].count };
      }
    }

    return response.status(200).json({
      message: "Users data fetched",
      success: true,
      error: false,
      TotalUsers: monthlyUsers,
    });
  } catch (error) {
    return response.status(500).json({
      message:
        error.message || "Internal Server Error while fetching sales data",
      success: false,
      error: true,
    });
  }
};

// export const totalUsersController = async (request, response) => {
//   try {
//     const users = await UserModel.aggregate([
//       {
//         $group: {
//           _id: {
//             year: {
//               $year: "$createdAt",
//             },
//             month: {
//               $month: "$createdAt",
//             },
//           },
//           count: {
//             $sum: 1,
//           },
//         },
//       },
//       {
//         $sort: {
//           "_id.year": 1,
//           "_id.month": 1,
//         },
//       },
//     ]);

//     const monthlyUsers = [
//       { name: "JAN", TotalUsers: 0 },
//       { name: "FEB", TotalUsers: 0 },
//       { name: "MAR", TotalUsers: 0 },
//       { name: "APR", TotalUsers: 0 },
//       { name: "MAY", TotalUsers: 0 },
//       { name: "JUN", TotalUsers: 0 },
//       { name: "JUL", TotalUsers: 0 },
//       { name: "AUG", TotalUsers: 0 },
//       { name: "SEP", TotalUsers: 0 },
//       { name: "OCT", TotalUsers: 0 },
//       { name: "NOV", TotalUsers: 0 },
//       { name: "DEC", TotalUsers: 0 },
//     ];

//     for (let i = 0; i < users.length; i++) {
//       if (users[i]?._id?.month === 1) {
//         monthlyUsers[0] = { name: "JAN", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 2) {
//         monthlyUsers[1] = { name: "FEB", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 3) {
//         monthlyUsers[2] = { name: "MAR", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 4) {
//         monthlyUsers[3] = { name: "APR", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 5) {
//         monthlyUsers[4] = { name: "MAY", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 6) {
//         monthlyUsers[5] = { name: "JUN", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 7) {
//         monthlyUsers[6] = { name: "JUL", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 8) {
//         monthlyUsers[7] = { name: "AUG", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 9) {
//         monthlyUsers[8] = { name: "SEP", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 10) {
//         monthlyUsers[9] = { name: "OCT", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 11) {
//         monthlyUsers[10] = { name: "NOV", TotalUsers: users[i].count };
//       }
//       if (users[i]?._id?.month === 12) {
//         monthlyUsers[11] = { name: "DEC", TotalUsers: users[i].count };
//       }
//     }

//     return response.status(200).json({
//       message: "Users data fetched",
//       success: true,
//       error: false,
//       TotalUsers: monthlyUsers,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message:
//         error.message || "Internal Server Error while fetching sales data",
//       success: false,
//       error: true,
//     });
//   }
// };
