import { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserData from "../../components/UserData";

const Home = () => {
    const [brightness, setBrightness] = useState(0.7); // start at 70%

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const sectionHeight = window.innerHeight; // h-screen section height

            // Progress only for the first section (0 → 1)
            const progress = Math.min(scrollY / sectionHeight, 1);

            // Brightness from 0.6 → 1.0
            const newBrightness = 0.6 + progress * 0.4;
            setBrightness(newBrightness);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div
                className="w-full h-screen bg-[url(/login-bg.jpg)] bg-fixed bg-cover bg-center flex transition-all duration-200"
                style={{ filter: `brightness(${brightness})` }}
            >
                <header className="w-full h-[20%] relative ">
                    {/* <img src="public\ChatGPT Image Aug 23, 2025, 03_02_44 AM.png" alt=" " /> */}
                    <div className="w-full h-[60%] flex items-center justify-center ">
                        <h1 className="text-3xl text-black text-center">Welcome to Cristal Beauty & Clear</h1>
                        <div className="absolute right-[15px] h-full">
                            <UserData />
                        </div>
                    </div>
                    <div className="w-full h-[40%] flex items-center justify-center">
                        <div className="hidden lg:flex w-[500px] h-full items-center justify-evenly text-pink-400 text-xl text-accent">
                            <Link to="/">Home</Link>
                            <Link to="/products">Shop</Link>
                            <Link to="/reviews">Testimonials</Link>
                            <Link to="/contacts">Contact</Link>
                            <Link to="/about">About</Link>
                            <Link to="/cart" className="text-4xl">
                                <BsCart2 />
                            </Link>
                        </div>
                    </div>
                </header>
            </div>
            {/* Extra content to allow scrolling */}
            <div className="h-[150vh] w-full bg-amber-800"></div>
        </>
    );
};

export default Home;
