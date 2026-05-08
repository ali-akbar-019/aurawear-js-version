import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
    getAllOrders,
    updateOrderStatus,
    getAllUsers,
    updateUserRole,
    deleteUser,
    createUserByAdmin,
    updateUserByAdmin,
} from "../controllers/admin.controller.js";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
} from "../controllers/product.controller.js";

const router = Router();

// -------------------- ORDERS -------------------- //
router.get("/orders", authenticate, isAdmin, getAllOrders);
router.put("/orders/:id", authenticate, isAdmin, updateOrderStatus);

// -------------------- USERS -------------------- //
router.get("/users", authenticate, isAdmin, getAllUsers);
router.post("/users", authenticate, isAdmin, createUserByAdmin);
router.put("/users/:id/role", authenticate, isAdmin, updateUserRole);
router.delete("/users/:id", authenticate, isAdmin, deleteUser);
router.put("/users", authenticate, isAdmin, updateUserByAdmin);

// -------------------- PRODUCTS -------------------- //
router.post("/products", authenticate, isAdmin, createProduct);
router.put("/products/:id", authenticate, isAdmin, updateProduct);
router.delete("/products/:id", authenticate, isAdmin, deleteProduct);
router.get("/products", authenticate, isAdmin, getAllProducts);

export default router;
