import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatCurrency } from '@/lib/currency.js';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function ProductCard({
    id,
    name,
    price,
    discountPrice,
    image,
    rating,
    reviewCount,
    category,
    inStock,
    colors = [],
}) {
    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isLoading: wishlistLoading,
    } = useWishlist();

    const { isLoggedIn } = useAuth();

    const { addItem } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const wishlisted = isInWishlist(id);

    const discountPercentage = discountPrice
        ? Math.round(((price - discountPrice) / price) * 100)
        : 0;

    const handleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn) {
            return toast.info("You are not logged in");
        }
        try {
            if (wishlisted) {
                await removeFromWishlist(id);
                toast.success('Removed from wishlist');
            } else {
                await addToWishlist(id);
                toast.success('Added to wishlist');
            }
        } catch (error) {
            console.error('Wishlist error:', error);
            toast.error('Something went wrong');
        }
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn) {
            return toast.info("You are not logged in");
        }
        if (!inStock) {
            toast.error('Sorry, this product is out of stock!');
            return;
        }

        const selectedColor = colors.length > 0 ? colors[0] : '';
        const selectedSize = 'M';

        const cartItem = {
            productId: id,
            name,
            color: selectedColor,
            size: selectedSize,
            quantity: 1,
            priceAtAddTime: discountPrice || price,
            image,
        };

        try {
            await addItem(cartItem);
            toast.success('Added to cart');
        } catch (error) {
            console.error('Add to cart error:', error);
            toast.error('Failed to add to cart');
        }
    };

    return (
        <Link to={`/shop/${id}`}>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
                <div className="relative overflow-hidden bg-gray-200 h-64 md:h-72">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {!inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                    )}

                    {discountPercentage > 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                            -{discountPercentage}%
                        </div>
                    )}

                    <button
                        onClick={handleWishlist}
                        disabled={wishlistLoading}
                        className={`absolute top-3 left-3 p-2 rounded-full transition-all ${wishlisted
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                            }`}
                    >
                        <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {inStock && isHovered && (
                        <button
                            onClick={handleAddToCart}
                            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{category}</p>
                    <h3 className="font-semibold text-gray-800 truncate mb-2">{name}</h3>

                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.round(rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-600">({reviewCount})</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                            {formatCurrency(discountPrice || price)}
                        </span>
                        {discountPrice && (
                            <span className="text-sm text-gray-500 line-through">
                                {formatCurrency(price)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
