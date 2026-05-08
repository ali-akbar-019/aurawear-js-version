import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Package, AlertCircle } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Replace with your actual API helper
import { fetchOrderById } from "@/api/orders";

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderId) {
            setError("Invalid order ID");
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await fetchOrderById(orderId);
                if (!res) {
                    setError("Order not found");
                } else {
                    setOrder(res);
                }
            } catch (err) {
                console.error("Order fetch error:", err);
                setError("Failed to load order. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    // -------------------- LOADING STATE --------------------
    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
                <Skeleton className="h-10 w-1/3 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                    <Skeleton className="h-60 w-full" />
                </div>
            </div>
        );
    }

    // -------------------- ERROR STATE --------------------
    if (error) {
        return (
            <div className="text-center py-16 space-y-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                <p className="text-red-600 font-medium">{error}</p>
                <Link to="/" className="text-primary underline">
                    Go Home
                </Link>
            </div>
        );
    }

    // -------------------- SUCCESS STATE --------------------
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
            {/* HEADER */}
            <div className="text-center space-y-3">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h1 className="text-3xl font-bold">Order Confirmed</h1>
                <p className="text-muted-foreground">
                    Thank you for your purchase! Your order has been placed successfully.
                </p>
                <p className="text-sm">
                    <span className="font-medium">Order ID:</span>{" "}
                    <span className="text-muted-foreground">{order?._id || "-"}</span>
                </p>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-8">
                    {/* ITEMS */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Order Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {order?.items?.map((item, idx) => (
                                <div key={item._id || idx} className="flex gap-4">
                                    <div className="w-16 h-20 rounded-md border bg-muted flex items-center justify-center text-xs">
                                        No Image
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{item.name || "-"}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.color || "-"} • {item.size || "-"}
                                        </p>
                                        <p className="text-sm mt-1">
                                            Rs. {item.price || 0} × {item.quantity || 0}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* SHIPPING */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                            <p className="font-medium">{order.shippingAddress?.fullName || "-"}</p>
                            <p>{order.shippingAddress?.addressLine || "-"}</p>
                            <p>
                                {order.shippingAddress?.city || "-"}, {order.shippingAddress?.state || "-"}{" "}
                                {order.shippingAddress?.postalCode || "-"}
                            </p>
                            <p>{order.shippingAddress?.country || "-"}</p>
                            <p className="text-muted-foreground">
                                Phone: {order.shippingAddress?.phone || "-"}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex justify-between items-center">
                            <span>Status</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                                {order.orderStatus || "-"}
                            </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Payment</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                                {order.paymentStatus || "-"}
                            </Badge>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span>Rs. {order.totalAmount || 0}</span>
                        </div>

                        <Separator />

                        <Button asChild className="w-full">
                            <Link to="/orders">View My Orders</Link>
                        </Button>

                        <Button asChild variant="outline" className="w-full">
                            <Link to="/">Continue Shopping</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrderConfirmation;
