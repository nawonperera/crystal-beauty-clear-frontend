import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { FiSearch, FiMail, FiTrash2, FiX, FiPhone, FiCalendar, FiMessageCircle, FiInbox, FiCheckCircle, FiClock, FiAlertTriangle, FiSend, FiArrowLeft } from "react-icons/fi";

const AdminMessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [replySubject, setReplySubject] = useState("");
    const [replyMessage, setReplyMessage] = useState("");
    const [sendingReply, setSendingReply] = useState(false);

    const fetchMessages = () => {
        const token = localStorage.getItem("token");
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/message", {
                headers: { Authorization: "Bearer " + token },
            })
            .then((response) => {
                setMessages(response.data);
                setLoaded(true);
            })
            .catch(() => {
                if (!loaded) {
                    toast.error("Failed to load messages");
                    setLoaded(true);
                }
            });
    };

    // Initial load
    useEffect(() => {
        fetchMessages();
    }, []);

    // Polling for real-time updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let result = messages;
        
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            result = result.filter(msg =>
                (msg.firstName && msg.firstName.toLowerCase().includes(search)) ||
                (msg.lastName && msg.lastName.toLowerCase().includes(search)) ||
                (msg.email && msg.email.toLowerCase().includes(search)) ||
                (msg.message && msg.message.toLowerCase().includes(search))
            );
        }
        
        if (filterStatus !== "all") {
            result = result.filter(msg => msg.status === filterStatus);
        }
        
        setFilteredMessages(result);
    }, [searchTerm, filterStatus, messages]);

    const updateStatus = async (messageId, status, silent = false) => {
        if (!silent) setActionLoading(messageId);
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/api/message/" + messageId,
                { status },
                { headers: { Authorization: "Bearer " + token } }
            );
            
            // Update local state immediately for real-time UI update
            setMessages(prev => prev.map(msg => 
                msg.messageId === messageId ? { ...msg, status } : msg
            ));
            
            // Update selected message if it's the one being updated
            setSelectedMessage(prev => 
                prev && prev.messageId === messageId ? { ...prev, status } : prev
            );
            
            if (!silent) toast.success("Status updated");
        } catch (error) {
            if (!silent) toast.error("Failed to update status");
        } finally {
            if (!silent) setActionLoading(null);
        }
    };

    const deleteMessage = async () => {
        if (!selectedMessage) return;
        
        setActionLoading(selectedMessage.messageId);
        const token = localStorage.getItem("token");
        try {
            await axios.delete(
                import.meta.env.VITE_BACKEND_URL + "/api/message/" + selectedMessage.messageId,
                { headers: { Authorization: "Bearer " + token } }
            );
            toast.success("Message deleted");
            setShowDeleteConfirm(false);
            setSelectedMessage(null);
            // Remove from local state
            setMessages(prev => prev.filter(msg => msg.messageId !== selectedMessage.messageId));
        } catch (error) {
            toast.error("Failed to delete message");
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "unread": return "bg-blue-100 text-blue-700";
            case "read": return "bg-yellow-100 text-yellow-700";
            case "replied": return "bg-green-100 text-green-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "unread": return <FiMail className="w-4 h-4" />;
            case "read": return <FiClock className="w-4 h-4" />;
            case "replied": return <FiCheckCircle className="w-4 h-4" />;
            default: return <FiMessageCircle className="w-4 h-4" />;
        }
    };

    // Stats
    const totalMessages = messages.length;
    const unreadMessages = messages.filter(m => m.status === "unread").length;
    const repliedMessages = messages.filter(m => m.status === "replied").length;

    return (
        <div className="w-full h-full p-6 bg-gray-50 overflow-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
                <p className="text-gray-500">View and manage customer inquiries</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Messages</p>
                            <p className="text-3xl font-bold text-gray-900">{totalMessages}</p>
                        </div>
                        <div className="w-14 h-14 bg-[#1B9C85]/10 rounded-2xl flex items-center justify-center">
                            <FiInbox className="w-7 h-7 text-[#1B9C85]" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Unread</p>
                            <p className="text-3xl font-bold text-blue-600">{unreadMessages}</p>
                        </div>
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <FiMail className="w-7 h-7 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Replied</p>
                            <p className="text-3xl font-bold text-green-600">{repliedMessages}</p>
                        </div>
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                            <FiCheckCircle className="w-7 h-7 text-green-600" />
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
                            placeholder="Search by name, email, or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {["all", "unread", "read", "replied"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all capitalize ${
                                    filterStatus === status
                                        ? status === "all" ? "bg-[#1B9C85] text-white"
                                        : status === "unread" ? "bg-blue-500 text-white"
                                        : status === "read" ? "bg-yellow-500 text-white"
                                        : "bg-green-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Messages List */}
            {!loaded ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : filteredMessages.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <FiInbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No messages found</h3>
                    <p className="text-gray-500">Messages from the contact form will appear here</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {filteredMessages.map((msg) => (
                            <div
                                key={msg.messageId}
                                onClick={() => {
                                    // Set selected message with updated status if unread
                                    const updatedMsg = msg.status === "unread" 
                                        ? { ...msg, status: "read" } 
                                        : msg;
                                    setSelectedMessage(updatedMsg);
                                    
                                    // Update in backend silently if unread
                                    if (msg.status === "unread") {
                                        updateStatus(msg.messageId, "read", true);
                                    }
                                }}
                                className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                                    msg.status === "unread" ? "bg-blue-50/50" : ""
                                }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#1B9C85] to-emerald-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                            {msg.firstName.charAt(0)}{msg.lastName?.charAt(0) || ""}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className={`font-semibold text-gray-900 ${msg.status === "unread" ? "font-bold" : ""}`}>
                                                    {msg.firstName} {msg.lastName}
                                                </h3>
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                                                    {getStatusIcon(msg.status)}
                                                    {msg.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-2">{msg.email}</p>
                                            <p className="text-gray-600 line-clamp-2">{msg.message}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm text-gray-500">
                                            {new Date(msg.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(msg.createdAt).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-700">{filteredMessages.length}</span> of <span className="font-medium text-gray-700">{totalMessages}</span> messages
                        </p>
                    </div>
                </div>
            )}

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#1B9C85] to-emerald-500">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {selectedMessage.firstName.charAt(0)}{selectedMessage.lastName?.charAt(0) || ""}
                                    </div>
                                    <div className="text-white">
                                        <h2 className="text-xl font-bold">{selectedMessage.firstName} {selectedMessage.lastName}</h2>
                                        <p className="text-white/80 text-sm">{selectedMessage.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[50vh]">
                            {/* Contact Info */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <FiCalendar className="w-4 h-4" />
                                        Received
                                    </div>
                                    <p className="font-medium text-gray-900">
                                        {new Date(selectedMessage.createdAt).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                {selectedMessage.phone && (
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                            <FiPhone className="w-4 h-4" />
                                            Phone
                                        </div>
                                        <p className="font-medium text-gray-900">{selectedMessage.phone}</p>
                                    </div>
                                )}
                            </div>

                            {/* Message */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <FiMessageCircle className="w-5 h-5 text-[#1B9C85]" />
                                    Message
                                </h3>
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {selectedMessage.message}
                                </p>
                            </div>

                            {/* Status Update */}
                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
                                <div className="flex gap-2">
                                    {["unread", "read", "replied"].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(selectedMessage.messageId, status)}
                                            disabled={actionLoading === selectedMessage.messageId}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                                                selectedMessage.status === status
                                                    ? status === "unread" ? "bg-blue-500 text-white"
                                                    : status === "read" ? "bg-yellow-500 text-white"
                                                    : "bg-green-500 text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                            >
                                <FiTrash2 className="w-4 h-4" />
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    setReplySubject(`Re: Inquiry from ${selectedMessage.firstName}`);
                                    setReplyMessage("");
                                    setShowReplyModal(true);
                                }}
                                className="flex items-center gap-2 px-6 py-2 bg-[#1B9C85] text-white rounded-lg hover:bg-[#158a74] transition-all"
                            >
                                <FiMail className="w-4 h-4" />
                                Reply via Email
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reply Modal */}
            {showReplyModal && selectedMessage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* Reply Modal Header */}
                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#1B9C85] to-emerald-500">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setShowReplyModal(false)}
                                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                                    >
                                        <FiArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div className="text-white">
                                        <h2 className="text-xl font-bold">Reply to Message</h2>
                                        <p className="text-white/80 text-sm">Sending to: {selectedMessage.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowReplyModal(false)}
                                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Reply Form */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {/* Original Message Preview */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                <p className="text-sm text-gray-500 mb-2">Original message from {selectedMessage.firstName}:</p>
                                <p className="text-gray-700 text-sm italic">"{selectedMessage.message}"</p>
                            </div>

                            {/* Subject */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={replySubject}
                                    onChange={(e) => setReplySubject(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                    placeholder="Email subject..."
                                />
                            </div>

                            {/* Reply Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Reply
                                </label>
                                <textarea
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    rows={8}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all resize-none"
                                    placeholder="Type your reply here..."
                                />
                            </div>
                        </div>

                        {/* Reply Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
                            <button
                                onClick={() => setShowReplyModal(false)}
                                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!replySubject.trim() || !replyMessage.trim()) {
                                        toast.error("Please fill in subject and message");
                                        return;
                                    }
                                    
                                    setSendingReply(true);
                                    const token = localStorage.getItem("token");
                                    try {
                                        await axios.post(
                                            import.meta.env.VITE_BACKEND_URL + "/api/message/" + selectedMessage.messageId + "/reply",
                                            { subject: replySubject, replyMessage },
                                            { headers: { Authorization: "Bearer " + token } }
                                        );
                                        toast.success("Reply sent successfully!");
                                        
                                        // Update local state
                                        setMessages(prev => prev.map(msg => 
                                            msg.messageId === selectedMessage.messageId ? { ...msg, status: "replied" } : msg
                                        ));
                                        setSelectedMessage(prev => ({ ...prev, status: "replied" }));
                                        
                                        setShowReplyModal(false);
                                        setReplySubject("");
                                        setReplyMessage("");
                                    } catch (error) {
                                        const errorMsg = error.response?.data?.message || "Failed to send reply";
                                        toast.error(errorMsg);
                                        console.error("Reply error:", error);
                                    } finally {
                                        setSendingReply(false);
                                    }
                                }}
                                disabled={sendingReply}
                                className="flex items-center gap-2 px-6 py-3 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all disabled:opacity-50"
                            >
                                {sendingReply ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="w-5 h-5" />
                                        Send Reply
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && selectedMessage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiAlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Message?</h3>
                            <p className="text-gray-500 mb-2">
                                Are you sure you want to delete this message from
                            </p>
                            <p className="font-semibold text-gray-700 mb-4">
                                {selectedMessage.firstName} {selectedMessage.lastName}
                            </p>
                            <p className="text-sm text-gray-400">
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex border-t border-gray-100">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-6 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteMessage}
                                disabled={actionLoading}
                                className="flex-1 px-6 py-4 bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <FiTrash2 className="w-4 h-4" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMessagesPage;
