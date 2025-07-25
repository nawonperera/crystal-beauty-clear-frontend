import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full h-[70px] flex items-center justify-start bg-gray-200 relative">
            <GiHamburgerMenu className="lg:hidden text-3xl text-accent mx-4" onClick={() => setIsOpen(true)} />
            <div className="hidden lg:flex w-[500px] h-full items-center justify-evenly text-pink-400 text-xl text-accent">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contacts">Contacts</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/cart" className="absolute right-[30px] text-4xl">
                    <BsCart2 />
                </Link>
            </div>
            {isOpen && (
                //z-index appear on top of those with lower values.
                <div className="fixed top-0 left-0 bg-[#00000060] w-full h-screen flex z-[9999]">
                    <div className="w-[300px] h-full bg-white flex flex-col justify-start items-start p-4">
                        <GiHamburgerMenu className="text-3xl text-accent" onClick={() => setIsOpen(false)} />
                        <Link to="/" className="text-xl text-accent my-4">
                            Home
                        </Link>
                        <Link to="/products" className="text-xl text-accent my-4">
                            Products
                        </Link>
                        <Link to="/contact" className="text-xl text-accent my-4">
                            Contact us
                        </Link>
                        <Link to="/reviews" className="text-xl text-accent my-4">
                            Reviews
                        </Link>
                        <Link to="/cart" className="text-xl text-accent my-4">
                            Cart
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
