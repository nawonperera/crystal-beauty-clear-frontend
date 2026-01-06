import { useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import UserData from "./UserData";
import getCart, { CART_UPDATED_EVENT, getCartItemCount } from "../utils/cart";
import axios from "axios";

const Header = ({ navBarColor, headerImage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);
    const location = useLocation();

    // Check if current path matches the link
    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    // Get initial cart count
    useEffect(() => {
        setCartCount(getCartItemCount());
    }, []);

    // Fetch user data to check role
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((response) => {
                    setUser(response.data.user);
                })
                .catch(() => {
                    setUser(null);
                });
        }
    }, []);

    // Listen for cart updates
    useEffect(() => {
        const handleCartUpdate = (event) => {
            const cart = event.detail;
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        };

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        
        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        };
    }, []);

    return (
        <header className="w-full h-[20vh] relative flex items-center justify-start ">
            <div className="p-2">
                <img src={headerImage} alt="Company Logo" className="h-4\0 w-40 object-contain" />
            </div>

            <div className="flex items-center justify-between w-full px-4 py-2 lg:hidden">
                {/* Left: Hamburger menu */}
                <GiHamburgerMenu
                    className="text-3xl text-accent cursor-pointer hover:rotate-90 transition-transform duration-300"
                    onClick={() => setIsOpen(true)}
                />
            </div>

            <div
                className={`hidden lg:flex h-full items-center justify-center gap-8 ${navBarColor} text-xl absolute left-1/2 -translate-x-1/2`}
            >
                <Link to="/" className={`hover:text-black transition-colors pb-1 ${isActive("/") ? "border-b-2 border-black text-black" : ""}`}>HOME</Link>
                <Link to="/products" className={`hover:text-black transition-colors pb-1 ${isActive("/products") ? "border-b-2 border-black text-black" : ""}`}>SHOP</Link>
                <Link to="/reviews" className={`hover:text-black transition-colors pb-1 ${isActive("/reviews") ? "border-b-2 border-black text-black" : ""}`}>TESTIMONIALS</Link>
                <Link to="/contacts" className={`hover:text-black transition-colors pb-1 ${isActive("/contacts") ? "border-b-2 border-black text-black" : ""}`}>CONTACT</Link>
                <Link to="/about" className={`hover:text-black transition-colors pb-1 ${isActive("/about") ? "border-b-2 border-black text-black" : ""}`}>ABOUT</Link>
                {user?.role === "admin" && (
                    <Link to="/admin" className={`hover:text-black transition-colors pb-1 ${isActive("/admin") ? "border-b-2 border-black text-black" : ""}`}>ADMIN</Link>
                )}
                <Link to="/cart" className="relative text-3xl hover:text-black transition-colors">
                    <BsCart2 />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>
                    )}
                </Link>
            </div>
            <div className="absolute right-[15px] h-full">
                <UserData />
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] lg:hidden ">
                    {/* Slide-in Sidebar */}
                    <div className="w-[280px] h-full bg-white shadow-2xl flex flex-col p-6 animate-slideIn">
                        {/* Close Button */}
                        <div className="w-full flex justify-end mb-6">
                            <GiHamburgerMenu
                                className="text-3xl text-accent cursor-pointer hover:rotate-90 transition-transform duration-300"
                                onClick={() => setIsOpen(false)}
                            />
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-col gap-4 w-full">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium hover:text-accent hover:translate-x-2 transition-all duration-200 ${isActive("/") ? "text-[#1B9C85] border-l-4 border-[#1B9C85] pl-3" : "text-gray-700"}`}
                            >
                                HOME
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium hover:text-accent hover:translate-x-2 transition-all duration-200 ${isActive("/products") ? "text-[#1B9C85] border-l-4 border-[#1B9C85] pl-3" : "text-gray-700"}`}
                            >
                                SHOP
                            </Link>
                            <Link
                                to="/reviews"
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium hover:text-accent hover:translate-x-2 transition-all duration-200 ${isActive("/reviews") ? "text-[#1B9C85] border-l-4 border-[#1B9C85] pl-3" : "text-gray-700"}`}
                            >
                                TESTIMONIALS
                            </Link>
                            <Link
                                to="/contacts"
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium hover:text-accent hover:translate-x-2 transition-all duration-200 ${isActive("/contacts") ? "text-[#1B9C85] border-l-4 border-[#1B9C85] pl-3" : "text-gray-700"}`}
                            >
                                CONTACT
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium hover:text-accent hover:translate-x-2 transition-all duration-200 ${isActive("/about") ? "text-[#1B9C85] border-l-4 border-[#1B9C85] pl-3" : "text-gray-700"}`}
                            >
                                ABOUT
                            </Link>
                            {user?.role === "admin" && (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-medium hover:text-accent hover:translate-x-2 transition-all duration-200 ${isActive("/admin") ? "text-[#1B9C85] border-l-4 border-[#1B9C85] pl-3" : "text-gray-700"}`}
                                >
                                    ADMIN
                                </Link>
                            )}
                            <Link
                                to="/cart"
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium hover:text-accent hover:translate-x-2 transition-all duration-200 flex items-center gap-2 ${isActive("/cart") ? "text-[#1B9C85] border-l-4 border-[#1B9C85] pl-3" : "text-gray-700"}`}
                            >
                                Cart
                                {cartCount > 0 && (
                                    <span className="w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </Link>
                        </nav>

                        <div className="mt-auto pt-6 border-t border-gray-200 w-full">
                            <p className="text-sm text-gray-500">© 2025 CRISTAL BEAUTY & CLEAR</p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
