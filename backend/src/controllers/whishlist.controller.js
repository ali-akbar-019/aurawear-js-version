import Wishlist from "../models/Whishlist.model.js";
import { ApiError } from "../utils/apiError.js";

// -------------------- GET WISHLIST -------------------- //
export const getWishlist = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const userId = req.user._id;

        let wishlist = await Wishlist.findOne({ userId }).populate({
            path: "items.productId",
        });

        if (!wishlist) {
            wishlist = await Wishlist.create({ userId, items: [] });
        }

        res.status(200).json({ success: true, wishlist });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ success: false, message: err.message });
    }
};

// -------------------- ADD TO WISHLIST -------------------- //
export const addToWishlist = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const userId = req.user._id;
        const { productId } = req.body;

        if (!productId) throw new ApiError("productId is required", 400);

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                userId,
                items: [{ productId }],
            });
        } else {
            const alreadyExists = wishlist.items.some(
                item => item.productId.toString() === productId
            );

            if (alreadyExists) {
                return res.status(200).json({
                    success: true,
                    message: "Product already in wishlist",
                    wishlist,
                });
            }

            wishlist.items.push({ productId });
            await wishlist.save();
        }

        res.status(200).json({ success: true, wishlist });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ success: false, message: err.message });
    }
};

// -------------------- REMOVE FROM WISHLIST -------------------- //
export const removeFromWishlist = async (req, res) => {
    try {
        if (!req.user) throw new ApiError("Unauthorized", 401);

        const userId = req.user._id;
        const { productId } = req.body;

        if (!productId) throw new ApiError("productId is required", 400);

        // Atomic removal
        await Wishlist.updateOne(
            { userId },
            { $pull: { items: { productId } } }
        );

        const updatedWishlist = await Wishlist.findOne({ userId }).populate({
            path: "items.productId",
            select: "name images basePrice discountPrice targetGroup fitType occasion",
        });

        res.status(200).json({
            success: true,
            wishlist: updatedWishlist,
        });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ success: false, message: err.message });
    }
};
