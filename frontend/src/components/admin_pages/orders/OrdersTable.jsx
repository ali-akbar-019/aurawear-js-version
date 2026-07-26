import { useNavigate } from "react-router-dom";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Trash2, Eye } from "lucide-react";

const OrdersTable = ({
    allOrders,
    orderStatuses,
    statusColors,
    paymentStatusColors,
    handleStatusUpdate,
    setSelectedOrder,
    setDeleteDialogOpen,
}) => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-slate-700 bg-slate-900/50 hover:bg-slate-900/50">
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Order ID</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden md:table-cell">Customer</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Amount</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Status</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden lg:table-cell">Payment</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden lg:table-cell">Created</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 text-right">Actions</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {allOrders.map((order) => {
                            const statusColor = statusColors[order.orderStatus];
                            const paymentColor = paymentStatusColors[order.paymentStatus] || "text-slate-400";

                            return (
                                <TableRow
                                    key={order._id}
                                    className="border-b border-slate-700 hover:bg-slate-800/50 transition duration-150"
                                >
                                    <TableCell className="py-4 px-4">
                                        <span className="font-mono text-xs text-slate-300">{order._id.substring(0, 8)}...</span>
                                    </TableCell>

                                    <TableCell className="py-4 px-4 hidden md:table-cell">
                                        <p className="text-white font-medium text-sm">{order.shippingAddress.fullName}</p>
                                    </TableCell>

                                    <TableCell className="py-4 px-4">
                                        <span className="text-green-400 font-semibold">Rs. {order.totalAmount.toFixed(2)}</span>
                                    </TableCell>

                                    <TableCell className="py-4 px-4">
                                        <Select
                                            value={order.orderStatus}
                                            onValueChange={(val) => handleStatusUpdate(order._id, val)}
                                        >
                                            <SelectTrigger className={`w-36 ${statusColor.bg} border-slate-600 text-white`}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-slate-700">
                                                {orderStatuses.map((status) => (
                                                    <SelectItem key={status} value={status} className="text-white">{status}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>

                                    <TableCell className="py-4 px-4 hidden text-white lg:table-cell">
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${paymentColor}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </TableCell>

                                    <TableCell className="py-4 px-4 hidden lg:table-cell">
                                        <span className="text-slate-300 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </TableCell>

                                    <TableCell className="py-4 px-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition"
                                                onClick={() => navigate(`/admin/manage-orders/detail/${order._id}`)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setDeleteDialogOpen(true);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrdersTable;