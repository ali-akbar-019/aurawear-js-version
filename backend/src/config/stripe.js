import Stripe from "stripe";
import Order from "../models/Order.model.js";
import Payment from "../models/Payment.model.js";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16"
});

export const handleStripeWebhook = async (req, res) => {
    const signature = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("❌ Webhook signature verification failed", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {

        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;

            if (!orderId) break;

            await Order.findByIdAndUpdate(orderId, {
                paymentStatus: "SUCCESS",
                orderStatus: "PAID"
            });

            await Payment.findOneAndUpdate(
                { stripePaymentIntentId: paymentIntent.id },
                { status: "SUCCESS" }
            );

            break;
        }

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;

            if (!orderId) break;

            await Order.findByIdAndUpdate(orderId, {
                paymentStatus: "FAILED",
                orderStatus: "CANCELLED"
            });

            await Payment.findOneAndUpdate(
                { stripePaymentIntentId: paymentIntent.id },
                { status: "FAILED" }
            );

            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};
