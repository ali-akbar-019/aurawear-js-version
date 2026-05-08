import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
                name: { type: String, required: true },
                size: { type: String, required: true },
                color: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true }
            }
        ],
        totalAmount: { type: Number, required: true },
        orderStatus: {
            type: String,
            enum: ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED", "CONFIRMED"],
            default: "PENDING"
        },
        paymentStatus: {
            type: String,
            enum: ["INITIATED", "SUCCESS", "FAILED"],
            default: "INITIATED"
        },
        shippingAddress: {
            fullName: { type: String, required: true },
            addressLine: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            postalCode: { type: String, required: true },
            phone: { type: String, required: true }
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
