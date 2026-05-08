import mongoose from "mongoose";
import Review from "../models/Review.model.js";
import Product from "../models/Product.model.js";

/**
 * ADD REVIEW
 * POST /reviews/product/:productId
 */
export const addReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, title, comment } = req.body;
        const userId = req.user._id;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Prevent duplicate reviews (extra safety, DB already enforces this)
        const existingReview = await Review.findOne({ productId, userId });
        if (existingReview) {
            return res.status(409).json({ message: "You already reviewed this product" });
        }

        const review = await Review.create({
            productId,
            userId,
            rating,
            title,
            comment,
            isVerifiedPurchase: false, // can be updated later
        });

        // 🔥 Atomic product rating update
        const newReviewCount = (product.reviewCount || 0) + 1;
        const newAverageRating =
            ((product.averageRating || 0) * (newReviewCount - 1) + rating) /
            newReviewCount;

        product.reviewCount = newReviewCount;
        product.averageRating = Number(newAverageRating.toFixed(2));
        await product.save();

        return res.status(201).json({
            message: "Review added successfully",
            review,
        });
    } catch (error) {
        console.error("Add review error:", error);
        return res.status(500).json({ message: "Failed to add review" });
    }
};

/**
 * GET REVIEWS BY PRODUCT
 * GET /reviews/product/:productId
 */
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [reviews, total] = await Promise.all([
            Review.find({ productId, isApproved: true })
                .populate("userId", "name avatar")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Review.countDocuments({ productId, isApproved: true }),
        ]);

        return res.status(200).json({
            reviews,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get reviews error:", error);
        return res.status(500).json({ message: "Failed to fetch reviews" });
    }
};

/**
 * UPDATE REVIEW (OWN)
 * PUT /reviews/:reviewId
 */
export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, title, comment } = req.body;
        const userId = req.user._id;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        // If rating changes → update product average
        if (rating && rating !== review.rating) {
            const product = await Product.findById(review.productId);
            if (product) {
                const totalRating =
                    (product.averageRating || 0) * (product.reviewCount || 1) -
                    review.rating +
                    rating;

                product.averageRating = Number(
                    (totalRating / (product.reviewCount || 1)).toFixed(2)
                );
                await product.save();
            }

            review.rating = rating;
        }

        if (title !== undefined) review.title = title;
        if (comment !== undefined) review.comment = comment;

        await review.save();

        return res.status(200).json({
            message: "Review updated successfully",
            review,
        });
    } catch (error) {
        console.error("Update review error:", error);
        return res.status(500).json({ message: "Failed to update review" });
    }
};

/**
 * DELETE REVIEW (OWN)
 * DELETE /reviews/:reviewId
 */
export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const product = await Product.findById(review.productId);

        await review.deleteOne();

        // Update product rating safely
        if (product && product.reviewCount > 1) {
            const newCount = product.reviewCount - 1;
            const newAverage =
                ((product.averageRating || 0) * (product.reviewCount || 1) -
                    review.rating) /
                newCount;

            product.reviewCount = newCount;
            product.averageRating = Number(newAverage.toFixed(2));
            await product.save();
        } else if (product) {
            product.reviewCount = 0;
            product.averageRating = 0;
            await product.save();
        }

        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Delete review error:", error);
        return res.status(500).json({ message: "Failed to delete review" });
    }
};
