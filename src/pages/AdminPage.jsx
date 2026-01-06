import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { FiUsers, FiPackage, FiShoppingBag, FiLogOut, FiHome, FiSettings, FiMessageSquare, FiGrid } from "react-icons/fi";
import AdminProductsPage from "./admin/AdminProductsPage";
import AddProductForm from "./admin/AddProductForm";
import EditProduct from "./admin/EditProduct";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import AdminMessagesPage from "./admin/AdminMessagesPage";
import AdminDashboard from "./admin/AdminDashboard";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import AdminUsersPage from "./admin/AdminUsersPage";

const AdminPage = () => {
    const [userValidated, setUserValidated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You are not logged in");
            navigate("/login");
        } else {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    if (response.data.user.role === "admin") {
                        setUserValidated(true);
                        setUser(response.data.user);
                    } else {
                        toast.error("You are not an Admin");
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    toast.error("Something went wrong please login");
                    navigate("/login");
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const navItems = [
        { path: "/admin", icon: FiGrid, label: "Dashboard", exact: true },
        { path: "/admin/users", icon: FiUsers, label: "Users" },
        { path: "/admin/products", icon: FiPackage, label: "Products" },
        { path: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
        { path: "/admin/messages", icon: FiMessageSquare, label: "Messages" },
    ];

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    return (
        <div className="w-full min-h-screen h-screen bg-gray-100 flex">
            {userValidated ? (
                <>
                    {/* Sidebar */}
                    <div className="h-full w-[260px] bg-white border-r border-gray-200 flex flex-col">
                        {/* Logo Section */}
                        <div className="p-6 border-b border-gray-100">
                            <Link to="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#1B9C85] to-emerald-400 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">C</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">CRISTAL</h1>
                                    <p className="text-xs text-gray-500">Admin Panel</p>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                                Menu
                            </p>
                            <div className="space-y-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.path, item.exact);
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                                active
                                                    ? "bg-[#1B9C85] text-white shadow-lg shadow-[#1B9C85]/30"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                        >
                                            <Icon className={`w-5 h-5 ${active ? "text-white" : "text-gray-500"}`} />
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="mt-8">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                                    Quick Links
                                </p>
                                <div className="space-y-1">
                                    <Link
                                        to="/"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <FiHome className="w-5 h-5 text-gray-500" />
                                        <span className="font-medium">View Store</span>
                                    </Link>
                                </div>
                            </div>
                        </nav>

                        {/* User Section */}
                        <div className="p-4 border-t border-gray-100">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#1B9C85] to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                                        {user?.firstName?.charAt(0) || "A"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 truncate">
                                            {user?.firstName} {user?.lastName}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    <span className="font-medium text-sm">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 h-full overflow-hidden">
                        <Routes path="/*">
                            <Route path="/" element={<AdminDashboard />} />
                            <Route path="/users" element={<AdminUsersPage />} />
                            <Route path="/products" element={<AdminProductsPage />} />
                            <Route path="/orders" element={<AdminOrdersPage />} />
                            <Route path="/messages" element={<AdminMessagesPage />} />
                            <Route path="/addProduct" element={<AddProductForm />} />
                            <Route path="/editProduct" element={<EditProduct />} />
                        </Routes>
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default AdminPage;
