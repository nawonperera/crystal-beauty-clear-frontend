import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import UserData from "./UserData";

const Header = ({ navBarColor, headerImage }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                <Link to="/">HOME</Link>
                <Link to="/products">SHOP</Link>
                <Link to="/reviews">TESTIMONIALS</Link>
                <Link to="/contacts">CONTACT</Link>
                <Link to="/about">ABOUT</Link>
                <Link to="/cart" className="text-4xl">
                    <BsCart2 />
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
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                HOME
                            </Link>
                            <Link
                                to="/products"
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                SHOP
                            </Link>
                            <Link
                                to="/reviews"
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                TESTIMONIALS
                            </Link>
                            <Link
                                to="/contacts"
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                CONTACT
                            </Link>
                            <Link
                                to="/about"
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                ABOUT
                            </Link>
                            <Link
                                to="/cart"
                                className="text-lg font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-200"
                            >
                                Cart
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
