import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        parentId: { type: mongoose.Types.ObjectId, ref: "Category", default: null }
    },
    { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
