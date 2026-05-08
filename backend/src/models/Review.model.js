import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true,
        },

        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        title: {
            type: String,
            trim: true,
            maxlength: 100,
        },

        comment: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        isVerifiedPurchase: {
            type: Boolean,
            default: false,
        },

        isApproved: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
