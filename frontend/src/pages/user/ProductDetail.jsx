import { useAddProductReviewMutation, useDeleteReviewMutation, useProductReviewsQuery, useUpdateReviewMutation } from '@/api/reviews';
import { Loading } from '@/components/Layout/Loading';
import ImageGallery from '@/components/users_pages/product_detail/ImageGallery';
import RelatedProducts from '@/components/users_pages/product_detail/RelatedProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useProduct } from '@/contexts/ProductContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Check, Heart, Share2, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';



// Color mapping for variant selection
const colorMap = {
    Red: 'bg-red-500',
    Blue: 'bg-blue-500',
    Green: 'bg-green-500',
    Yellow: 'bg-yellow-500',
    Orange: 'bg-orange-500',
    Purple: 'bg-purple-500',
    Pink: 'bg-pink-500',
    Black: 'bg-black',
    White: 'bg-white',
    Gray: 'bg-gray-500',
    Brown: 'bg-amber-800',
    Beige: 'bg-amber-200',
    Navy: 'bg-blue-900',
    Maroon: 'bg-red-900',
    Gold: 'bg-yellow-600',
    Teal: 'bg-teal-500',
    Cyan: 'bg-cyan-500',
    Indigo: 'bg-indigo-500',
    Lime: 'bg-lime-500',
    Olive: 'bg-lime-700',
    Turquoise: 'bg-teal-400',
    Magenta: 'bg-pink-400',
    Violet: 'bg-violet-500',
};



export default function ProductPage() {
    const { id } = useParams();
    const { getProductById, products } = useProduct();
    const [loading, setLoading] = useState(true);
    // 
    const { isLoggedIn } = useAuth();
    // reviews
    // Reviews state
    const [reviewPage, setReviewPage] = useState(1);
    const [reviewLimit] = useState(5); // 5 reviews per page
    const [newReview, setNewReview] = useState({
        rating: 5,
        title: '',
        comment: ''
    });
    const updateReviewMutation = useUpdateReviewMutation();
    const deleteReviewMutation = useDeleteReviewMutation();
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editingReviewData, setEditingReviewData] = useState({
        rating: 5,
        title: '',
        comment: ''
    });
    // cart
    const { addItem } = useCart();
    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isLoading: wishlistLoading,
    } = useWishlist();
    // Fetch the product
    const product = getProductById(id);
    // check if its available ,else just load
    useEffect(() => {
        if (product) setLoading(false);
    }, [product]);
    // 


    // review
    const { data: reviewsData, isLoading: reviewsLoading, isError: reviewsError } =
        useProductReviewsQuery(product?._id || '', reviewPage, reviewLimit);

    const addReviewMutation = useAddProductReviewMutation();
    // Build all colors and sizes from variants
    const colors = Array.from(new Set(product?.variants?.map(v => v.color) || []));
    const allSizes = Array.from(new Set(product?.variants?.map(v => v.size) || []));

    // Selected color, size, quantity, etc.
    const [selectedColor, setSelectedColor] = useState(colors[0] || '');
    const [selectedSize, setSelectedSize] = useState(allSizes[0] || '');
    const [quantity, setQuantity] = useState(1);

    // Sizes available for the selected color
    const availableSizes = product?.variants
        ?.filter(v => v.color === selectedColor)
        .map(v => v.size) || [];

    // Ensure selected size is valid whenever color changes
    useEffect(() => {
        if (!availableSizes.includes(selectedSize)) {
            setSelectedSize(availableSizes[0] || '');
        }
    }, [selectedColor, availableSizes]);

    // Selected variant & stock
    const selectedVariant = product?.variants?.find(
        v => v.color === selectedColor && v.size === selectedSize
    );
    const stock = selectedVariant?.stock || 0;
    const isOutOfStock = stock === 0;

    // Discount calculation
    const discount = product?.discountPrice
        ? Math.round(((product.basePrice - product.discountPrice) / product.basePrice) * 100)
        : 0;


    // -------------------- Handlers --------------------
    // reviews
    const handleAddReview = async () => {
        if (!newReview.comment.trim()) {
            toast.error('Please enter a comment for your review.');
            return;
        }

        try {
            await addReviewMutation.mutateAsync({
                productId: product?._id,
                data: newReview,
            });

            toast.success('Review submitted successfully!');
            setNewReview({ rating: 5, title: '', comment: '' });
            setReviewPage(1); // reset to first page to show the new review
        } catch (err) {
            console.error('Failed to submit review:', err);
            toast.error(err.message || 'Failed to submit review.');
        }
    };
    // Start editing a review
    const startEditReview = (review) => {
        setEditingReviewId(review._id);
        setEditingReviewData({
            rating: review.rating,
            title: review.title || '',
            comment: review.comment || ''
        });
    };

    // Cancel editing
    const cancelEditReview = () => {
        setEditingReviewId(null);
        setEditingReviewData({ rating: 5, title: '', comment: '' });
    };

    // Submit review update
    const handleUpdateReview = async () => {
        if (editingReviewData && editingReviewData.comment && !editingReviewData.comment.trim()) {
            toast.error('Please enter a comment.');
            return;
        }

        try {
            await updateReviewMutation.mutateAsync({
                reviewId: editingReviewId,
                data: editingReviewData
            });

            toast.success('Review updated!');
            cancelEditReview();
            setReviewPage(1); // refresh first page
        } catch (err) {
            toast.error(err.message || 'Failed to update review.');
        }
    };

    // Delete review
    const handleDeleteReview = async (reviewId) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            await deleteReviewMutation.mutateAsync(reviewId);
            toast.success('Review deleted!');
            setReviewPage(1); // refresh first page
        } catch (err) {
            toast.error(err.message || 'Failed to delete review.');
        }
    };

    // Add to Cart
    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            return toast.error("You are not logged in");
        }
        if (isOutOfStock) {
            toast.error('Sorry, this variant is out of stock!');
            return;
        }

        if (!selectedColor || !selectedSize) {
            toast.error('Please select a color and size.');
            return;
        }

        const cartItem = {
            productId: product?._id,
            name: product?.name,
            size: selectedSize,
            color: selectedColor,
            quantity,
            priceAtAddTime: product?.discountPrice || product?.basePrice,
            image: product?.images?.[0]?.url || '',
        };

        try {
            await addItem(cartItem); // Add to cart API
            toast.success('Added to cart successfully!');

            // Dispatch custom event for other listeners (optional)
            window.dispatchEvent(new CustomEvent('cartAdded', { detail: cartItem }));
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add to cart. Please try again.');
        }
    };

    // wishlist real
    const handleWishlist = async () => {
        if (!isLoggedIn) {
            return toast.error("You are not logged in");
        }
        if (!product?._id) return;

        try {
            if (isInWishlist(product._id)) {
                await removeFromWishlist(product._id);
                toast.success('Removed from wishlist');
            } else {
                await addToWishlist(product._id);
                toast.success('Added to wishlist');
            }
        } catch (err) {
            console.error('Wishlist error:', err);
            toast.error('Failed to update wishlist');
        }
    };

    // Share product
    const handleShare = async () => {
        if (!navigator.clipboard) {
            toast.error('Clipboard not supported on this browser.');
            return;
        }

        try {
            const productUrl = `${window.location.origin}/shop/${product?._id}`;
            await navigator.clipboard.writeText(productUrl);
            toast.success('Product link copied to clipboard!');
            console.log('Sharing product:', productUrl);
        } catch (error) {
            console.error('Failed to copy link:', error);
            toast.error('Failed to copy link. Please try manually.');
        }
    };

    if (loading || !products) {
        return <Loading text="Loading products..." size="lg" />;
    }


    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumbs - Subtle Navigation */}
            <div className="border-b border-border/40 bg-background/60 backdrop-blur-sm sticky top-0 z-40" data-aos="fade-top" >
                <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-muted-foreground tracking-wide">
                    <Link to="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <span className="mx-2 opacity-30">/</span>
                    <Link to="/shop" className="hover:text-foreground transition-colors">
                        Shop
                    </Link>
                    <span className="mx-2 opacity-30">/</span>
                    <Link
                        to={`/shop?search=${product?.targetGroup?.toLowerCase()}`}
                        className="hover:text-foreground transition-colors"
                    >
                        {product?.targetGroup
                            ?.toLowerCase()
                            ?.replace(/^./, (c) => c.toUpperCase())}
                    </Link>
                    <span className="mx-2 opacity-30">/</span>
                    <span className="text-foreground font-medium">{product?.name}</span>
                </div>
            </div>

            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-8">
                        {product && <ImageGallery product={product} />}
                        {/* Reviews Section */}
                        <div className="mt-16 pt-12 border-t border-border/40" data-aos="fade-up" >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-foreground mb-2">Customer Reviews</h2>
                                <p className="text-sm text-muted-foreground">Share your experience with this product</p>
                            </div>

                            {/* Add Review Form */}
                            <div className="bg-secondary/30 border border-border/40 rounded-2xl p-8 mb-12 space-y-6 backdrop-blur-sm">
                                <h3 className="font-semibold text-lg text-foreground">Write a Review</h3>

                                {/* Star Rating */}
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground">Your rating:</span>
                                    <div className="flex items-center gap-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className={`text-3xl transition-all duration-200 hover:scale-110 ${star <= newReview.rating ? 'text-yellow-400' : 'text-muted-foreground/30'
                                                    }`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Title & Comment */}
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Review title (optional)"
                                        className="w-full border border-border/40 rounded-lg px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                                        value={newReview.title}
                                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Share your thoughts about this product..."
                                        className="w-full border border-border/40 rounded-lg px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                                        rows={4}
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    />
                                </div>
                                <button
                                    onClick={handleAddReview}
                                    className="w-full bg-foreground text-background px-6 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition-all duration-200 active:scale-95"
                                >
                                    Submit Review
                                </button>
                            </div>

                            {/* Display Reviews */}
                            {reviewsLoading ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Loading reviews...</p>
                                </div>
                            ) : reviewsError ? (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-600">
                                    Failed to load reviews.
                                </div>
                            ) : reviewsData?.reviews.length === 0 ? (
                                <div className="text-center py-12 border-2 border-dashed border-border/30 rounded-xl">
                                    <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {reviewsData?.reviews.map((review) => (
                                        <div key={review._id} className="bg-secondary/30 border border-border/40 rounded-xl p-6 space-y-4 hover:border-border/60 transition-colors backdrop-blur-sm">
                                            {editingReviewId === review._id ? (
                                                // Editing Mode
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm text-muted-foreground">Edit rating:</span>
                                                        <div className="flex items-center gap-2">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <button
                                                                    key={star}
                                                                    onClick={() => setEditingReviewData({ ...editingReviewData, rating: star })}
                                                                    className={`text-2xl transition-all duration-200 hover:scale-110 ${star <= editingReviewData.rating ? 'text-yellow-400' : 'text-muted-foreground/30'
                                                                        }`}
                                                                >
                                                                    ★
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Review title (optional)"
                                                        className="w-full border border-border/40 rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                                                        value={editingReviewData.title}
                                                        onChange={(e) =>
                                                            setEditingReviewData({ ...editingReviewData, title: e.target.value })
                                                        }
                                                    />
                                                    <textarea
                                                        placeholder="Update your review..."
                                                        className="w-full border border-border/40 rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                                                        rows={4}
                                                        value={editingReviewData.comment}
                                                        onChange={(e) =>
                                                            setEditingReviewData({ ...editingReviewData, comment: e.target.value })
                                                        }
                                                    />
                                                    <div className="flex gap-3 pt-2">
                                                        <button
                                                            onClick={handleUpdateReview}
                                                            className="flex-1 bg-foreground text-background px-4 py-2 rounded-lg font-semibold hover:bg-foreground/90 transition-all"
                                                        >
                                                            Save Changes
                                                        </button>
                                                        <button
                                                            onClick={cancelEditReview}
                                                            className="flex-1 border border-border/40 text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-secondary/50 transition-all"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Display Mode
                                                <>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <span className="font-semibold text-foreground">{review.userId.name}</span>
                                                                <div className="flex gap-1 text-yellow-400">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <span key={i} className="text-base">{i < review.rating ? '★' : '☆'}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">
                                                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => startEditReview(review)}
                                                                className="text-xs text-foreground/60 hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary/50"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteReview(review._id)}
                                                                className="text-xs text-red-500/60 hover:text-red-500 transition-colors px-3 py-1.5 rounded-md hover:bg-red-500/10"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {review.title && <p className="font-semibold text-foreground text-lg">{review.title}</p>}
                                                    <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                                                </>
                                            )}
                                        </div>
                                    ))}

                                    {/* Pagination */}
                                    {reviewsData?.pagination?.totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-3 pt-8">
                                            <button
                                                onClick={() => setReviewPage((prev) => Math.max(prev - 1, 1))}
                                                disabled={reviewPage === 1}
                                                className="px-4 py-2 rounded-lg border border-border/40 text-sm font-medium hover:bg-secondary/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                ← Previous
                                            </button>
                                            <span className="text-sm text-muted-foreground">
                                                Page {reviewPage} of {reviewsData?.pagination?.totalPages}
                                            </span>
                                            <button
                                                onClick={() => setReviewPage((prev) => prev + 1)}
                                                disabled={reviewPage >= reviewsData?.pagination?.totalPages}
                                                className="px-4 py-2 rounded-lg border border-border/40 text-sm font-medium hover:bg-secondary/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                Next →
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-8 sticky top-24" data-aos="fade-left" >
                        {/* Header */}
                        <div className="space-y-4">
                            {/* Product Type */}
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest opacity-70">
                                {product?.productType}
                            </p>
                            {/* Product Name */}
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                                {product?.name}
                            </h1>

                            {/* Ratings & Reviews */}
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-lg">
                                                {i < product?.averageRating ? '★' : '☆'}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-foreground">
                                        {product?.averageRating?.toFixed(1)} ({product?.reviewCount} {product?.reviewCount === 1 ? 'review' : 'reviews'})
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="bg-secondary/30 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-baseline gap-4 mb-3">
                                <span className="text-4xl font-bold text-foreground">
                                    Rs. {product?.discountPrice || product?.basePrice}
                                </span>
                                {product?.discountPrice && (
                                    <>
                                        <span className="text-lg text-muted-foreground line-through opacity-60">
                                            Rs. {product?.basePrice}
                                        </span>
                                        <span className="inline-block bg-red-500/10 text-red-600 text-sm font-semibold px-3 py-1 rounded-full border border-red-500/20">
                                            Save {discount}%
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-3">
                                {isOutOfStock ? (
                                    <>
                                        <X className="w-5 h-5 text-red-600" />
                                        <span className="text-red-600 font-semibold">Out of Stock</span>
                                    </>
                                ) : stock < 5 ? (
                                    <>
                                        <X className="w-5 h-5 text-orange-600" />
                                        <span className="text-orange-600 font-semibold">
                                            Only {stock} left in stock
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-5 h-5 text-green-600" />
                                        <span className="text-green-600 font-semibold">In Stock</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-base text-muted-foreground leading-relaxed">
                            {product?.description}
                        </p>

                        {/* Divider */}
                        <div className="w-full h-px bg-border/40" />
                        {/* Color Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-foreground">
                                    Color
                                </label>
                                <span className="text-sm text-muted-foreground">{selectedColor}</span>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 ${selectedColor === color
                                            ? 'border-foreground ring-2 ring-offset-2 ring-foreground'
                                            : 'border-border/40 hover:border-border'
                                            } ${colorMap[color]}`}
                                        title={color}
                                        aria-label={`Select color ${color}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-foreground">
                                    Size
                                </label>
                                <span className="text-sm text-muted-foreground">{selectedSize}</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {allSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        disabled={!availableSizes.includes(size)}
                                        className={`px-5 py-2.5 border-2 rounded-lg font-medium transition-all duration-200 text-sm ${selectedSize === size
                                            ? 'border-foreground bg-foreground text-background'
                                            : 'border-border/40 text-foreground hover:border-border disabled:opacity-30 disabled:cursor-not-allowed'
                                            }`}
                                        aria-label={`Select size ${size}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <div className="flex items-center border border-border/40 rounded-lg bg-secondary/20 backdrop-blur-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-5 py-3 text-foreground hover:bg-secondary/50 transition-colors font-semibold"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="px-6 py-3 text-foreground font-bold min-w-16 text-center border-l border-r border-border/40">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-5 py-3 text-foreground hover:bg-secondary/50 transition-colors font-semibold"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className="flex-1 bg-primary text-background px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Wishlist & Share */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleWishlist}
                                disabled={wishlistLoading}
                                className="flex-1 border border-border/40 text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
                            >
                                <Heart
                                    className={`w-5 h-5 transition-all duration-300 ${isInWishlist(product?._id) ? 'text-pink-500 fill-pink-500' : 'text-foreground'
                                        }`}
                                />
                                {isInWishlist(product?._id) ? 'Wishlisted' : 'Add to Wishlist'}
                            </button>

                            <button
                                onClick={handleShare}
                                className="border border-border/40 text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
                            >
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-border/40" />

                        {/* Product Details Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Fit Type', value: product?.fitType?.replace(/_/g, ' ') },
                                { label: 'Occasion', value: product?.occasion },
                                { label: 'Stitch Type', value: product?.stitchType?.replace(/_/g, ' ') },
                                { label: 'Target Group', value: product?.targetGroup }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-secondary/20 rounded-lg p-3 backdrop-blur-sm border border-border/20">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide opacity-70">{item.label}</p>
                                    <p className="text-foreground font-semibold text-sm mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* AI Recommendations */}
                        <div className="bg-gradient-to-br from-secondary/40 to-secondary/20 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                <span className="text-lg">✨</span> AI Styling Recommendations
                            </h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    <span className="font-semibold text-foreground block mb-1">Best for body types:</span>
                                    {product?.aiAttributes?.suitableBodyTypes?.join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <span className="font-semibold text-foreground block mb-1">Suitable skin tones:</span>
                                    {product?.aiAttributes?.suitableSkinTones?.join(', ') || 'N/A'}
                                </p>
                                {product?.aiAttributes?.recommendedHeightRange && (
                                    <p>
                                        <span className="font-semibold text-foreground block mb-1">Recommended height:</span>
                                        {product.aiAttributes.recommendedHeightRange.min}ft - {product.aiAttributes.recommendedHeightRange.max}ft
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-20 pt-16 border-t border-border/40">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-foreground mb-2">You May Also Like</h2>
                        <p className="text-sm text-muted-foreground">Explore similar products</p>
                    </div>
                    <RelatedProducts products={products} currentProductId={product?._id} />
                </div>
            </div>
        </div>
    );
}
