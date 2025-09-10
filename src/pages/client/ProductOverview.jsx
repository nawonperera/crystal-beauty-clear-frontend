import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import { addToCart } from "../../utils/cart.js";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const ProductOverview = () => {
    const navigate = useNavigate();
    const params = useParams();

    if (!params.id) {
        window.location.href = "/products";
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); // loaded, error
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (status === "loading") {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id)
                .then((res) => {
                    setProduct(res.data.product);
                    setStatus("loaded");
                })
                .catch(() => {
                    toast.error("Product is not available");
                    setStatus("error");
                });
        }
    }, [status, params.id]);

    // Auto slide every 7s
    useEffect(() => {
        if (status === "loaded" && product?.images?.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
            }, 7000);

            return () => clearInterval(interval);
        }
    }, [currentSlide, status, product]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    };

    const goToSlide = (index) => setCurrentSlide(index);

    return (
        <>
            <div className="w-full min-h-screen bg-[#EDF6EE] flex flex-col">
                <div className="py-[10px]">
                    <Header navBarColor="text-black" headerImage="public\logo.png" />
                </div>

                {status === "loading" && <Loader />}
                {status === "error" && <div className="text-center text-red-500 py-10">ERROR</div>}

                {status === "loaded" && (
                    <div className="w-full flex flex-col lg:flex-row p-4 lg:p-10 bg-white flex-grow">
                        {/* Mobile title */}
                        <h1 className="text-3xl font-bold text-center mb-6 lg:hidden">
                            {product.name}
                            {" | "}
                            <span className="text-3xl me-[20px] text-gray-500">{product.altNames.join(" | ")}</span>
                        </h1>

                        {/* Slider Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-2xl">
                                <div
                                    className="flex transition-transform duration-700 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {product.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative min-w-full h-64 md:h-96 lg:h-[500px] flex items-center justify-center"
                                        >
                                            <div
                                                className="absolute inset-0 bg-no-repeat bg-cover bg-center"
                                                style={{ backgroundImage: `url(${img})` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-black/20"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-20"
                                >
                                    <svg
                                        className="w-4 h-4 md:w-6 md:h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-20"
                                >
                                    <svg
                                        className="w-4 h-4 md:w-6 md:h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>

                                {/* Dots */}
                                <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                    {product.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                                index === currentSlide
                                                    ? "bg-white scale-125"
                                                    : "bg-white/50 hover:bg-white/80"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="w-full lg:w-1/2 py-8 lg:py-16 lg:px-8">
                            <h1 className="hidden lg:block text-3xl font-bold text-center mb-6">
                                {product.name}
                                {" | "}
                                <span className="text-3xl me-[20px] text-gray-500">{product.altNames.join(" | ")}</span>
                            </h1>

                            <div className="w-full flex justify-center mb-6">
                                {product.labeledPrice > product.price ? (
                                    <>
                                        <h2 className="text-2xl mr-4">LKR: {product.price.toFixed(2)}</h2>
                                        <h2 className="text-2xl line-through text-gray-500">
                                            LKR: {product.labeledPrice.toFixed(2)}
                                        </h2>
                                    </>
                                ) : (
                                    <h2 className="text-3xl">LKR: {product.price.toFixed(2)}</h2>
                                )}
                            </div>

                            <p className="text-xl text-center text-gray-500 mb-6">{product.description}</p>

                            <div className="w-full flex justify-center gap-4 mb-6">
                                <button
                                    className="px-6 py-3 bg-[#1B9C85]  border-[#1B9C85] hover:bg-[#178E79] hover:text-white text-white transition"
                                    onClick={() => {
                                        addToCart(product, 1);
                                        toast.success("Product added to cart");
                                    }}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/checkout", {
                                            state: {
                                                items: [
                                                    {
                                                        productId: product.productId,
                                                        name: product.name,
                                                        altNames: product.altNames,
                                                        price: product.price,
                                                        labeledPrice: product.labeledPrice,
                                                        image: product.images[0],
                                                        quantity: 1,
                                                    },
                                                ],
                                            },
                                        });
                                    }}
                                    className="px-6 py-3 bg-[#1B9C85]  border-[#1B9C85] hover:bg-[#178E79] hover:text-white text-white transition"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        </>
    );
};

export default ProductOverview;
