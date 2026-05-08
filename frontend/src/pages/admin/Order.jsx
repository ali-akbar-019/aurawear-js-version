
import OrdersTable from "@/components/admin_pages/orders/OrdersTable.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.jsx"
import { useOrder } from "@/contexts/OrderContext.jsx"
import { CheckCircle2, Clock, Loader2, ShoppingBag, TrendingUp } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

// --------------------
// Constants
// --------------------
export const orderStatuses = [
    "PENDING",
    "PAID",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
];
export const statusColors = {
    PENDING: {
        bg: "bg-yellow-500/10",
        text: "text-yellow-500",
        badge: "bg-yellow-500/20 text-yellow-400",
    },
    PAID: {
        bg: "bg-blue-500/10",
        text: "text-blue-500",
        badge: "bg-blue-500/20 text-blue-400",
    },
    CONFIRMED: {
        bg: "bg-indigo-500/10",
        text: "text-indigo-500",
        badge: "bg-indigo-500/20 text-indigo-400",
    },
    SHIPPED: {
        bg: "bg-purple-500/10",
        text: "text-purple-500",
        badge: "bg-purple-500/20 text-purple-400",
    },
    DELIVERED: {
        bg: "bg-green-500/10",
        text: "text-green-500",
        badge: "bg-green-500/20 text-green-400",
    },
    CANCELLED: {
        bg: "bg-red-500/10",
        text: "text-red-500",
        badge: "bg-red-500/20 text-red-400",
    },
};
export const paymentStatusColors = {
    INITIATED: {
        text: "text-yellow-500",
        badge: "bg-yellow-500/20 text-yellow-400",
    },
    SUCCESS: {
        text: "text-green-500",
        badge: "bg-green-500/20 text-green-400",
    },
    FAILED: {
        text: "text-red-500",
        badge: "bg-red-500/20 text-red-400",
    },
};

// --------------------
// Page
// --------------------
export default function ManageOrdersPage() {
    const navigate = useNavigate()

    const {
        allOrders,
        isLoadingAllOrders,
        updateOrderStatus,
    } = useOrder()

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    // --------------------
    // Handlers
    // --------------------
    const handleStatusUpdate = async (
        orderId,
        newStatus
    ) => {
        try {
            await updateOrderStatus({ orderId, orderStatus: newStatus })
            toast.success("Order status updated successfully")
        } catch (err) {
            toast.error(err.message || "Failed to update order status")
        }
    }

    const handleCancelOrder = async () => {
        if (!selectedOrder) return

        try {
            await updateOrderStatus({
                orderId: selectedOrder._id,
                orderStatus: "CANCELLED",
            })

            toast.success("Order cancelled successfully")
            setDeleteDialogOpen(false)
            setSelectedOrder(null)
        } catch (err) {
            toast.error(err.message || "Failed to cancel order")
        }
    }

    // --------------------
    // Stats Calculations
    // --------------------
    const totalOrders = allOrders?.length || 0
    const totalRevenue = allOrders?.reduce((sum, order) => sum + order.totalAmount, 0) || 0
    const deliveredOrders = allOrders?.filter(order => order.orderStatus === "DELIVERED").length || 0
    const pendingOrders = allOrders?.filter(order => order.orderStatus === "PENDING").length || 0

    // --------------------
    // Loading State
    // --------------------
    if (isLoadingAllOrders) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
                    <p className="text-slate-300">Loading orders...</p>
                </div>
            </div>
        )
    }

    // --------------------
    // Empty State
    // --------------------
    if (!allOrders || allOrders.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="p-4 bg-slate-800/50 rounded-lg mb-4">
                        <ShoppingBag className="h-8 w-8 text-slate-400 mx-auto" />
                    </div>
                    <p className="text-slate-400 text-lg">No orders found.</p>
                    <p className="text-slate-500 text-sm mt-2">Start adding orders to see them here</p>
                </div>
            </div>
        )
    }

    // --------------------
    // UI
    // --------------------
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-indigo-500/20 rounded-lg">
                                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-50">Orders</h1>
                        </div>
                        <p className="text-slate-400 text-sm ml-11">Monitor and manage customer orders</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Total Orders</p>
                                <p className="text-2xl font-bold text-white mt-2">{totalOrders}</p>
                            </div>
                            <ShoppingBag className="w-8 h-8 text-indigo-400/50" />
                        </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Revenue</p>
                                <p className="text-2xl font-bold text-green-400 mt-2">${totalRevenue.toFixed(2)}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-400/50" />
                        </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Delivered</p>
                                <p className="text-2xl font-bold text-emerald-400 mt-2">{deliveredOrders}</p>
                            </div>
                            <CheckCircle2 className="w-8 h-8 text-emerald-400/50" />
                        </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Pending</p>
                                <p className="text-2xl font-bold text-amber-400 mt-2">{pendingOrders}</p>
                            </div>
                            <Clock className="w-8 h-8 text-amber-400/50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <OrdersTable
                allOrders={allOrders}
                orderStatuses={orderStatuses}
                statusColors={statusColors}
                paymentStatusColors={paymentStatusColors}
                handleStatusUpdate={handleStatusUpdate}
                setSelectedOrder={setSelectedOrder}
                setDeleteDialogOpen={setDeleteDialogOpen}
            />

            {/* Cancel Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="bg-slate-800 border border-slate-700 max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">Cancel Order</DialogTitle>
                    </DialogHeader>

                    <p className="text-slate-300">
                        Are you sure you want to cancel order{" "}
                        <strong className="text-white">{selectedOrder?._id.substring(0, 12)}...</strong>?
                    </p>

                    <DialogFooter className="mt-6 flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteDialogOpen(false)}
                            className="bg-slate-700 hover:bg-slate-600 text-white"
                        >
                            Keep Order
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleCancelOrder}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Cancel Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
