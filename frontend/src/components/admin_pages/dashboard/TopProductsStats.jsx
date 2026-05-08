import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const TopProductsStats = ({ products, allOrders, totalRevenue }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Products */}
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-800/50 shadow-xl lg:col-span-2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Top Products</CardTitle>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {products?.slice(0, 8).map((p, i) => {

                            const isLowStock = p.variants?.some((v) => v.stock < 5);
                            return (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {p.images?.[0]?.url && (
                                            <img
                                                src={p.images[0].url}
                                                alt={p.name}
                                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                            />
                                        )}
                                        <div className="min-w-0">
                                            <p className="font-semibold text-white truncate">{p.name}</p>
                                            <p className="text-xs text-slate-400">
                                                ${(p.discountPrice ?? p.basePrice).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    {isLowStock && (
                                        <span className="ml-2 px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-full flex-shrink-0 whitespace-nowrap">
                                            Low Stock
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats Sidebar */}
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-800/50 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-white">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-xs text-slate-400 mb-1">Avg Order Value</p>
                            <p className="text-2xl font-bold text-white">
                                ${allOrders && allOrders.length > 0 ? (totalRevenue / allOrders.length).toFixed(2) : 0}
                            </p>
                        </div>
                        <div className="p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-xs text-slate-400 mb-1">Total Products</p>
                            <p className="text-2xl font-bold text-white">{products?.length ?? 0}</p>
                        </div>
                        <div className="p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-xs text-slate-400 mb-1">Pending Orders</p>
                            <p className="text-2xl font-bold text-white">
                                {allOrders?.filter(o => o.orderStatus === "PENDING").length ?? 0}
                            </p>
                        </div>
                        <div className="p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-xs text-slate-400 mb-1">Conversion Rate</p>
                            <p className="text-2xl font-bold text-white">3.8%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TopProductsStats;