import mongoose, { Schema } from "mongoose";

const userUploadSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        imageUrl: { type: String, required: true },
        processed: { type: Boolean, default: false },
        extractedAttributes: {
            gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
            skinTone: { type: String, enum: ["FAIR", "LIGHT", "MEDIUM", "OLIVE", "BROWN", "DARK"] },
            bodyType: { type: String, enum: ["SLIM", "ATHLETIC", "AVERAGE", "HEAVY", "CURVY"] }
        }
    },
    { timestamps: true }
);

export default mongoose.model("UserUpload", userUploadSchema);
