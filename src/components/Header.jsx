import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="w-full h-[70px] flex items-center justify-center bg-gray-200 relative">
            <div className="w-[500px] h-full flex items-center justify-evenly text-pink-400 text-xl">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contacts">Contacts</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/cart" className="absolute right-[30px] text-4xl">
                    <BsCart2 />
                </Link>
            </div>
        </header>
    );
};

export default Header;
