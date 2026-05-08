import mongoose from "mongoose";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";
import { ApiError } from "../utils/apiError.js";

// -------------------- GET CART -------------------- //
export const getCart = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const cart = await Cart.findOne({ userId: req.user._id }).populate(
            "items.productId",
            "name basePrice discountPrice images"
        );

        res.status(200).json({ success: true, cart: cart || { items: [] } });
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- ADD ITEM TO CART -------------------- //
export const addItemToCart = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const { productId, size, color, quantity, priceAtAddTime } = req.body;

        if (!productId || !size || !color || quantity === undefined || priceAtAddTime === undefined) {
            throw new ApiError("Missing required fields", 400);
        }

        if (quantity <= 0) throw new ApiError("Quantity must be greater than 0", 400);
        if (priceAtAddTime < 0) throw new ApiError("Price must be non-negative", 400);

        const product = await Product.findById(productId);
        if (!product) throw new ApiError("Product not found", 404);

        // Find the variant in the product array
        const variant = product.variants.find(v => v.size === size && v.color === color);
        if (!variant) throw new ApiError("Variant not found", 404);

        let cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] });
        }

        // Check if same product + variant already exists
        const existingItem = cart.items.find(
            item =>
                item.productId.toString() === productId &&
                item.variant.size === size &&
                item.variant.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId: product._id,
                variant: {
                    size: variant.size,
                    color: variant.color
                },
                quantity,
                priceAtAddTime
            });
        }

        await cart.save();

        const updatedCart = await cart.populate("items.productId", "name basePrice discountPrice images");

        res.status(200).json({ success: true, cart: updatedCart });
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- UPDATE CART ITEM -------------------- //
export const updateCartItem = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const { itemId } = req.params;
        const { quantity } = req.body;

        if (!itemId || quantity === undefined) throw new ApiError("Missing required fields", 400);
        if (quantity < 1) throw new ApiError("Quantity must be at least 1", 400);

        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) throw new ApiError("Cart not found", 404);

        const item = cart.items.id(itemId);
        if (!item) throw new ApiError("Item not found", 404);

        item.quantity = quantity;
        await cart.save();

        const updatedCart = await cart.populate("items.productId", "name basePrice discountPrice images");

        res.status(200).json({ success: true, cart: updatedCart });
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- REMOVE CART ITEM -------------------- //
export const removeCartItem = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const { itemId } = req.params;
        if (!itemId) throw new ApiError("ItemId is required", 400);

        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) throw new ApiError("Cart not found", 404);

        const item = cart.items.id(itemId);
        if (!item) throw new ApiError("Item not found", 404);

        cart.items.pull(itemId);
        await cart.save();

        const updatedCart = await cart.populate("items.productId", "name basePrice discountPrice images");

        res.status(200).json({ success: true, cart: updatedCart });
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};
