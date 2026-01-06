import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiUsers, FiPackage, FiShoppingBag, FiMessageSquare, FiTrendingUp, FiDollarSign, FiClock, FiCheckCircle, FiArrowRight } from "react-icons/fi";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalMessages: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        totalRevenue: 0,
        unreadMessages: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = { Authorization: "Bearer " + token };

        Promise.all([
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user", { headers }),
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product"),
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", { headers }),
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/message", { headers }),
        ])
            .then(([usersRes, productsRes, ordersRes, messagesRes]) => {
                const users = usersRes.data || [];
                const products = productsRes.data || [];
                const orders = ordersRes.data || [];
                const messages = messagesRes.data || [];

                const pendingOrders = orders.filter(o => o.status === "Pending").length;
                const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
                const totalRevenue = orders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);
                const unreadMessages = messages.filter(m => !m.read).length;

                setStats({
                    totalUsers: users.length,
                    totalProducts: products.length,
                    totalOrders: orders.length,
                    totalMessages: messages.length,
                    pendingOrders,
                    deliveredOrders,
                    totalRevenue,
                    unreadMessages,
                });

                setRecentOrders(orders.slice(0, 5));
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching stats:", err);
                setLoading(false);
            });
    }, []);

    const statCards = [
        { label: "Total Users", value: stats.totalUsers, icon: FiUsers, color: "from-blue-500 to-blue-600", link: "/admin/users" },
        { label: "Total Products", value: stats.totalProducts, icon: FiPackage, color: "from-purple-500 to-purple-600", link: "/admin/products" },
        { label: "Total Orders", value: stats.totalOrders, icon: FiShoppingBag, color: "from-orange-500 to-orange-600", link: "/admin/orders" },
        { label: "Messages", value: stats.totalMessages, icon: FiMessageSquare, color: "from-pink-500 to-pink-600", link: "/admin/messages", badge: stats.unreadMessages },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-yellow-100 text-yellow-700";
            case "Processing": return "bg-blue-100 text-blue-700";
            case "Delivered": return "bg-green-100 text-green-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#1B9C85] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-6 bg-gray-50 overflow-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-500">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Link
                            key={index}
                            to={stat.link}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                {stat.badge > 0 && (
                                    <span className="px-2.5 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                                        {stat.badge} new
                                    </span>
                                )}
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </Link>
                    );
                })}
            </div>

            {/* Revenue & Orders Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#1B9C85] to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <FiDollarSign className="w-6 h-6" />
                        </div>
                        <FiTrendingUp className="w-6 h-6 opacity-80" />
                    </div>
                    <p className="text-white/80 text-sm mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold">LKR {stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-white/60 text-sm mt-2">From {stats.deliveredOrders} delivered orders</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <FiClock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-1">Pending Orders</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
                    <p className="text-gray-400 text-sm mt-2">Awaiting processing</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <FiCheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-1">Delivered Orders</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.deliveredOrders}</p>
                    <p className="text-gray-400 text-sm mt-2">Successfully completed</p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                        <p className="text-gray-500 text-sm">Latest customer orders</p>
                    </div>
                    <Link
                        to="/admin/orders"
                        className="flex items-center gap-2 text-[#1B9C85] font-medium hover:gap-3 transition-all"
                    >
                        View All
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {recentOrders.length === 0 ? (
                    <div className="p-12 text-center">
                        <FiShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No orders yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Order ID</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.orderId} className="border-t border-gray-50 hover:bg-gray-50/50">
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-900">#{order.orderId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{order.name}</p>
                                            <p className="text-sm text-gray-500">{order.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(order.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-bold text-gray-900">LKR {order.total.toFixed(2)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
