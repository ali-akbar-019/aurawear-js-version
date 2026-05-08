import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-clothing";

    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected!");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB error:", err);
});
