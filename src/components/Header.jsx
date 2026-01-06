import { useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import UserData from "./UserData";
import getCart, { CART_UPDATED_EVENT, getCartItemCount } from "../utils/cart";

const Header = ({ navBarColor, headerImage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // Get initial cart count
    useEffect(() => {
        setCartCount(getCartItemCount());
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
                <Link to="/" className="hover:text-[#1B9C85] transition-colors">HOME</Link>
                <Link to="/products" className="hover:text-[#1B9C85] transition-colors">SHOP</Link>
                <Link to="/reviews" className="hover:text-[#1B9C85] transition-colors">TESTIMONIALS</Link>
                <Link to="/contacts" className="hover:text-[#1B9C85] transition-colors">CONTACT</Link>
                <Link to="/about" className="hover:text-[#1B9C85] transition-colors">ABOUT</Link>
                <Link to="/cart" className="relative text-3xl hover:text-[#1B9C85] transition-colors">
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
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                HOME
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                SHOP
                            </Link>
                            <Link
                                to="/reviews"
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                TESTIMONIALS
                            </Link>
                            <Link
                                to="/contacts"
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                CONTACT
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                ABOUT
                            </Link>
                            <Link
                                to="/cart"
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200 flex items-center gap-2"
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
