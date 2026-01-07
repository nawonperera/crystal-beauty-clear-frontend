import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrendingItems from "../../components/homepage components/TrendingItems";
import { FaPercentage, FaShippingFast, FaUserShield, FaArrowDown } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
    const [brightness, setBrightness] = useState(0.7);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            const sectionHeight = window.innerHeight;
            const progress = Math.min(currentScrollY / sectionHeight, 1);
            const newBrightness = 0.7 + progress * 0.3;
            setBrightness(newBrightness);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToContent = () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    };

    return (
        <div className="w-full min-h-screen bg-[#EDF6EE]">
            {/* Hero Section */}
            <div className="w-full h-screen relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-fixed bg-cover bg-center transition-all duration-300"
                    style={{
                        backgroundImage: "url(/Banner.jpg)",
                        filter: `brightness(${brightness})`,
                        transform: `scale(${1 + scrollY * 0.0002})`,
                    }}
                ></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>

                <div className="relative z-10 flex flex-col w-full h-full">
                    <div className="py-[10px]">
                        <Header headerImage="public\footer-logo.png" navBarColor="text-white" />
                    </div>

                    {/* Hero Content */}
                    <div className="flex-1 flex items-center px-8 lg:px-20">
                        <div className="max-w-xl animate-fadeIn">
                            <p className="text-[#1B9C85] text-sm md:text-base font-semibold tracking-[0.3em] mb-4">
                                WELCOME TO CRISTAL
                            </p>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                                Discover Your
                                <span className="block text-[#1B9C85]">Natural Beauty</span>
                            </h1>
                            <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed">
                                Premium skincare and cosmetics crafted to enhance your natural glow. Experience luxury
                                beauty that cares for you.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/products"
                                    className="px-8 py-4 bg-[#1B9C85] text-white font-semibold rounded-full hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30 transform hover:-translate-y-1"
                                >
                                    SHOP NOW
                                </Link>
                                <Link
                                    to="/about"
                                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    LEARN MORE
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer animate-bounce"
                        onClick={scrollToContent}
                    >
                        <span className="text-white text-sm mb-2 tracking-wider">SCROLL</span>
                        <FaArrowDown className="text-white text-xl" />
                    </div>
                </div>
            </div>

            {/**
             * ===============================================
             *             Trending Items View
             * ===============================================
             */}
            <div className="w-full min-h-screen flex justify-center pb-[100px]">
                <div className="w-[90%] lg:w-[80%] xl:w-[75%] mx-auto">
                    <div className="w-full flex flex-col items-center mt-[80px] mb-[60px]">
                        <span className="inline-block px-4 py-2 bg-[#1B9C85]/10 text-[#1B9C85] text-sm font-semibold rounded-full mb-4 tracking-wider">
                            TRENDING NOW
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-4">
                            A Twist of Magic to Every Day
                        </h2>
                        <div className="w-20 h-1 bg-[#1B9C85] rounded-full mb-6"></div>
                        <p className="text-gray-600 text-center max-w-2xl text-base md:text-lg">
                            Explore our curated collection of premium beauty products designed to enhance your natural
                            radiance.
                        </p>
                    </div>

                    <div className="w-full">
                        <TrendingItems />
                    </div>

                    <div className="w-full flex justify-center mt-12">
                        <Link
                            to="/products"
                            className="px-10 py-4 border-2 border-[#1B9C85] text-[#1B9C85] font-semibold rounded-full hover:bg-[#1B9C85] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                            VIEW ALL PRODUCTS
                        </Link>
                    </div>
                </div>
            </div>

            {/**
             * ===============================================
             *             Store Features
             * ===============================================
             */}

            <div className="w-full bg-white py-20">
                <div className="w-[90%] lg:w-[80%] xl:w-[75%] mx-auto">
                    <div className="w-full flex flex-col lg:flex-row justify-center items-center rounded-3xl overflow-hidden bg-gradient-to-br from-[#F8F8FA] to-[#EDF6EE] shadow-xl">
                        <div className="hidden lg:flex w-full lg:w-[55%] h-[500px]">
                            <video
                                className="w-full h-full object-cover pointer-events-none"
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="public\Homepage video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <div className="w-full lg:w-[45%] h-full flex justify-center items-center py-16 lg:py-0">
                            <div className="w-[85%] flex flex-col items-center lg:items-start justify-center">
                                <span className="inline-block px-4 py-2 bg-[#1B9C85]/10 text-[#1B9C85] text-sm font-semibold rounded-full mb-4 tracking-wider">
                                    OUR STORY
                                </span>

                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center lg:text-left mb-6">
                                    Unleash Your Inner Confidence
                                </h2>

                                <p className="text-gray-600 text-center lg:text-left mb-8 leading-relaxed">
                                    Discover styles that bring out your confidence and redefine the way you shine every
                                    day. Our products are crafted with care to help you look and feel your best.
                                </p>

                                <Link
                                    to="/products"
                                    className="px-8 py-4 bg-[#1B9C85] text-white font-semibold rounded-full hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30 transform hover:-translate-y-1"
                                >
                                    SHOP NOW
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full py-24 bg-[#EDF6EE]">
                <div className="w-[90%] lg:w-[80%] xl:w-[75%] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-[#1B9C85]/10 text-[#1B9C85] text-sm font-semibold rounded-full mb-4 tracking-wider">
                            WHY CHOOSE US
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">We Care About Your Beauty</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 text-4xl flex justify-center items-center rounded-2xl bg-gradient-to-br from-[#1B9C85]/10 to-[#1B9C85]/20 text-[#1B9C85] group-hover:bg-[#1B9C85] group-hover:text-white transition-all duration-300">
                                <FaPercentage />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Season Sale</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Summer beauty made easy. Get your favorite cosmetics at hot prices!
                            </p>
                        </div>

                        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 text-4xl flex justify-center items-center rounded-2xl bg-gradient-to-br from-[#1B9C85]/10 to-[#1B9C85]/20 text-[#1B9C85] group-hover:bg-[#1B9C85] group-hover:text-white transition-all duration-300">
                                <FaShippingFast />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Free Shipping</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Beauty delivered to your door with no shipping fees on all orders!
                            </p>
                        </div>

                        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 text-4xl flex justify-center items-center rounded-2xl bg-gradient-to-br from-[#1B9C85]/10 to-[#1B9C85]/20 text-[#1B9C85] group-hover:bg-[#1B9C85] group-hover:text-white transition-all duration-300">
                                <FaUserShield />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Money Back Guarantee</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Beauty you can trust, or your money back. 100% satisfaction guaranteed!
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
