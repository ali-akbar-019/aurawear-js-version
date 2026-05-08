import { useState } from "react";
import { Button } from "@/components/ui/button";

const ReviewsSection = ({
    reviewsData,
    reviewsLoading,
    reviewsError,
    onAddReview,
    onUpdateReview,
    onDeleteReview,
}) => {
    const [newReview, setNewReview] = useState({ rating: 0, title: "", comment: "" });
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editingReviewData, setEditingReviewData] = useState({ rating: 0, title: "", comment: "" });
    const [reviewPage, setReviewPage] = useState(1);

    const startEditReview = (review) => {
        setEditingReviewId(review._id);
        setEditingReviewData({ rating: review.rating, title: review.title || "", comment: review.comment });
    };

    const cancelEditReview = () => {
        setEditingReviewId(null);
        setEditingReviewData({ rating: 0, title: "", comment: "" });
    };

    const handleAddReview = () => {
        if (newReview.rating > 0 && newReview.comment.trim() !== "") {
            onAddReview(newReview);
            setNewReview({ rating: 0, title: "", comment: "" });
        }
    };

    const handleUpdateReview = () => {
        if (editingReviewId && editingReviewData.rating > 0 && editingReviewData.comment.trim() !== "") {
            onUpdateReview(editingReviewId, editingReviewData);
            cancelEditReview();
        }
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Customer Reviews</h2>

            <div className="bg-secondary p-4 rounded-lg mb-6 space-y-3">
                <h3 className="font-semibold text-foreground">Write a Review</h3>
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className={`text-xl transition ${star <= newReview.rating ? 'text-yellow-400' : 'text-muted-foreground'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Title (optional)"
                    className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                />
                <textarea
                    placeholder="Write your review..."
                    className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
                <Button onClick={handleAddReview} className="bg-foreground text-background px-6 py-2 rounded-lg font-semibold hover:bg-foreground/90 transition">
                    Submit Review
                </Button>
            </div>

            {reviewsLoading ? (
                <p className="text-muted-foreground">Loading reviews...</p>
            ) : reviewsError ? (
                <p className="text-red-600">Failed to load reviews.</p>
            ) : reviewsData?.reviews.length === 0 ? (
                <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            ) : (
                <div className="space-y-4">
                    {reviewsData.reviews.map((review) => (
                        <div key={review._id} className="bg-secondary p-4 rounded-lg space-y-1">
                            {editingReviewId === review._id ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setEditingReviewData({ ...editingReviewData, rating: star })}
                                                className={`text-xl ${star <= editingReviewData.rating ? 'text-yellow-400' : 'text-muted-foreground'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Title (optional)"
                                        className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
                                        value={editingReviewData.title}
                                        onChange={(e) => setEditingReviewData({ ...editingReviewData, title: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Write your review..."
                                        className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
                                        value={editingReviewData.comment}
                                        onChange={(e) => setEditingReviewData({ ...editingReviewData, comment: e.target.value })}
                                    />
                                    <div className="flex gap-2">
                                        <Button onClick={handleUpdateReview}>Save</Button>
                                        <Button onClick={cancelEditReview} variant="outline">Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-foreground">{review.userId.name}</span>
                                            <div className="flex gap-1 text-yellow-400">
                                                {[...Array(5)].map((_, i) => (i < review.rating ? '★' : '☆'))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                            <button onClick={() => startEditReview(review)} className="text-sm text-blue-500 hover:underline">
                                                Edit
                                            </button>
                                            <button onClick={() => onDeleteReview(review._id)} className="text-sm text-red-500 hover:underline">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    {review.title && <p className="font-semibold text-foreground">{review.title}</p>}
                                    <p className="text-muted-foreground">{review.comment}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewsSection;
