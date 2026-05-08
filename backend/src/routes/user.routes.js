import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
    getAllUsers,
    getUserById,
    updateUserProfile,
    updateUserAIAttributes,
    deleteUser
} from "../controllers/user.controller.js";

const router = Router();

// -------------------- ADMIN ROUTES -------------------- //
router.get("/", authenticate, isAdmin, getAllUsers); // Get all users
router.get("/:id", authenticate, isAdmin, getUserById); // Get single user
router.delete("/:id", authenticate, isAdmin, deleteUser); // Delete user

// -------------------- USER ROUTES -------------------- //
router.put("/me", authenticate, updateUserProfile); // Update profile
router.put("/me/ai-attributes", authenticate, updateUserAIAttributes); // Update AI attributes

export default router;
