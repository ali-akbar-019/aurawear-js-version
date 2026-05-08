import { Heart, Share2 } from "lucide-react";

const WishlistAndShare = ({
    isInWishlist,
    productId,
    handleWishlist,
    wishlistLoading,
    handleShare,
}) => {
    return (
        <div className="flex gap-3 pt-2">
            <button
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className="flex-1 border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
            >
                <Heart
                    className={`w-5 h-5 transition-colors duration-300 ${isInWishlist(productId) ? "text-pink-500 fill-pink-500" : "text-foreground"
                        }`}
                />
                {isInWishlist(productId) ? "Wishlisted" : "Wishlist"}
            </button>

            <button
                onClick={handleShare}
                className="border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
            >
                <Share2 className="w-5 h-5" />
            </button>
        </div>
    );
};

export default WishlistAndShare;
