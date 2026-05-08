import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        orderId: { type: mongoose.Types.ObjectId, ref: "Order", required: true },
        stripePaymentIntentId: { type: String, required: true, unique: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true, default: "USD" },
        status: { type: String, enum: ["INITIATED", "SUCCESS", "FAILED"], required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
