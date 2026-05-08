import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
    "MONGO_URI",
    "PORT",
    "CLIENT_URL",
    "JWT_SECRET",
    "STRIPE_SECRET_KEY"
];

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ Missing required environment variable: ${key}`);
        process.exit(1);
    }
});

export const env = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: Number(process.env.PORT) || 5000,
    CLIENT_URL: process.env.CLIENT_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
