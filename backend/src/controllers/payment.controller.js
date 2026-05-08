import { stripe } from "../config/stripe.js";
import { ApiError } from "../utils/apiError.js";
import Payment from "../models/Payment.model.js";
import Order from "../models/Order.model.js";

// -------------------- CREATE PAYMENT INTENT -------------------- //
export const createPaymentIntent = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const { orderId } = req.body;
        if (!orderId) throw new ApiError("OrderId is required", 400);

        const order = await Order.findById(orderId);
        if (!order) throw new ApiError("Order not found", 404);

        // Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.totalAmount * 100), // amount in cents
            currency: "usd",
            metadata: { orderId: order._id.toString() },
        });

        // Save Payment Record
        await Payment.create({
            orderId: order._id,
            stripePaymentIntentId: paymentIntent.id,
            amount: order.totalAmount,
            currency: "USD",
            status: "INITIATED",
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- VERIFY PAYMENT -------------------- //
export const verifyPayment = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const { paymentIntentId } = req.body;
        if (!paymentIntentId) throw new ApiError("PaymentIntentId is required", 400);

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntentId });
        if (!payment) throw new ApiError("Payment record not found", 404);

        // Map Stripe status to your enum
        let mappedStatus = "INITIATED";
        switch (paymentIntent.status) {
            case "succeeded":
                mappedStatus = "SUCCESS";
                break;
            case "requires_payment_method":
            case "requires_action":
            case "canceled":
                mappedStatus = "FAILED";
                break;
            default:
                mappedStatus = "INITIATED";
        }

        // Update payment record
        payment.status = mappedStatus;
        await payment.save();

        // Update order payment status
        const order = await Order.findById(payment.orderId);
        if (order) {
            order.paymentStatus = mappedStatus;
            await order.save();
        }

        res.status(200).json({
            success: true,
            paymentStatus: mappedStatus,
        });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};
