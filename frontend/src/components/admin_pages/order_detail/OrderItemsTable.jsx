import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { CreditCard } from "lucide-react";

const OrderItemsTable = ({ order }) => {
    return (
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <CreditCard className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-50">Order Items</h2>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-slate-700 bg-slate-900/50 hover:bg-slate-900/50">
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Product</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Size</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Color</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Price</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Qty</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 text-right">Subtotal</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow
                                key={item._id}
                                className="border-b border-slate-700 hover:bg-slate-800/50 transition duration-150"
                            >
                                <TableCell className="py-4 px-4 text-white font-medium">{item.name}</TableCell>
                                <TableCell className="py-4 px-4 text-slate-300">{item.size}</TableCell>
                                <TableCell className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-slate-300">{item.color}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-4 text-green-400 font-semibold">Rs. {item.price.toFixed(2)}</TableCell>
                                <TableCell className="py-4 px-4 text-slate-300">{item.quantity}</TableCell>
                                <TableCell className="py-4 px-4 text-right text-green-400 font-semibold">
                                    Rs. {(item.price * item.quantity).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrderItemsTable;