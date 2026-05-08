import express from "express";
import { handleStripeWebhook } from "../config/stripe.js";

const router = express.Router();

// ❗ NO AUTH ❗ NO JSON ❗ RAW BODY ONLY
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    handleStripeWebhook
);

export default router;
