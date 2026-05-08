import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        basePrice: { type: Number, required: true },
        discountPrice: { type: Number },

        targetGroup: {
            type: String,
            enum: ["MEN", "WOMEN", "KIDS", "UNISEX", "OTHER"],
            required: true
        },
        stitchType: {
            type: String,
            enum: ["STITCHED", "UNSTITCHED", "SEMI_STITCHED"],
            required: true
        },
        productType: { type: String, required: true },
        categoryId: { type: mongoose.Types.ObjectId, ref: "Category", required: true },

        fitType: { type: String, enum: ["SLIM_FIT", "REGULAR_FIT", "LOOSE_FIT"], required: true },
        occasion: { type: String, enum: ["CASUAL", "FORMAL", "PARTY", "ETHNIC"], required: true },

        aiAttributes: {
            suitableBodyTypes: { type: [String], default: [] },
            suitableSkinTones: { type: [String], default: [] },
            recommendedHeightRange: {
                min: { type: Number },
                max: { type: Number }
            }
        },

        variants: [
            {
                size: { type: String, required: true },
                color: { type: String, required: true },
                stock: { type: Number, required: true, default: 0 }
            }
        ],

        images: [
            {
                url: { type: String, required: true },
                isPrimary: { type: Boolean, default: false }
            }
        ],
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        reviewCount: {
            type: Number,
            default: 0,
        },

        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
