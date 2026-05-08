import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import stripeRoutes from "./routes/stripe.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import wishlistRoutes from "./routes/whishlist.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import contactRoutes from "./routes/email.routes.js";

const app = express();

// -------------------- MIDDLEWARE -------------------- //
// ⚠️ Stripe webhook MUST be first
app.use("/api/stripe", stripeRoutes);
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (optional)
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Logging (dev only)
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// CORS setup
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true, // allows cookies
    })
);

// -------------------- ROUTES -------------------- //
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/contact", contactRoutes);

// -------------------- HEALTH CHECK -------------------- //
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});

// -------------------- ERROR HANDLING -------------------- //
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || "Internal Server Error",
    });
});

export default app;
