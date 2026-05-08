import { stripe } from "../config/stripe.js";
import Cart from "../models/Cart.model.js";
import Order from "../models/Order.model.js";
import Payment from "../models/Payment.model.js";
import { ApiError } from "../utils/apiError.js";

// payment intent
export const createPaymentIntent = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        // Fetch user's cart with product info
        const cart = await Cart.findOne({ userId: req.user._id }).populate(
            "items.productId",
            "name basePrice discountPrice"
        );

        if (!cart || cart.items.length === 0) throw new ApiError("Cart is empty", 400);

        // Calculate total
        const totalAmount = cart.items.reduce(
            (sum, item) =>
                sum + (item.productId.discountPrice || item.productId.basePrice) * item.quantity,
            0
        );

        // Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // in cents
            currency: "usd",
        });

        res.status(201).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- CREATE ORDER (CHECKOUT) -------------------- //
export const createOrder = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const { shippingAddress } = req.body;

        // Fetch user's cart with product info
        const cart = await Cart.findOne({ userId: req.user._id }).populate(
            "items.productId",
            "name basePrice discountPrice"
        );

        if (!cart || cart.items.length === 0) throw new ApiError("Cart is empty", 400);

        // Map cart items to order items
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            name: item.productId.name,
            size: item.variant.size,
            color: item.variant.color,
            price: item.priceAtAddTime,
            quantity: item.quantity,
        }));

        // Calculate total
        const totalAmount = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // Create order now that payment succeeded
        const order = await Order.create({
            userId: req.user._id,
            items: orderItems,
            totalAmount,
            orderStatus: "CONFIRMED",
            paymentStatus: "SUCCESS",
            shippingAddress,
        });

        // Clear cart
        await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

        res.status(201).json({
            success: true,
            order,
        });
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- GET CURRENT USER ORDERS -------------------- //
export const getMyOrders = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- GET ORDER BY ID -------------------- //
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const order = await Order.findById(id);
        if (!order) throw new ApiError("Order not found", 404);

        res.status(200).json({ success: true, order });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- GET ALL ORDERS (ADMIN) -------------------- //
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- UPDATE ORDER STATUS (ADMIN) -------------------- //
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
        if (!order) throw new ApiError("Order not found", 404);

        res.status(200).json({ success: true, order });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};
