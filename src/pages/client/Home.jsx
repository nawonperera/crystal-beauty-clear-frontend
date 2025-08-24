import { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserData from "../../components/UserData";
import TrendingItems from "../../components/homepage components/TrendingItems";

const Home = () => {
    const [brightness, setBrightness] = useState(0.7); // start at 70%

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const sectionHeight = window.innerHeight; // h-screen section height

            // Progress only for the first section (0 → 1)
            const progress = Math.min(scrollY / sectionHeight, 1);

            // Brightness from 0.6 → 1.0
            const newBrightness = 0.7 + progress * 0.4;
            setBrightness(newBrightness);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#EDF6EE]">
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
            {/* Tranding Items View */}
            <div className="w-full min-h-screen flex justify-center pb-[150px]">
                <div className=" lg:w-[75%] lg:mx-auto w-full ">
                    <div className="w-full  flex flex-col justify-center  mt-[70px]">
                        <h1 className="text-xl text-[#1b9c85] text-center">A BRUSH OF PERFECTION</h1>
                    </div>
                    <div className="w-full  flex  justify-center pt-[5px] pb-[20px]">
                        <h1 className="text-3xl text-black text-center ">A TWIST OF MAGIC TO EVERY DAY</h1>
                    </div>
                    <div className="w-full  flex  justify-center ">
                        <p className="text-sm text-gray-700 text-center ">
                            Dreams dance softly under endless skies, whispering untold stories.
                        </p>
                    </div>

                    <div className="w-full pt-[50px] ">
                        <TrendingItems />
                    </div>
                </div>
            </div>

            {/* Store Features */}
            <div className="w-full min-h-screen lg:w-[75%] lg:mx-auto ">
                <div className="w-full h-[60vh] flex justify-center items-center rounded-xl overflow-hidden bg-amber-900">
                    {/* Left: Video */}
                    <div className="w-[51%] h-full bg-amber-700">
                        <video className="w-full h-full object-cover" controls autoPlay loop muted>
                            <source src="public\Homepage video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Right: Content */}
                    <div className="w-[49%] h-full bg-blue-400">{/* Your text or image goes here */}</div>
                </div>

                <div className="w-full h-[60vh] flex items-center mt-[25px]  ">
                    <div className="flex justify-evenly items-center w-full h-[35vh] ">
                        <div className="w-[33%] h-full bg-green-700"></div>
                        <div className="w-[33%] h-full bg-blue-400"></div>
                        <div className="w-[33%] h-full bg-red-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
