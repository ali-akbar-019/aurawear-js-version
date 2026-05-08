import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentOrdersTable = ({ allOrders, users }) => {
    return (
        <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-800/50 shadow-xl mt-6">
            <CardHeader>
                <CardTitle className="text-white">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="px-4 py-3 text-left text-slate-300 font-semibold">Order ID</th>
                                <th className="px-4 py-3 text-left text-slate-300 font-semibold">User</th>
                                <th className="px-4 py-3 text-left text-slate-300 font-semibold">Amount</th>
                                <th className="px-4 py-3 text-left text-slate-300 font-semibold">Status</th>
                                <th className="px-4 py-3 text-left text-slate-300 font-semibold">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders?.slice(0, 10).map((o) => {
                                const userName = users?.find(u => u._id === o.userId)?.name ?? "Unknown";

                                const statusColor =
                                    o.orderStatus === "PENDING" ? "bg-amber-500/20 text-amber-300" :
                                        o.orderStatus === "PAID" ? "bg-blue-500/20 text-blue-300" :
                                            "bg-emerald-500/20 text-emerald-300";

                                const paymentColor =
                                    o.paymentStatus === "PENDING" ? "bg-amber-500/20 text-amber-300" :
                                        "bg-emerald-500/20 text-emerald-300";

                                return (
                                    <tr key={o._id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                        <td className="px-4 py-3 text-slate-300 font-mono text-xs">{o._id.slice(0, 8)}...</td>
                                        <td className="px-4 py-3 text-slate-200">{userName}</td>
                                        <td className="px-4 py-3 text-slate-200 font-semibold">${o.totalAmount.toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                                                {o.orderStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColor}`}>
                                                {o.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentOrdersTable;