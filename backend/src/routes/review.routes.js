import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";

import {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
} from "../controllers/review.controller.js";

const router = Router();

// -------------------- PUBLIC ROUTES -------------------- //
// Get all reviews for a product
router.get("/product/:productId", getProductReviews);

// -------------------- AUTH ROUTES -------------------- //
// Add review to a product
router.post("/product/:productId", authenticate, addReview);

// Update own review
router.put("/:reviewId", authenticate, updateReview);

// Delete own review
router.delete("/:reviewId", authenticate, deleteReview);

export default router;
