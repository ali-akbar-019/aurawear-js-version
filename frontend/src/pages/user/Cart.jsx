// @ts-nocheck
import { Button } from '@/components/ui/button.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import { CreditCard, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';




export default function CartPage() {
    const { cart, removeItem: removeItemFromCart, updateItem } = useCart();
    const { isLoggedIn } = useAuth();
    // -------------------- Handlers --------------------
    const increaseQuantity = (itemId, currentQuantity) => {
        updateItem({ itemId, quantity: currentQuantity + 1 })
            .then(() => toast.success('Quantity increased!'))
            .catch(() => toast.error('Failed to update quantity'));
    };

    const decreaseQuantity = (itemId, currentQuantity) => {
        if (currentQuantity <= 1) return;
        updateItem({ itemId, quantity: currentQuantity - 1 })
            .then(() => toast.success('Quantity decreased!'))
            .catch(() => toast.error('Failed to update quantity'));
    };

    const handleRemoveItem = (itemId) => {
        removeItemFromCart(itemId)
            .then(() => toast('Item removed from cart'))
            .catch(() => toast.error('Failed to remove item'));
    };

    // -------------------- Derived Data --------------------
    const cartItems = cart?.items || [];

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + (item.productId.discountPrice || item.productId.basePrice) * item.quantity,
        0
    );
    const shipping = subtotal > 0 ? 199 : 0;
    const total = subtotal + shipping;

    // -------------------- Loading --------------------
    if (!isLoggedIn) {
        return (
            <main className="min-h-[88vh] flex items-center justify-center px-4">
                <div className="text-center space-y-4 max-w-md">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Please log in to view your cart
                    </h1>
                    <p className="text-muted-foreground">
                        You need to be logged in to access your cart and manage your items.
                    </p>
                    <Link to="/login">
                        <Button className="mt-4">
                            Login to your account
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }
    if (!cart) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg">Loading cart...</p>
            </div>
        );
    }

    // -------------------- Usage Example --------------------
    // You can now map cartItems in your JSX and call these handlers:
    // <button onClick={() => increaseQuantity(item._id, item.quantity)}>+</button>
    // <button onClick={() => decreaseQuantity(item._id, item.quantity)}>-</button>
    // <button onClick={() => handleRemoveItem(item._id)}>Remove</button>

    return (
        <section className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                        Your Cart
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Review your selected items and proceed to checkout.
                    </p>
                </div>

                {/* Cart Items */}
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col sm:flex-row bg-background border border-border rounded-lg shadow-sm overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="w-full sm:w-48 h-48 relative">
                                        <img
                                            src={item.productId.images[0]?.url || '/placeholder_men.jpg'}
                                            alt={item.productId.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {item.productId.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Size: {item.variant.size} | Color: {item.variant.color}
                                            </p>
                                            <p className="text-foreground font-semibold mt-2">
                                                Rs. {(item.productId.discountPrice || item.productId.basePrice).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Quantity & Remove */}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-border rounded-md overflow-hidden">
                                                <button
                                                    className="px-3 py-1 hover:bg-secondary transition"
                                                    onClick={() => decreaseQuantity(item._id, item.quantity)}
                                                >
                                                    <Minus className="w-4 h-4 text-foreground" />
                                                </button>
                                                <span className="px-4 py-1 text-foreground font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="px-3 py-1 hover:bg-secondary transition"
                                                    onClick={() => increaseQuantity(item._id, item.quantity)}
                                                >
                                                    <Plus className="w-4 h-4 text-foreground" />
                                                </button>
                                            </div>
                                            <button
                                                className="text-red-500 hover:text-red-600 transition"
                                                onClick={() => handleRemoveItem(item._id)}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary & Checkout */}
                        <div className="bg-background border border-border shadow-sm rounded-lg p-6 flex flex-col space-y-6">
                            <h2 className="text-xl font-semibold text-foreground">Summary</h2>

                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>Rs. {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Shipping</span>
                                <span>Rs. {shipping.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-foreground text-lg border-t border-border pt-2">
                                <span>Total</span>
                                <span>Rs. {total.toLocaleString()}</span>
                            </div>

                            <Link to="/checkout">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-background h-12 flex items-center justify-center gap-2">
                                    <CreditCard className="w-5 h-5" /> Proceed to Checkout
                                </Button>
                            </Link>
                        </div>

                    </div>
                ) : (
                    <div className="text-center py-20 px-6 bg-background border border-border rounded-xl shadow-md">
                        <p className="text-foreground text-lg font-medium mb-6">
                            Your cart is empty.
                        </p>
                        <Link to="/shop">
                            <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-6 rounded-lg shadow-sm transition-all duration-200">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
