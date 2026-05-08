
import DashboardCard from "@/components/admin_pages/dashboard/DashboardCard.jsx";
import DashboardChart from "@/components/admin_pages/dashboard/DashboardChart.jsx";
import RecentOrdersTable from "@/components/admin_pages/dashboard/RecentOrdersTable.jsx";
import TopProductsStats from "@/components/admin_pages/dashboard/TopProductsStats.jsx";
import { useOrder } from "@/contexts/OrderContext.jsx";
import { useProduct } from "@/contexts/ProductContext.jsx";
import { useUsers } from "@/contexts/UserContext.jsx";
import {
    AlertCircle,
    LucideDollarSign,
    LucideShoppingCart,
    LucideUsers,
    TrendingUp
} from "lucide-react";

const COLORS = ["#f59e0b", "#10b981", "#3b82f6"];

const Dashboard = () => {
    const { users } = useUsers();
    const { allOrders } = useOrder();
    const { products } = useProduct();

    // Prepare chart data dynamically
    const salesData = allOrders?.map((o) => ({
        date: new Date(o.createdAt).toLocaleDateString("en-US", { weekday: "short" }),
        orders: 1,
        revenue: o.totalAmount
    })).reduce((acc, curr) => {
        const existing = acc.find(a => a.date === curr.date);
        if (existing) {
            existing.orders += curr.orders;
            existing.revenue += curr.revenue;
        } else {
            acc.push({ ...curr });
        }
        return acc;
    }, []);

    const orderStatusData = [
        { name: "Pending", value: allOrders?.filter(o => o.orderStatus === "PENDING").length ?? 0 },
        { name: "Paid", value: allOrders?.filter(o => o.orderStatus === "PAID").length ?? 0 },
        { name: "Shipped", value: allOrders?.filter(o => o.orderStatus === "SHIPPED").length ?? 0 }
    ];

    const totalRevenue = allOrders?.reduce((sum, o) => sum + (o.totalAmount ?? 0), 0) ?? 0;
    const lowStockCount = products?.filter(p => p.variants?.some(v => v.stock < 5)).length ?? 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Main Container */}
            <div className="p-4 sm:p-6 lg:p-8">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                        AuraWear AI
                    </h1>
                    <p className="text-slate-400">Admin Dashboard</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <DashboardCard
                        title="Total Users"
                        value={users?.length ?? 0}
                        icon={LucideUsers}
                        iconBg="bg-blue-500/20"
                        iconColor="text-blue-400"
                        trendText="+12% this month"
                        trendColor="text-green-400"
                        trendIcon={TrendingUp}
                    />

                    <DashboardCard
                        title="Total Orders"
                        value={allOrders?.length ?? 0}
                        icon={LucideShoppingCart}
                        iconBg="bg-emerald-500/20"
                        iconColor="text-emerald-400"
                        trendText="+8% this week"
                        trendColor="text-green-400"
                        trendIcon={TrendingUp}
                    />

                    <DashboardCard
                        title="Revenue"
                        value={`$${totalRevenue.toLocaleString()}`}
                        icon={LucideDollarSign}
                        iconBg="bg-amber-500/20"
                        iconColor="text-amber-400"
                        trendText="+24% YoY"
                        trendColor="text-green-400"
                        trendIcon={TrendingUp}
                    />

                    <DashboardCard
                        title="Low Stock Items"
                        value={lowStockCount}
                        icon={AlertCircle}
                        iconBg="bg-red-500/20"
                        iconColor="text-red-400"
                        trendText="Requires attention"
                        trendColor="text-red-400"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <DashboardChart
                        title="Revenue & Orders Trend"
                        type="line"
                        data={salesData}
                        dataKeys={['orders', 'revenue']}
                        lineNames={['Orders', 'Revenue ($)']}
                        lineColors={['#3b82f6', '#10b981']}
                        height={300}
                        colSpan={2}
                    />

                    <DashboardChart
                        title="Order Status"
                        type="pie"
                        data={orderStatusData}
                        COLORS={COLORS}
                        height={300}
                    />
                </div>

                {/* Content Grid */}
                <TopProductsStats
                    products={products}
                    allOrders={allOrders}
                    totalRevenue={totalRevenue}
                />
                {/* Recent Orders Table */}
                <RecentOrdersTable allOrders={allOrders} users={users} />

            </div>
        </div>
    );
};

export default Dashboard;
