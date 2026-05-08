import mongoose, { Schema } from "mongoose";

const wishlistItemSchema = new Schema(
    {
        productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
        addedAt: { type: Date, default: Date.now },
    },
    { _id: true }
);

const wishlistSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
        items: [wishlistItemSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
