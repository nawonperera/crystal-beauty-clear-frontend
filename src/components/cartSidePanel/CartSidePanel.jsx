import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getCart, { addToCart, getTotal, getTotalForLabeledPrice, removeFromCart } from "../../utils/cart.js";
import { IoClose } from "react-icons/io5";
import { TbTrash } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { HiPlus, HiMinus } from "react-icons/hi";

const CartSidePanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartLoaded, setCartLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cartLoaded === false) {
            const cart = getCart();
            setCart(cart);
            setCartLoaded(true);
        }
    }, [cartLoaded]);

    const handleQuantityChange = (item, change) => {
        addToCart(item, change);
        setCartLoaded(false);
    };

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
        setCartLoaded(false);
    };

    const handleCheckout = () => {
        setIsOpen(false);
        navigate("/checkout", { state: { items: cart } });
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const hasItems = cart.length > 0;

    return (
        <>
            {/* Cart Toggle Button */}
            <button
                className="fixed top-5 right-5 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                onClick={() => setIsOpen(true)}
            >
                <div className="relative">
                    <FiShoppingCart className="text-xl" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                            {cartItemCount > 99 ? "99+" : cartItemCount}
                        </span>
                    )}
                </div>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Slide-in Panel */}
                    <div
                        className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl transform transition-transform duration-300 translate-x-0 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-3">
                                <FiShoppingCart className="text-2xl text-gray-700" />
                                <h2 className="text-xl font-bold text-gray-800">
                                    Shopping Cart
                                    {cartItemCount > 0 && (
                                        <span className="ml-2 text-sm font-normal text-gray-500">
                                            ({cartItemCount} items)
                                        </span>
                                    )}
                                </h2>
                            </div>
                            <button
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                <IoClose className="text-2xl text-gray-600" />
                            </button>
                        </div>

                        {/* Cart Content */}
                        <div className="flex-1 overflow-y-auto">
                            {!hasItems ? (
                                // Empty Cart State
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                    <FiShoppingCart className="text-6xl text-gray-300 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                                    <p className="text-gray-500 mb-6">Add some items to get started!</p>
                                    <button
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                // Cart Items
                                <div className="p-4 space-y-4">
                                    {cart.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                                        >
                                            <div className="flex">
                                                {/* Product Image */}
                                                <div className="relative w-24 h-24 flex-shrink-0">
                                                    <img
                                                        alt={item.name}
                                                        src={item.image}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full text-white flex justify-center items-center shadow-lg transition-colors duration-200 text-xs"
                                                        onClick={() => handleRemoveItem(item.productId)}
                                                    >
                                                        <TbTrash />
                                                    </button>
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 p-4">
                                                    <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                    {item.altNames && item.altNames.length > 0 && (
                                                        <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                                                            {item.altNames.join(" | ")}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm">
                                                            <span className="font-semibold text-blue-600">
                                                                LKR {item.price.toFixed(2)}
                                                            </span>
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex justify-center items-center transition-colors duration-200"
                                                                onClick={() => handleQuantityChange(item, -1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <HiMinus className="text-sm" />
                                                            </button>
                                                            <span className="text-sm font-semibold min-w-[2rem] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex justify-center items-center transition-colors duration-200"
                                                                onClick={() => handleQuantityChange(item, 1)}
                                                            >
                                                                <HiPlus className="text-sm" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Item Total */}
                                                    <div className="mt-2 text-right">
                                                        <span className="text-sm font-bold text-gray-800">
                                                            LKR {(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer with Totals and Checkout */}
                        {hasItems && (
                            <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-4">
                                {/* Totals */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal:</span>
                                        <span>LKR {getTotalForLabeledPrice().toFixed(2)}</span>
                                    </div>
                                    {getTotalForLabeledPrice() - getTotal() > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount:</span>
                                            <span>-LKR {(getTotalForLabeledPrice() - getTotal()).toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-300">
                                        <span>Total:</span>
                                        <span>LKR {getTotal().toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}

                        {/* Brand Footer */}
                        <div className="p-4 text-center border-t border-gray-100">
                            <p className="text-xs text-gray-400">© 2025 CRISTAL BEAUTY & CLEAR</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartSidePanel;
