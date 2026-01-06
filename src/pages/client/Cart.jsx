import getCart, { addToCart, getTotal, getTotalForLabeledPrice, removeFromCart } from "../../utils/cart.js";
import { TbTrash } from "react-icons/tb";
import { FiShoppingBag, FiArrowLeft, FiMinus, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";

const Cart = () => {
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

    const discount = getTotalForLabeledPrice() - getTotal();
    const hasDiscount = discount > 0;

    return (
        <div className="bg-[#EDF6EE] min-h-screen">
            <Header navBarColor="text-black" headerImage="/Logo.png" />
            
            <div className="w-full py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <Link to="/products" className="inline-flex items-center gap-2 text-[#1B9C85] hover:text-[#158a74] transition-colors mb-4">
                            <FiArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Continue Shopping</span>
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Shopping Cart</h1>
                        <p className="text-gray-500 mt-2">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
                    </div>

                    {cart.length === 0 ? (
                        /* Empty Cart State */
                        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                            <div className="w-24 h-24 mx-auto mb-6 bg-[#1B9C85]/10 rounded-full flex items-center justify-center">
                                <FiShoppingBag className="w-12 h-12 text-[#1B9C85]" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B9C85] text-white font-semibold rounded-full hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30"
                            >
                                <FiShoppingBag className="w-5 h-5" />
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items */}
                            <div className="flex-1">
                                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                                    {/* Table Header - Desktop */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                        <div className="col-span-6">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="divide-y divide-gray-100">
                                        {cart.map((item, index) => (
                                            <div
                                                key={index}
                                                className="group p-6 hover:bg-gray-50/50 transition-colors"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                                    {/* Product Info */}
                                                    <div className="md:col-span-6 flex items-center gap-4">
                                                        <div className="relative">
                                                            <img
                                                                alt={item.name}
                                                                src={item.image}
                                                                className="w-24 h-24 object-cover rounded-2xl shadow-md"
                                                            />
                                                            <button
                                                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                                                onClick={() => {
                                                                    removeFromCart(item.productId);
                                                                    setCartLoaded(false);
                                                                }}
                                                            >
                                                                <TbTrash className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                                                            <p className="text-sm text-gray-500 truncate">{item.altNames.join(" | ")}</p>
                                                            {/* Mobile Price */}
                                                            <p className="md:hidden text-[#1B9C85] font-semibold mt-1">LKR {item.price.toFixed(2)}</p>
                                                        </div>
                                                    </div>

                                                    {/* Price - Desktop */}
                                                    <div className="hidden md:flex md:col-span-2 justify-center">
                                                        <span className="text-gray-700 font-medium">LKR {item.price.toFixed(2)}</span>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="md:col-span-2 flex items-center justify-center">
                                                        <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                                                            <button
                                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-[#1B9C85] hover:text-white transition-all duration-200"
                                                                onClick={() => {
                                                                    addToCart(item, -1);
                                                                    setCartLoaded(false);
                                                                }}
                                                            >
                                                                <FiMinus className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                                                            <button
                                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-[#1B9C85] hover:text-white transition-all duration-200"
                                                                onClick={() => {
                                                                    addToCart(item, 1);
                                                                    setCartLoaded(false);
                                                                }}
                                                            >
                                                                <FiPlus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Item Total */}
                                                    <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                                                        <span className="md:hidden text-gray-500">Subtotal:</span>
                                                        <span className="text-lg font-bold text-gray-900">
                                                            LKR {(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Mobile Delete Button */}
                                                <button
                                                    className="md:hidden mt-4 w-full py-2 text-red-500 text-sm font-medium flex items-center justify-center gap-2 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
                                                    onClick={() => {
                                                        removeFromCart(item.productId);
                                                        setCartLoaded(false);
                                                    }}
                                                >
                                                    <TbTrash className="w-4 h-4" />
                                                    Remove Item
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:w-96">
                                <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({cart.length} items)</span>
                                            <span className="font-medium">LKR {getTotalForLabeledPrice().toFixed(2)}</span>
                                        </div>
                                        
                                        {hasDiscount && (
                                            <div className="flex justify-between text-green-600">
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                    Discount
                                                </span>
                                                <span className="font-medium">- LKR {discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="font-medium text-[#1B9C85]">Free</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-[#1B9C85]">LKR {getTotal().toFixed(2)}</span>
                                                {hasDiscount && (
                                                    <p className="text-sm text-green-600">You save LKR {discount.toFixed(2)}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full py-4 bg-[#1B9C85] text-white text-lg font-semibold rounded-2xl hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30 transform hover:-translate-y-0.5"
                                        onClick={() => {
                                            navigate("/checkout", { state: { items: cart } });
                                        }}
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-5 h-5 text-[#1B9C85]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Secure Checkout</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
