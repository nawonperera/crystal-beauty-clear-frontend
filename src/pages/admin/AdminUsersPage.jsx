import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSearch, FiUsers, FiUserCheck, FiUserX, FiMail, FiPhone, FiShield, FiAlertCircle } from "react-icons/fi";
import { MdBlock, MdCheckCircle } from "react-icons/md";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [actionLoading, setActionLoading] = useState(null);

    const fetchUsers = () => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user").then((response) => {
            setUsers(response.data);
            setLoaded(true);
        });
    };

    // Initial load
    useEffect(() => {
        fetchUsers();
    }, []);

    // Polling for real-time updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchUsers();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let result = users;
        
        // Filter by search term
        if (searchTerm) {
            result = result.filter(user => 
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Filter by status
        if (filterStatus === "active") {
            result = result.filter(user => !user.isDisabled);
        } else if (filterStatus === "blocked") {
            result = result.filter(user => user.isDisabled);
        }
        
        setFilteredUsers(result);
    }, [searchTerm, filterStatus, users]);

    async function blockUser(email) {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login to block a user");
            return;
        }
        setActionLoading(email);
        try {
            await axios.patch(
                import.meta.env.VITE_BACKEND_URL + "/api/user/block/" + email,
                { isDisabled: true },
                { headers: { Authorization: "Bearer " + token } }
            );
            setLoaded(false);
            toast.success("User blocked successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error blocking user");
        } finally {
            setActionLoading(null);
        }
    }

    async function unblockUser(email) {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login to unblock a user");
            return;
        }
        setActionLoading(email);
        try {
            await axios.patch(
                import.meta.env.VITE_BACKEND_URL + "/api/user/unblock/" + email,
                { isDisabled: false },
                { headers: { Authorization: "Bearer " + token } }
            );
            setLoaded(false);
            toast.success("User unblocked successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error unblocking user");
        } finally {
            setActionLoading(null);
        }
    }

    // Stats
    const totalUsers = users.length;
    const activeUsers = users.filter(u => !u.isDisabled).length;
    const blockedUsers = users.filter(u => u.isDisabled).length;

    return (
        <div className="w-full h-full p-6 bg-gray-50 overflow-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
                <p className="text-gray-500">Manage and monitor all registered users</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                        </div>
                        <div className="w-14 h-14 bg-[#1B9C85]/10 rounded-2xl flex items-center justify-center">
                            <FiUsers className="w-7 h-7 text-[#1B9C85]" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Active Users</p>
                            <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
                        </div>
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                            <FiUserCheck className="w-7 h-7 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Blocked Users</p>
                            <p className="text-3xl font-bold text-red-500">{blockedUsers}</p>
                        </div>
                        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                            <FiUserX className="w-7 h-7 text-red-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                        />
                    </div>
                    {/* Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={`px-5 py-3 rounded-xl font-medium transition-all ${
                                filterStatus === "all"
                                    ? "bg-[#1B9C85] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterStatus("active")}
                            className={`px-5 py-3 rounded-xl font-medium transition-all ${
                                filterStatus === "active"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilterStatus("blocked")}
                            className={`px-5 py-3 rounded-xl font-medium transition-all ${
                                filterStatus === "blocked"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            Blocked
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            {!loaded ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <FiAlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">User</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Contact</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Verified</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                    >
                                        {/* User Info */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#1B9C85] to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <FiShield className="w-3 h-3" />
                                                        {user.role || "user"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Contact */}
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-700 flex items-center gap-2">
                                                    <FiMail className="w-4 h-4 text-gray-400" />
                                                    {user.email}
                                                </p>
                                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                                    <FiPhone className="w-4 h-4 text-gray-400" />
                                                    {user.phone || "Not provided"}
                                                </p>
                                            </div>
                                        </td>
                                        {/* Status */}
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                                                user.isDisabled
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}>
                                                <span className={`w-2 h-2 rounded-full ${user.isDisabled ? "bg-red-500" : "bg-green-500"}`}></span>
                                                {user.isDisabled ? "Blocked" : "Active"}
                                            </span>
                                        </td>
                                        {/* Verified */}
                                        <td className="px-6 py-4 text-center">
                                            {user.isEmailVerified ? (
                                                <span className="inline-flex items-center gap-1 text-green-600">
                                                    <MdCheckCircle className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Verified</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-gray-400">
                                                    <FiAlertCircle className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Pending</span>
                                                </span>
                                            )}
                                        </td>
                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {user.isDisabled ? (
                                                    <button
                                                        onClick={() => unblockUser(user.email)}
                                                        disabled={actionLoading === user.email}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {actionLoading === user.email ? (
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <FiUserCheck className="w-4 h-4" />
                                                        )}
                                                        <span className="text-sm font-medium">Unblock</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => blockUser(user.email)}
                                                        disabled={actionLoading === user.email}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {actionLoading === user.email ? (
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <MdBlock className="w-4 h-4" />
                                                        )}
                                                        <span className="text-sm font-medium">Block</span>
                                                    </button>
                                                )}
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
                            Showing <span className="font-medium text-gray-700">{filteredUsers.length}</span> of <span className="font-medium text-gray-700">{totalUsers}</span> users
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersPage;
