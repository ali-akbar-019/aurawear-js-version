import { ApiError } from "../utils/apiError.js";
import User from "../models/User.model.js";
import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";
import { hashPassword } from "../utils/hash.js";

// -------------------- ORDERS -------------------- //

// Get all orders (admin)
export const getAllOrders = async (_req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// UPDATE USER (profile + role)
export const updateUserByAdmin = async (req, res) => {
    try {
        const {
            id,
            name,
            email,
            role,
            gender,
            preferredTargetGroup,
            skinTone,
            bodyType,
            heightCm,
            weightKg,
        } = req.body

        if (!id) {
            throw new ApiError("User id is required", 400)
        }

        const user = await User.findById(id)
        if (!user) {
            throw new ApiError("User not found", 404)
        }

        // -------------------- Basic fields --------------------
        if (name !== undefined) user.name = name
        if (email !== undefined) user.email = email
        if (role !== undefined) user.role = role

        // -------------------- AI / profile attributes --------------------
        if (gender !== undefined) user.gender = gender
        if (preferredTargetGroup !== undefined)
            user.preferredTargetGroup = preferredTargetGroup
        if (skinTone !== undefined) user.skinTone = skinTone
        if (bodyType !== undefined) user.bodyType = bodyType
        if (heightCm !== undefined) user.heightCm = heightCm
        if (weightKg !== undefined) user.weightKg = weightKg

        await user.save()

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                gender: user.gender,
                preferredTargetGroup: user.preferredTargetGroup,
                skinTone: user.skinTone,
                bodyType: user.bodyType,
                heightCm: user.heightCm,
                weightKg: user.weightKg,
            },
        })
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}

export const createUserByAdmin = async (req, res) => {
    try {
        const { name, email, password, role = "USER" } = req.body

        if (!name || !email || !password) {
            throw new ApiError("Missing required fields", 400)
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new ApiError("Email already in use", 400)
        }

        const passwordHash = await hashPassword(password)

        const user = await User.create({
            name,
            email,
            passwordHash,
            role,
        })

        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) throw new ApiError("Order not found", 404);

        if (orderStatus) order.orderStatus = orderStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();

        res.status(200).json({ success: true, order });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- USERS -------------------- //

// Get all users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// Update user role
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) throw new ApiError("User not found", 404);

        user.role = role;
        await user.save();

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new ApiError("User not found", 404);

        await user.deleteOne();
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- PRODUCTS -------------------- //

// Create product
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, product });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) throw new ApiError("Product not found", 404);
        res.status(200).json({ success: true, product });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw new ApiError("Product not found", 404);
        await product.deleteOne();
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// Get all products (admin)
export const getAllProducts = async (_req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};
