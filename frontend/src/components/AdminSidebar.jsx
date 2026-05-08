import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import {
    Bell,
    ChevronLeft,
    Cpu,
    Crown,
    Grid,
    Home,
    LogOut,
    Menu,
    Package,
    Settings,
    Shirt,
    ShoppingCart,
    Users,
    X
} from "lucide-react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function Sidebar({ children }) {
    const pathname = useLocation();
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user, logout } = useAuth();

    const links = [
        { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
        { name: "Manage Users", icon: Users, path: "/admin/manage-users" },
        { name: "Manage Products", icon: Package, path: "/admin/manage-products" },
        { name: "Manage Categories", icon: Grid, path: "/admin/manage-categories" },
        { name: "Manage Orders", icon: ShoppingCart, path: "/admin/manage-orders" },
        { name: "Manage AI", icon: Cpu, path: "/admin/manage-ai" },
        { name: "Settings", icon: Settings, path: "/admin/settings" },
    ];


    const handleLogout = async () => {
        try {
            setLoading(true)
            // await logoutUser()
            await logout()

            toast.success("Logged out successfully", {
                description: "Redirecting to login page...",
            })
            navigate("/login")
        } catch (error) {
            toast.error("Logout failed", {
                description: "Please try again.",
            })
        } finally {
            setLoading(false)
        }
    }

    const getInitials = (name) => {
        return name && name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={`hidden lg:flex flex-col bg-slate-900/50 border-r border-slate-700 backdrop-blur-sm transition-all duration-300 ${collapsed ? "w-20" : "w-72"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-700 h-16">
                    {!collapsed && (
                        <Link to={"/"}>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/25">
                                    <Shirt className="w-6 h-6 text-white" />
                                </div>
                                <div></div>
                            </div>
                        </Link>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                        <ChevronLeft className={`w-5 h-5 text-slate-400 transition-transform ${collapsed ? "rotate-180" : ""}`} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    {links.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname.pathname === link.path
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-2 transition-all ${isActive
                                        ? "bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500"
                                        : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                                    }`}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {!collapsed && <span className="text-sm font-medium">{link.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {user && (
                    <div className="border-t border-slate-700 p-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-indigo-600">{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            {!collapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-50 truncate">{user.name}</p>
                                    <p className="text-xs text-slate-400 truncate">{user.role}</p>
                                </div>
                            )}
                            <Button
                                onClick={handleLogout}
                                disabled={loading}
                                variant="ghost"
                                size="icon"
                                className="text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                            >
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/50 rounded-lg text-white"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {mobileOpen && (
                    <div className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-700 z-40 overflow-y-auto">
                        <div className="p-4 border-b border-slate-700">
                            <Link to={"/"}>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                                        <Shirt className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="font-bold text-white">AuraWear</span>
                                </div>
                            </Link>
                        </div>

                        <nav className="px-3 py-4">
                            {links.map((link) => {
                                const Icon = link.icon
                                const isActive = pathname.pathname === link.path
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-2 ${isActive
                                                ? "bg-indigo-600/20 text-indigo-400"
                                                : "text-slate-400 hover:bg-slate-700/50"
                                            }`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-sm font-medium">{link.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                )}

                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
