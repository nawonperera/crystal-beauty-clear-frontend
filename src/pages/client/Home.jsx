import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrendingItems from "../../components/homepage components/TrendingItems";
import { FaPercentage, FaShippingFast, FaUserShield } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
            <div className="w-full h-screen relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-fixed bg-cover bg-center"
                    style={{
                        backgroundImage: "url(/Banner.jpg)",
                        filter: `brightness(${brightness})`, // only affects bg
                    }}
                ></div>
                <div className="relative z-10 flex w-full h-full py-[10px]">
                    <Header headerImage="public\footer-logo.png" navBarColor="text-white" />
                </div>
            </div>

            {/* Tranding Items View */}
            <div className="w-full min-h-screen flex justify-center pb-[150px]">
                <div className=" w-[75%] mx-auto">
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

                    <div className="w-full pt-[50px]">
                        <TrendingItems />
                    </div>
                </div>
            </div>

            {/* Store Features */}
            <div className="min-h-screen w-[75%] mx-auto ">
                <div className="w-full h-[60vh] flex justify-center items-center rounded-lg overflow-hidden bg-[#F8F8FA]">
                    {/* Left: Video */}
                    <div className="hidden lg:flex w-[51%] h-full">
                        <video className="w-full h-full object-cover" controls autoPlay loop muted>
                            <source src="public\Homepage video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Right: Content */}
                    <div className="w-[49%] h-full  flex justify-center items-center">
                        <div className="w-[75%]  flex flex-col items-center justify-center">
                            <h1 className="text-base font-bold text-[#1b9c85] text-center m-4">
                                SHINE BRIGHT, SHINE CONFIDENT
                            </h1>

                            <h1 className="text-3xl font-bold text-black text-center pt-1 pb-5">UNLEASH YOUR STYLE</h1>

                            <p className="text-base text-gray-700 text-center mt-2 w-[65%]">
                                Discover styles that bring out your confidence and redefine the way you shine every day.
                            </p>

                            <Link
                                className="mt-7 bg-[#1B9C85] text-white text-sm px-4 py-2 hover:bg-[#178E79] hover:text-white transition cursor-pointer"
                                to={"/products"}
                            >
                                SHOP NOW
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[60vh] flex items-center">
                    <div className="flex justify-between  w-full h-[35vh] pt-7">
                        <div className="w-[32%] h-full flex flex-col items-center text-center gap-4 ">
                            <div className="w-16 h-16 text-4xl flex justify-center items-center border rounded-full border-[#1b9c85] text-[#1b9c85]">
                                <FaPercentage />
                            </div>
                            <h2 className="text-xl font-semibold">SEASON SALE</h2>
                            <p className="text-base text-gray-700 text-center w-[65%]">
                                Summer beauty made easy, Get your favorite cosmetics at hot prices!
                            </p>
                        </div>
                        <div className="w-[32%] h-full flex flex-col items-center text-center gap-4 ">
                            <div className="w-16 h-16 text-4xl flex justify-center items-center border rounded-full border-[#1b9c85] text-[#1b9c85]">
                                <FaShippingFast />
                            </div>
                            <h2 className="text-xl font-semibold">FREE SHIPPING</h2>
                            <p className="text-base text-gray-700 text-center w-[65%]">
                                Beauty Delivered to Your Door, No Shipping Fees!
                            </p>
                        </div>
                        <div className="w-[32%] h-full flex flex-col items-center text-center gap-4 ">
                            <div className="w-16 h-16 text-4xl flex justify-center items-center border rounded-full border-[#1b9c85] text-[#1b9c85]">
                                <FaUserShield />
                            </div>
                            <h2 className="text-xl font-semibold">MONEY BACK GUARANTEE</h2>
                            <p className="text-base text-gray-700 text-center w-[65%]">
                                Beauty You Can Trust, Or Your Money Back!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
