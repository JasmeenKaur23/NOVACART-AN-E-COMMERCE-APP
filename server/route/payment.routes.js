// routes/payment.routes.js
import express, { Router } from "express";

import { createCashfreeOrder } from "../controllers/payment.controller.js";

const paymentRoutes = Router();
paymentRoutes.post("/create-cf-order", createCashfreeOrder);
// paymentRoutes.get("/verify/:orderId", verifyCashfreePayment);

export default paymentRoutes;