
import OrderInfoCards from "@/components/admin_pages/order_detail/OrderInfoCards.jsx"
import OrderItemsTable from "@/components/admin_pages/order_detail/OrderItemsTable.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.jsx"
import { useOrder } from "@/contexts/OrderContext.jsx"
import { ArrowLeft, Loader2, Package, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { orderStatuses, paymentStatusColors, statusColors } from "./Order.jsx"

// --------------------
// Constants
// --------------------

const paymentStatuses = [
    "INITIATED",
    "SUCCESS",
    "FAILED",
]



// --------------------
// Page
// --------------------
export default function OrderDetailPage() {
    const navigate = useNavigate()
    const { orderId } = useParams()
    const { allOrders, updateOrderStatus, isLoadingAllOrders } = useOrder()

    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    // --------------------
    // Get Order
    // --------------------
    const order = useMemo(
        () => allOrders?.find(o => o._id === orderId),
        [allOrders, orderId]
    )

    // --------------------
    // Guards
    // --------------------
    if (isLoadingAllOrders) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
                    <p className="text-slate-300">Loading order...</p>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="p-4 bg-slate-800/50 rounded-lg mb-4">
                        <Package className="h-8 w-8 text-slate-400 mx-auto" />
                    </div>
                    <p className="text-slate-400 text-lg">Order not found.</p>
                </div>
            </div>
        )
    }

    // --------------------
    // Handlers
    // --------------------
    const handleOrderStatusChange = async (status) => {
        try {
            setIsUpdating(true)
            await updateOrderStatus({
                orderId: order._id,
                orderStatus: status,
            })
            toast.success("Order status updated")
        } catch (err) {
            toast.error(err.message || "Failed to update order status")
        } finally {
            setIsUpdating(false)
        }
    }

    const handlePaymentStatusChange = async (
        status
    ) => {
        try {
            setIsUpdating(true)
            await updateOrderStatus({
                orderId: order._id,
                paymentStatus: status,
            })
            toast.success("Payment status updated")
        } catch (err) {
            toast.error(err.message || "Failed to update payment status")
        } finally {
            setIsUpdating(false)
        }
    }

    const handleCancelOrder = async () => {
        try {
            setIsUpdating(true)
            await updateOrderStatus({
                orderId: order._id,
                orderStatus: "CANCELLED",
            })
            toast.success("Order cancelled successfully")
            setCancelDialogOpen(false)
        } catch (err) {
            toast.error(err.message || "Failed to cancel order")
        } finally {
            setIsUpdating(false)
        }
    }

    const orderStatusColor = statusColors[order.orderStatus]
    const paymentStatusColor = paymentStatusColors[order.paymentStatus]

    // --------------------
    // UI
    // --------------------
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(-1)}
                            className="text-slate-300 hover:bg-slate-800"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-50">Order Details</h1>
                            <p className="text-slate-400 text-sm font-mono mt-1">ID: {order._id.substring(0, 16)}...</p>
                        </div>
                    </div>

                    <Button
                        disabled={order.orderStatus === "CANCELLED" || isUpdating}
                        onClick={() => setCancelDialogOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white gap-2 h-11 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center"
                    >
                        <Trash2 className="h-4 w-4" />
                        Cancel Order
                    </Button>
                </div>

                {/* Status Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`${orderStatusColor.bg} border border-slate-700 rounded-lg p-4 backdrop-blur`}>
                        <p className="text-slate-400 text-sm font-medium mb-2">Order Status</p>
                        <p className={`text-xl font-bold ${orderStatusColor.text}`}>{order.orderStatus}</p>
                    </div>
                    <div className={`bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur`}>
                        <p className="text-slate-400 text-sm font-medium mb-2">Payment Status</p>
                        <p className={`text-xl font-bold ${paymentStatusColor.text}`}>{order.paymentStatus}</p>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <OrderInfoCards
                order={order}
                orderStatuses={orderStatuses}
                paymentStatuses={paymentStatuses}
                isUpdating={isUpdating}
                orderStatusColor={orderStatusColor}
                handleOrderStatusChange={handleOrderStatusChange}
                handlePaymentStatusChange={handlePaymentStatusChange}
            />

            {/* Items */}
            <OrderItemsTable order={order} />
            {/* Cancel Dialog */}
            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <DialogContent className="bg-slate-800 border border-slate-700 max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">Cancel Order</DialogTitle>
                    </DialogHeader>

                    <p className="text-slate-300">
                        Are you sure you want to cancel order{" "}
                        <strong className="text-white">{order._id.substring(0, 16)}...</strong>?
                    </p>

                    <DialogFooter className="mt-6 flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setCancelDialogOpen(false)}
                            className="bg-slate-700 hover:bg-slate-600 text-white"
                        >
                            Keep Order
                        </Button>
                        <Button
                            onClick={handleCancelOrder}
                            disabled={isUpdating}
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
