import User from "../models/User.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { ApiError } from "../utils/apiError.js";

// -------------------- SIGNUP -------------------- //
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new ApiError("Email already in use", 400);

        const passwordHash = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            passwordHash,
        });

        const token = generateToken(user._id.toString());

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            .status(201)
            .json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- LOGIN -------------------- //
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new ApiError("Invalid email or password", 401);

        const isMatch = await comparePassword(password, user.passwordHash);
        if (!isMatch) throw new ApiError("Invalid email or password", 401);

        const token = generateToken(user._id.toString());

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            .status(200)
            .json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- LOGOUT -------------------- //
export const logout = async (_req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ success: true, message: "Logged out successfully" });
};

// -------------------- GET CURRENT USER -------------------- //
export const getMe = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });

    res.status(200).json({
        success: true,
        user: req.user
    });
};
