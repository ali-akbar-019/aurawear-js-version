import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createPaymentIntent, verifyPayment } from "../controllers/payment.controller.js";

const router = Router();

// -------------------- CREATE PAYMENT INTENT -------------------- //
router.post("/create-intent", authenticate, createPaymentIntent);

// -------------------- VERIFY PAYMENT -------------------- //
router.post("/verify", authenticate, verifyPayment);

export default router;
