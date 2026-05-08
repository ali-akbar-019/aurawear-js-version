import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
    addCategory,
    getAllCategory,
    deleteCategory
} from "../controllers/category.controller.js";

const router = Router();

// Create a category (only admin)
router.post("/", authenticate, isAdmin, addCategory);

// Get all categories (any authenticated user)
router.get("/", getAllCategory);

// Delete a category by ID (only admin)
router.delete("/:id", authenticate, isAdmin, deleteCategory);

export default router;
