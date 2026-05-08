import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    createPaymentIntent
} from "../controllers/order.controller.js";

const router = Router();

// -------------------- USER ROUTES -------------------- //
router.post("/create", authenticate, createOrder); // Create order (checkout)
router.get("/me", authenticate, getMyOrders); // Get current user's orders
router.get("/:id", authenticate, getOrderById); // Get single order
router.post("/create-payment-intent", authenticate, createPaymentIntent); // Get single order

// -------------------- ADMIN ROUTES -------------------- //
router.get("/", authenticate, isAdmin, getAllOrders); // Get all orders
router.put("/:id/status", authenticate, isAdmin, updateOrderStatus); // Update order status

export default router;
