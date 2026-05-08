import User from "../models/User.model.js";
import { ApiError } from "../utils/apiError.js";

// -------------------- GET ALL USERS (ADMIN) -------------------- //
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().select("-passwordHash");
        res.status(200).json({ success: true, users });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- GET USER BY ID (ADMIN) -------------------- //
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-passwordHash");
        if (!user) throw new ApiError("User not found", 404);

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- DELETE USER (ADMIN) -------------------- //
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) throw new ApiError("User not found", 404);

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- UPDATE USER PROFILE -------------------- //
export const updateUserProfile = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const { name, email } = req.body;

        // Optional: check if email is taken
        if (email && email !== req.user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new ApiError("Email already in use", 400);
        }

        req.user.name = name || req.user.name;
        req.user.email = email || req.user.email;

        await req.user.save();

        res.status(200).json({
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                gender: req.user.gender,
                skinTone: req.user.skinTone,
                bodyType: req.user.bodyType,
                preferredTargetGroup: req.user.preferredTargetGroup
            },
        });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- UPDATE AI ATTRIBUTES -------------------- //
export const updateUserAIAttributes = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const { gender, skinTone, bodyType, heightCm, weightKg, preferredTargetGroup } = req.body;

        req.user.gender = gender || req.user.gender;
        req.user.skinTone = skinTone || req.user.skinTone;
        req.user.bodyType = bodyType || req.user.bodyType;
        req.user.heightCm = heightCm || req.user.heightCm;
        req.user.weightKg = weightKg || req.user.weightKg;
        req.user.preferredTargetGroup = preferredTargetGroup || req.user.preferredTargetGroup;

        await req.user.save();

        res.status(200).json({
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                gender: req.user.gender,
                skinTone: req.user.skinTone,
                bodyType: req.user.bodyType,
                heightCm: req.user.heightCm,
                weightKg: req.user.weightKg,
                preferredTargetGroup: req.user.preferredTargetGroup
            },
        });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};
