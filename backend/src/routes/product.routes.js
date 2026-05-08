import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
    getProductsByAIInfo
} from "../controllers/product.controller.js";

const router = Router();

// -------------------- PUBLIC ROUTES -------------------- //
router.get("/", getAllProducts); // Get all products (with optional filters)
router.get("/:id", getProductById); // Get single product

// -------------------- ADMIN ROUTES -------------------- //
router.post("/", authenticate, isAdmin, createProduct);
router.put("/:id", authenticate, isAdmin, updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProduct);

// -------------------- RECOMMENDATIONS ROUTE -------------------- //
router.post("/recommendations", getProductsByAIInfo);

export default router;
