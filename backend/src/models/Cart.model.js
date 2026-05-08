import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema(
    {
        productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
        variant: {
            size: { type: String, required: true },
            color: { type: String, required: true }
        },
        quantity: { type: Number, required: true, default: 1 },
        priceAtAddTime: { type: Number, required: true }
    },
    { _id: true }
);

const cartSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
        items: [cartItemSchema]
    },
    { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
