import { Router } from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/whishlist.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Get wishlist by user
router.get("/", authenticate, getWishlist);

// Add product to wishlist
router.post("/add", authenticate, addToWishlist);

// Remove product from wishlist
router.post("/remove", authenticate, removeFromWishlist);

export default router;
