import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { FiX, FiSearch, FiShoppingBag, FiDollarSign, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiPackage, FiMail, FiPhone, FiMapPin, FiCalendar, FiEye } from "react-icons/fi";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modelIsDisplaying, setModelIsDisplaying] = useState(false);
    const [displayingOrder, setDisplayingOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [statusLoading, setStatusLoading] = useState(null);

    const fetchOrders = () => {
        const token = localStorage.getItem("token");
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers: { Authorization: "Bearer " + token },
            })
            .then((response) => {
                setOrders(response.data);
                setLoaded(true);
            });
    };

    // Initial load
    useEffect(() => {
        fetchOrders();
    }, []);

    // Polling for real-time updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let result = orders;
        
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            result = result.filter(order =>
                (order.orderId && order.orderId.toLowerCase().includes(search)) ||
                (order.email && order.email.toLowerCase().includes(search)) ||
                (order.name && order.name.toLowerCase().includes(search)) ||
                (order.phoneNumber && order.phoneNumber.includes(search))
            );
        }
        
        if (filterStatus !== "all") {
            result = result.filter(order => order.status === filterStatus);
        }
        
        setFilteredOrders(result);
    }, [searchTerm, filterStatus, orders]);

    function changeOrderStatus(orderId, status) {
        setStatusLoading(orderId);
        const token = localStorage.getItem("token");
        axios
            .put(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId, 
                { status },
                { headers: { Authorization: "Bearer " + token } }
            )
            .then(() => {
                toast.success("Order status updated");
                setLoaded(false);
            })
            .catch(() => {
                toast.error("Failed to update status");
            })
            .finally(() => {
                setStatusLoading(null);
            });
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Delivered": return "bg-green-100 text-green-700 border-green-200";
            case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending": return <FiClock className="w-4 h-4" />;
            case "Processing": return <FiTruck className="w-4 h-4" />;
            case "Delivered": return <FiCheckCircle className="w-4 h-4" />;
            case "Cancelled": return <FiXCircle className="w-4 h-4" />;
            default: return <FiPackage className="w-4 h-4" />;
        }
    };

    // Stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === "Pending").length;
    const processingOrders = orders.filter(o => o.status === "Processing").length;
    const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
    const totalRevenue = orders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="w-full h-full p-6 bg-gray-50 overflow-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
                <p className="text-gray-500">Manage and track customer orders</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#1B9C85]/10 rounded-xl flex items-center justify-center">
                            <FiShoppingBag className="w-6 h-6 text-[#1B9C85]" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <FiClock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Processing</p>
                            <p className="text-2xl font-bold text-blue-600">{processingOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FiTruck className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Delivered</p>
                            <p className="text-2xl font-bold text-green-600">{deliveredOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <FiCheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Revenue</p>
                            <p className="text-2xl font-bold text-[#1B9C85]">LKR {totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#1B9C85]/10 rounded-xl flex items-center justify-center">
                            <FiDollarSign className="w-6 h-6 text-[#1B9C85]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by order ID, email, or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {["all", "Pending", "Processing", "Delivered", "Cancelled"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                                    filterStatus === status
                                        ? status === "all" ? "bg-[#1B9C85] text-white"
                                        : status === "Pending" ? "bg-yellow-500 text-white"
                                        : status === "Processing" ? "bg-blue-500 text-white"
                                        : status === "Delivered" ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {status === "all" ? "All" : status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            {!loaded ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Order</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Address</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Total</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order.orderId} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        {/* Order Info */}
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">#{order.orderId}</p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                    <FiCalendar className="w-3 h-3" />
                                                    {new Date(order.date).toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    })}
                                                </p>
                                            </div>
                                        </td>
                                        {/* Customer */}
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.name}</p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <FiMail className="w-3 h-3" />
                                                    {order.email}
                                                </p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <FiPhone className="w-3 h-3" />
                                                    {order.phoneNumber}
                                                </p>
                                            </div>
                                        </td>
                                        {/* Address */}
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 flex items-start gap-1 max-w-[200px]">
                                                <FiMapPin className="w-3 h-3 mt-1 flex-shrink-0" />
                                                <span className="line-clamp-2">{order.address}</span>
                                            </p>
                                        </td>
                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => changeOrderStatus(order.orderId, e.target.value)}
                                                    disabled={statusLoading === order.orderId}
                                                    className={`px-3 py-2 rounded-lg border font-medium text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B9C85] ${getStatusColor(order.status)} ${statusLoading === order.orderId ? 'opacity-50' : ''}`}
                                                >
                                                    <option value="Pending">⏳ Pending</option>
                                                    <option value="Processing">🚚 Processing</option>
                                                    <option value="Delivered">✅ Delivered</option>
                                                    <option value="Cancelled">❌ Cancelled</option>
                                                </select>
                                            </div>
                                        </td>
                                        {/* Total */}
                                        <td className="px-6 py-4 text-right">
                                            <p className="font-bold text-gray-900">LKR {order.total.toFixed(2)}</p>
                                            <p className="text-xs text-gray-500">{order.billItems?.length || 0} items</p>
                                        </td>
                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => {
                                                        setModelIsDisplaying(true);
                                                        setDisplayingOrder(order);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 bg-[#1B9C85] text-white rounded-lg hover:bg-[#158a74] transition-all"
                                                >
                                                    <FiEye className="w-4 h-4" />
                                                    Details
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Table Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-700">{filteredOrders.length}</span> of <span className="font-medium text-gray-700">{totalOrders}</span> orders
                        </p>
                    </div>
                </div>
            )}

            {/* Order Details Modal */}
            {modelIsDisplaying && displayingOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#1B9C85] to-emerald-500">
                            <div className="flex items-center justify-between">
                                <div className="text-white">
                                    <h2 className="text-2xl font-bold">Order #{displayingOrder.orderId}</h2>
                                    <p className="text-white/80 text-sm mt-1">
                                        {new Date(displayingOrder.date).toLocaleDateString('en-US', { 
                                            weekday: 'long',
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setModelIsDisplaying(false)}
                                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {/* Order Summary */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Status</p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(displayingOrder.status)}`}>
                                        {getStatusIcon(displayingOrder.status)}
                                        {displayingOrder.status}
                                    </span>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                    <p className="text-xl font-bold text-[#1B9C85]">LKR {displayingOrder.total.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                                <div className="space-y-2 text-sm">
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <span className="font-medium text-gray-900">{displayingOrder.name}</span>
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FiMail className="w-4 h-4 text-gray-400" />
                                        {displayingOrder.email}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FiPhone className="w-4 h-4 text-gray-400" />
                                        {displayingOrder.phoneNumber}
                                    </p>
                                    <p className="flex items-start gap-2 text-gray-600">
                                        <FiMapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                        {displayingOrder.address}
                                    </p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Order Items ({displayingOrder.billItems?.length || 0})</h3>
                                <div className="space-y-3">
                                    {displayingOrder.billItems?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                                <img
                                                    src={item.image}
                                                    alt={item.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 truncate">{item.productName}</h4>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">LKR {item.price.toFixed(2)}</p>
                                                <p className="text-xs text-gray-500">each</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Order Total</p>
                                    <p className="text-2xl font-bold text-gray-900">LKR {displayingOrder.total.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => setModelIsDisplaying(false)}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;
