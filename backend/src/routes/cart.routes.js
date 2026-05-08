import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
    addItemToCart,
    updateCartItem,
    removeCartItem,
    getCart
} from "../controllers/cart.controller.js";

const router = Router();

// All routes require authentication
router.use(authenticate);

// -------------------- CART ROUTES -------------------- //
router.get("/", getCart); // Get current user's cart
router.post("/", addItemToCart); // Add item to cart
router.put("/:itemId", updateCartItem); // Update quantity of a cart item
router.delete("/:itemId", removeCartItem); // Remove item from cart

export default router;
