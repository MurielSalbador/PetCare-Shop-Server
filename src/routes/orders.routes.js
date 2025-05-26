import express from "express";
import { getAllOrders, createOrder } from "../controllers/ordersController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas protegidas
router.get("/", verifyToken, getAllOrders);
router.post("/", verifyToken, createOrder);

export default router;
