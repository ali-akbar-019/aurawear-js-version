
import { Badge } from "@/components/ui/badge.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { useOrder } from "@/contexts/OrderContext.jsx";
import { format } from "date-fns";
import { Calendar, DollarSign, Loader2, Package, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const Orders = () => {
    const { isLoading, myOrders } = useOrder();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(myOrders);
    }, [myOrders]);

    const totalSpent = orders && orders.reduce((acc, o) => acc + o.totalAmount, 0);

    const getStatusBadge = (status, type) => {
        const base = "uppercase text-xs font-semibold px-3 py-1 rounded-lg inline-flex items-center gap-1";
        if (type === "order") {
            switch (status) {
                case "PENDING": return <Badge className={`${base} bg-yellow-100 text-yellow-700 border border-yellow-200`}>{status}</Badge>;
                case "PAID": return <Badge className={`${base} bg-blue-100 text-blue-700 border border-blue-200`}>{status}</Badge>;
                case "SHIPPED": return <Badge className={`${base} bg-purple-100 text-purple-700 border border-purple-200`}>{status}</Badge>;
                case "DELIVERED": return <Badge className={`${base} bg-green-100 text-green-700 border border-green-200`}>{status}</Badge>;
                case "CANCELLED": return <Badge className={`${base} bg-red-100 text-red-700 border border-red-200`}>{status}</Badge>;
            }
        } else {
            switch (status) {
                case "INITIATED": return <Badge className={`${base} bg-slate-100 text-slate-700 border border-slate-200`}>{status}</Badge>;
                case "SUCCESS": return <Badge className={`${base} bg-green-100 text-green-700 border border-green-200`}>{status}</Badge>;
                case "FAILED": return <Badge className={`${base} bg-red-100 text-red-700 border border-red-200`}>{status}</Badge>;
            }
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                    <p className="text-slate-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-blue-100 rounded-lg">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
                        </div>
                        <p className="text-slate-600 text-sm ml-11">Track and manage all your purchases</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
                        <p className="text-slate-600 text-sm font-medium mb-1">Total Spent</p>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <span className="text-2xl font-bold text-slate-900">${totalSpent?.toFixed(2) || '0.00'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {orders && orders.length === 0 ? (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                        <Package className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 text-lg font-medium">You have no orders yet</p>
                    <p className="text-slate-500 text-sm mt-2">Start shopping to see your orders here</p>
                </div>
            ) : (
                <ScrollArea className="max-h-[120vh] pr-4 overflow-y-auto">
                    <div className="space-y-4">
                        {orders && orders.map((order) => (
                            <Card key={order._id} className="border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                                        {/* Items Section */}
                                        <div className="lg:col-span-2">
                                            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                                <Package className="w-4 h-4 text-slate-600" />
                                                Order Items
                                            </h3>
                                            <div className="space-y-3">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
                                                        <div className="flex-1">
                                                            <p className="font-medium text-slate-900">{item.name}</p>
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                <span className="text-xs bg-white text-slate-600 px-2 py-1 rounded border border-slate-200">{item.size}</span>
                                                                <div className="flex items-center gap-1">
                                                                    <div className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: item.color }}></div>
                                                                    <span className="text-xs text-slate-600">{item.color}</span>
                                                                </div>
                                                                <span className="text-xs bg-white text-slate-600 px-2 py-1 rounded border border-slate-200">Qty: {item.quantity}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right ml-4">
                                                            <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                            <p className="text-xs text-slate-500">${item.price}/each</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Status & Details Section */}
                                        <div className="lg:col-span-1 space-y-4">
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Order Status</h3>
                                                <div className="space-y-2">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-slate-600 font-medium">Order Status</span>
                                                        {getStatusBadge(order.orderStatus, "order")}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-slate-600 font-medium">Payment Status</span>
                                                        {getStatusBadge(order.paymentStatus, "payment")}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-slate-200 pt-4">
                                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Order Details</h3>
                                                <div className="space-y-3 text-sm">
                                                    <div className="flex items-start gap-2">
                                                        <Calendar className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-xs text-slate-600 font-medium">Ordered on</p>
                                                            <p className="text-slate-900">{format(new Date(order.createdAt), "PPP")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <DollarSign className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-xs text-slate-600 font-medium">Order Total</p>
                                                            <p className="text-lg font-bold text-slate-900">${order.totalAmount.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
};

export default Orders;
