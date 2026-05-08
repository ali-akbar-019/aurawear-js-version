import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
        gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
        preferredTargetGroup: {
            type: String,
            enum: ["MEN", "WOMEN", "KIDS", "UNISEX"]
        },
        skinTone: {
            type: String,
            enum: ["FAIR", "LIGHT", "MEDIUM", "OLIVE", "BROWN", "DARK"]
        },
        bodyType: {
            type: String,
            enum: ["SLIM", "ATHLETIC", "AVERAGE", "HEAVY", "CURVY"]
        },
        heightCm: { type: Number },
        weightKg: { type: Number }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
