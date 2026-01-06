import { TbTrash } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { HiPlus, HiMinus } from "react-icons/hi";
import { FiShoppingBag, FiUser, FiPhone, FiMapPin, FiCreditCard, FiShield } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Cart = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(location.state?.items || []);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phoneNumber: "",
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (!cart || cart.length === 0) {
            toast.error("No items in cart");
            navigate("/");
        }
    }, [cart, navigate]);

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            errors.name = "Name must be at least 2 characters";
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = "Phone number is required";
        } else if (!/^\+?[\d\s-()]{8,15}$/.test(formData.phoneNumber.trim())) {
            errors.phoneNumber = "Please enter a valid phone number";
        }

        if (!formData.address.trim()) {
            errors.address = "Address is required";
        } else if (formData.address.trim().length < 10) {
            errors.address = "Please enter a complete address";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const updateQuantity = (index, change) => {
        const newCart = [...cart];
        const newQuantity = newCart[index].quantity + change;
        if (newQuantity >= 1) {
            newCart[index].quantity = newQuantity;
            setCart(newCart);
        }
    };

    const removeItem = (productId) => {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
    };

    const getTotal = () => cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const getTotalForLabeledPrice = () => cart.reduce((sum, product) => sum + (product.labeledPrice || product.price) * product.quantity, 0);
    const getDiscountAmount = () => getTotalForLabeledPrice() - getTotal();

    const placeOrder = async () => {
        if (!validateForm()) {
            toast.error("Please fill in all required fields correctly");
            return;
        }

        setIsLoading(true);

        const orderData = {
            name: formData.name.trim(),
            address: formData.address.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            billItems: cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        const token = localStorage.getItem("token");

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order`, orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Order placed successfully!");
            navigate("/orders");
        } catch (error) {
            console.error("Order placement error:", error);
            toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!cart || cart.length === 0) return null;

    return (
        <div className="min-h-screen bg-[#EDF6EE]">
            <Header navBarColor="text-black" headerImage="/Logo.png" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#1B9C85] hover:text-[#158a74] mb-6 transition-colors font-medium"
                >
                    <IoArrowBack className="text-xl" />
                    <span>Back to Shopping</span>
                </button>

                {/* Page Title */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[#1B9C85]/10 rounded-full flex items-center justify-center">
                        <FiShoppingBag className="text-2xl text-[#1B9C85]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                        <p className="text-gray-500">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {cart.map((item, index) => (
                                    <div key={index} className="p-6 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="relative w-full sm:w-28 h-28 flex-shrink-0">
                                                <img
                                                    alt={item.name}
                                                    src={item.image}
                                                    className="w-full h-full object-cover rounded-2xl shadow-md"
                                                />
                                                <button
                                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full text-white flex justify-center items-center shadow-lg transition-colors"
                                                    onClick={() => removeItem(item.productId)}
                                                >
                                                    <TbTrash className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                                                {item.altNames?.length > 0 && (
                                                    <p className="text-sm text-gray-500 mb-3">{item.altNames.join(" • ")}</p>
                                                )}

                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-xl font-bold text-[#1B9C85]">
                                                        LKR {item.price.toFixed(2)}
                                                    </span>
                                                    {item.labeledPrice && item.labeledPrice !== item.price && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            LKR {item.labeledPrice.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                                                        <button
                                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#1B9C85] hover:text-white transition-all disabled:opacity-50"
                                                            onClick={() => updateQuantity(index, -1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <HiMinus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-10 text-center text-lg font-bold">{item.quantity}</span>
                                                        <button
                                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#1B9C85] hover:text-white transition-all"
                                                            onClick={() => updateQuantity(index, 1)}
                                                        >
                                                            <HiPlus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Item Total */}
                                                    <span className="text-xl font-bold text-gray-900">
                                                        LKR {(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white rounded-3xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#1B9C85]/10 rounded-full flex items-center justify-center">
                                    <FiUser className="text-xl text-[#1B9C85]" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Customer Information</h2>
                            </div>

                            <div className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <FiUser className="text-[#1B9C85]" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all ${
                                            formErrors.name
                                                ? "border-red-300 focus:border-red-400"
                                                : "border-gray-200 focus:border-[#1B9C85]"
                                        }`}
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                    />
                                    {formErrors.name && <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <FiPhone className="text-[#1B9C85]" />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all ${
                                            formErrors.phoneNumber
                                                ? "border-red-300 focus:border-red-400"
                                                : "border-gray-200 focus:border-[#1B9C85]"
                                        }`}
                                        placeholder="e.g., +94 77 123 4567"
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                    />
                                    {formErrors.phoneNumber && <p className="mt-2 text-sm text-red-500">{formErrors.phoneNumber}</p>}
                                </div>

                                {/* Address Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <FiMapPin className="text-[#1B9C85]" />
                                        Delivery Address *
                                    </label>
                                    <textarea
                                        rows="3"
                                        className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all resize-none ${
                                            formErrors.address
                                                ? "border-red-300 focus:border-red-400"
                                                : "border-gray-200 focus:border-[#1B9C85]"
                                        }`}
                                        placeholder="Enter your complete delivery address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                    />
                                    {formErrors.address && <p className="mt-2 text-sm text-red-500">{formErrors.address}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-3xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#1B9C85]/10 rounded-full flex items-center justify-center">
                                    <FiCreditCard className="text-xl text-[#1B9C85]" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">LKR {getTotalForLabeledPrice().toFixed(2)}</span>
                                </div>

                                {getDiscountAmount() > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            Discount
                                        </span>
                                        <span className="font-medium">- LKR {getDiscountAmount().toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="font-medium text-[#1B9C85]">FREE</span>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-[#1B9C85]">LKR {getTotal().toFixed(2)}</span>
                                        {getDiscountAmount() > 0 && (
                                            <p className="text-sm text-green-600">You save LKR {getDiscountAmount().toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                                    isLoading
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-[#1B9C85] hover:bg-[#158a74] text-white hover:shadow-lg hover:shadow-[#1B9C85]/30 transform hover:-translate-y-0.5"
                                }`}
                                onClick={placeOrder}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Place Order"
                                )}
                            </button>

                            {/* Security Notice */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                                <FiShield className="w-4 h-4 text-[#1B9C85]" />
                                <span>Secure & encrypted checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
