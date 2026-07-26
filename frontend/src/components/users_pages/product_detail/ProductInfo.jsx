import { Check, Heart, Share2, ShoppingCart, X } from "lucide-react";
import { formatCurrency } from '@/lib/currency.js';

const colorMap = {
    "Navy Blue": "bg-blue-900",
    Maroon: "bg-red-900",
    Gold: "bg-yellow-600",
    Red: "bg-red-500",
    Blue: "bg-blue-500",
    Green: "bg-green-500",
    Yellow: "bg-yellow-500",
    Orange: "bg-orange-500",
    Purple: "bg-purple-500",
    Pink: "bg-pink-500",
    Teal: "bg-teal-500",
    Cyan: "bg-cyan-500",
    Indigo: "bg-indigo-500",
    Gray: "bg-gray-500",
    Black: "bg-black",
    White: "bg-white",
    Lime: "bg-lime-500",
    Olive: "bg-olive-500",
    Brown: "bg-amber-800",
    Turquoise: "bg-teal-400",
    Magenta: "bg-pink-400",
    Violet: "bg-violet-500",
};

export default function ProductInfo(props) {
    const {
        product,
        colors,
        selectedColor,
        setSelectedColor,
        allSizes,
        selectedSize,
        setSelectedSize,
        quantity,
        setQuantity,
        handleAddToCart,
        handleWishlist,
        isInWishlist,
        wishlistLoading,
        handleShare,
        reviewsLoading,
        reviewsError,
        reviewsData,
        newReview,
        setNewReview,
        handleAddReview,
        editingReviewId,
        editingReviewData,
        setEditingReviewData,
        startEditReview,
        cancelEditReview,
        handleUpdateReview,
        handleDeleteReview,
        reviewPage,
        setReviewPage,
    } = props;

    const availableSizes =
        product.variants
            ?.filter((v) => v.color === selectedColor)
            .map((v) => v.size) || [];

    const selectedVariant = product.variants?.find(
        (v) => v.color === selectedColor && v.size === selectedSize
    );

    const stock = selectedVariant?.stock || 0;
    const isOutOfStock = stock === 0;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                    {product.productType}
                </p>
                <h1 className="text-4xl font-bold text-foreground mb-3">
                    {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xl">
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(128 reviews)</span>
                </div>
            </div>

            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                    {formatCurrency(product.discountPrice || product.basePrice)}
                </span>
                {product.discountPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                        {formatCurrency(product.basePrice)}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2">
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

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="w-full h-px bg-border" />

            <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                    Color: <span className="font-normal">{selectedColor}</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-12 h-12 rounded-full border-2 transition ${selectedColor === color
                                ? "border-foreground ring-2 ring-offset-2 ring-foreground"
                                : "border-border hover:border-muted-foreground"
                                } ${colorMap[color]}`}
                            title={color}
                            aria-label={`Select color ${color}`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                    Size: <span className="font-normal">{selectedSize}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                    {allSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            disabled={!availableSizes.includes(size)}
                            className={`px-6 py-3 border-2 rounded-lg font-medium transition ${selectedSize === size
                                ? "border-foreground bg-foreground text-background"
                                : "border-border text-foreground hover:border-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 items-center pt-2">
                <div className="flex items-center border border-border rounded-lg">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-foreground hover:bg-secondary transition"
                    >
                        −
                    </button>
                    <span className="px-6 py-2 text-foreground font-semibold min-w-16 text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-foreground hover:bg-secondary transition"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 bg-foreground text-background px-8 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </button>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    onClick={handleWishlist}
                    disabled={wishlistLoading}
                    className="flex-1 border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors duration-300 ${isInWishlist(product._id) ? "text-pink-500 fill-pink-500" : "text-foreground"
                            }`}
                    />
                    {isInWishlist(product._id) ? "Wishlisted" : "Wishlist"}
                </button>
                <button
                    onClick={handleShare}
                    className="border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
                >
                    <Share2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
