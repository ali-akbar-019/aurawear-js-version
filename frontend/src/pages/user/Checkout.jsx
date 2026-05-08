
import { stripePromise } from "@/lib/stripe";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { CheckoutForm } from "@/components/users_pages/checkout/CheckoutForm.jsx";
import { OrderSummary } from "@/components/users_pages/checkout/OrderSummary.jsx";
import { useCart } from "@/contexts/CartContext.jsx";
import { useOrder } from "@/contexts/OrderContext.jsx";
import { toast } from "sonner";

const CheckoutPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [shipping, setShipping] = useState({
        fullName: "",
        addressLine: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        phone: ""
    });

    const isFormValid = Object.values(shipping).every(Boolean);

    const handlePay = async () => {
        if (!stripe || !elements) return;
        if (!isFormValid) {
            toast.error("Please fill out all shipping fields.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // ----------------- 1. Create Payment Intent -----------------
            const payload = {
                shippingAddress: shipping,
                cartItems,
            };

            const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/orders/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                credentials: 'include',
                body: JSON.stringify(payload),
            }).then(r => r.json());

            const clientSecret = res.clientSecret;
            if (!clientSecret) {
                throw new Error("Failed to create payment intent");
            }

            // ----------------- 2. Confirm Stripe Payment -----------------
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: shipping.fullName },
                },
            });

            if (result.error) {
                setError(result.error.message || "Payment failed");
                toast.error(result.error.message || "Payment failed");
                return;
            }

            if (result.paymentIntent?.status === "succeeded") {
                // ----------------- 3. Create Order AFTER payment success -----------------
                const orderRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/orders/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ shippingAddress: shipping }),
                    credentials: 'include',
                }).then(r => r.json());

                toast.success("Payment successful! Order created.");
                navigate(`/order-confirmation/${orderRes.order._id}`);
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const cartItems = cart?.items || [];
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + (item.productId.discountPrice || item.productId.basePrice) * item.quantity,
        0
    );
    const shippingCost = subtotal > 0 ? 199 : 0;
    const totalAmount = subtotal + shippingCost;

    if (!cart) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg">Loading cart...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT - Shipping & Payment */}
            <CheckoutForm
                shipping={shipping}
                setShipping={setShipping}
                error={error}
                loading={loading}
                stripe={stripe}
                handlePay={handlePay}
                isFormValid={isFormValid}
                totalAmount={totalAmount}
            />

            {/* RIGHT - Order Summary */}
            <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                totalAmount={totalAmount}
            />
        </div>
    );
};

const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <CheckoutPage />
            </div>
        </Elements>
    );
};

export default Checkout;
