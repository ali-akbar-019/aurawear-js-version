import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar, Package, MapPin } from "lucide-react";

const OrderInfoCards = ({
    order,
    orderStatuses,
    paymentStatuses,
    isUpdating,
    orderStatusColor,
    handleOrderStatusChange,
    handlePaymentStatusChange,
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Order Info */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Package className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-50">Order Information</h2>
                </div>

                <div className="space-y-4">
                    <div className="border-b border-slate-700 pb-4">
                        <p className="text-slate-400 text-sm font-medium">Customer</p>
                        <p className="text-white font-medium mt-1">{order.shippingAddress.fullName}</p>
                    </div>

                    <div className="border-b border-slate-700 pb-4">
                        <p className="text-slate-400 text-sm font-medium">Total Amount</p>
                        <p className="text-2xl font-bold text-green-400 mt-1">Rs. {order.totalAmount.toFixed(2)}</p>
                    </div>

                    <div className="border-b border-slate-700 pb-4">
                        <p className="text-slate-400 text-sm font-medium mb-3">Order Status</p>
                        <Select
                            value={order.orderStatus}
                            disabled={isUpdating}
                            onValueChange={(val) => handleOrderStatusChange(val)}
                        >
                            <SelectTrigger className={`${orderStatusColor.bg} border-slate-600 text-white`}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                {orderStatuses.map((status) => (
                                    <SelectItem key={status} value={status} className="text-white">{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pb-4">
                        <p className="text-slate-400 text-sm font-medium mb-3">Payment Status</p>
                        <Select
                            value={order.paymentStatus}
                            disabled={isUpdating}
                            onValueChange={(val) => handlePaymentStatusChange(val)}
                        >
                            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                {paymentStatuses.map((status) => (
                                    <SelectItem key={status} value={status} className="text-white">{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <p className="text-slate-400 text-sm font-medium">Created</p>
                            </div>
                            <p className="text-white text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <p className="text-slate-400 text-sm font-medium">Updated</p>
                            </div>
                            <p className="text-white text-sm">{new Date(order.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-50">Shipping Address</h2>
                </div>

                <div className="space-y-3">
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Full Name</p>
                        <p className="text-white font-medium">{order.shippingAddress.fullName}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Address</p>
                        <p className="text-white">{order.shippingAddress.addressLine}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">City</p>
                            <p className="text-white">{order.shippingAddress.city}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">State</p>
                            <p className="text-white">{order.shippingAddress.state}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Country</p>
                            <p className="text-white">{order.shippingAddress.country}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Postal Code</p>
                            <p className="text-white">{order.shippingAddress.postalCode}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Phone</p>
                        <p className="text-white">{order.shippingAddress.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInfoCards;