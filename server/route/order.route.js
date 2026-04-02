import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createOrderController,
  getOrderDetailsController,
  getTotalOrdersCountController,
  totalSalesController,
  totalUsersController,
  updateOrderStatusController,
} from "../controllers/order.controller.js";
import { createCashfreeOrder } from "../controllers/payment.controller.js";

const orderRouter = Router();
orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/order-list", auth, getOrderDetailsController);
orderRouter.put("/order-status/:id", auth, updateOrderStatusController);
orderRouter.get("/count", auth, getTotalOrdersCountController);
orderRouter.get("/sales", auth, totalSalesController);
orderRouter.get("/users", auth, totalUsersController);
// orderRouter.post("/create-cf-order", createCashfreeOrder);

export default orderRouter;
