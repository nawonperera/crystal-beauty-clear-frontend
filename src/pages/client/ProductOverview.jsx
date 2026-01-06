import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import { addToCart } from "../../utils/cart.js";
import { isLoggedIn, toggleWishlistItem, getWishlist } from "../../utils/wishlist.js";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { FiShoppingCart, FiHeart, FiShare2, FiChevronLeft, FiChevronRight, FiCheck, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";

const ProductOverview = () => {
    const navigate = useNavigate();
    const params = useParams();

    if (!params.id) {
        window.location.href = "/products";
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const productSectionRef = useRef(null);

    useEffect(() => {
        if (status === "loading") {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id)
                .then((res) => {
                    setProduct(res.data.product);
                    setStatus("loaded");
                    // Check wishlist status
                    checkWishlistStatus(res.data.product.productID);
                })
                .catch(() => {
                    toast.error("Product is not available");
                    setStatus("error");
                });
        }
    }, [status, params.id]);

    // Scroll to product section when loaded
    useEffect(() => {
        if (status === "loaded" && productSectionRef.current) {
            setTimeout(() => {
                productSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }, [status]);

    const checkWishlistStatus = async (productId) => {
        if (isLoggedIn()) {
            try {
                const wishlist = await getWishlist();
                setIsWishlisted(wishlist.includes(productId));
            } catch (error) {
                console.error("Error checking wishlist:", error);
            }
        }
    };

    const handleWishlistClick = async () => {
        if (!isLoggedIn()) {
            toast.error("Please login to add items to wishlist");
            navigate("/login");
            return;
        }

        setWishlistLoading(true);
        try {
            const result = await toggleWishlistItem(product.productID);
            setIsWishlisted(result.action === "added");
            toast.success(result.message);
        } catch (error) {
            toast.error("Failed to update wishlist");
        } finally {
            setWishlistLoading(false);
        }
    };

    useEffect(() => {
        if (status === "loaded" && product?.images?.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
            }, 7000);
            return () => clearInterval(interval);
        }
    }, [currentSlide, status, product]);

    const nextSlide = () => setCurrentSlide((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    const goToSlide = (index) => setCurrentSlide(index);

    const discount = product?.labeledPrice > product?.price 
        ? Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100) 
        : 0;

    return (
        <div className="bg-[#EDF6EE] min-h-screen">
            <Header navBarColor="text-black" headerImage="/Logo.png" />
            
            <div className="w-full py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center gap-2 text-sm text-gray-500">
                            <li><Link to="/" className="hover:text-[#1B9C85] transition-colors">Home</Link></li>
                            <li>/</li>
                            <li><Link to="/products" className="hover:text-[#1B9C85] transition-colors">Products</Link></li>
                            <li>/</li>
                            <li className="text-gray-900 font-medium truncate max-w-[200px]">{product?.name || 'Loading...'}</li>
                        </ol>
                    </nav>

                    {status === "loading" && (
                        <div className="flex justify-center items-center min-h-[60vh]">
                            <Loader />
                        </div>
                    )}
                    
                    {status === "error" && (
                        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-4xl">😕</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h2>
                            <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B9C85] text-white font-semibold rounded-full hover:bg-[#158a74] transition-all">
                                Browse Products
                            </Link>
                        </div>
                    )}

                    {status === "loaded" && (
                        <div ref={productSectionRef} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                {/* Image Gallery */}
                                <div className="w-full lg:w-1/2 p-6 lg:p-10">
                                    {/* Main Image */}
                                    <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-4">
                                        <div className="relative aspect-square">
                                            <div
                                                className="flex transition-transform duration-500 ease-out h-full"
                                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                            >
                                                {product.images.map((img, index) => (
                                                    <div key={index} className="min-w-full h-full flex items-center justify-center p-4">
                                                        <img 
                                                            src={img} 
                                                            alt={`${product.name} - ${index + 1}`}
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Discount Badge */}
                                        {discount > 0 && (
                                            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                                -{discount}% OFF
                                            </span>
                                        )}

                                        {/* Navigation Arrows */}
                                        {product.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevSlide}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                                                >
                                                    <FiChevronLeft className="w-6 h-6 text-gray-700" />
                                                </button>
                                                <button
                                                    onClick={nextSlide}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                                                >
                                                    <FiChevronRight className="w-6 h-6 text-gray-700" />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {product.images.length > 1 && (
                                        <div className="flex gap-3 justify-center">
                                            {product.images.map((img, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => goToSlide(index)}
                                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                                        index === currentSlide 
                                                            ? 'border-[#1B9C85] shadow-lg scale-105' 
                                                            : 'border-transparent opacity-60 hover:opacity-100'
                                                    }`}
                                                >
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="w-full lg:w-1/2 p-6 lg:p-10 lg:border-l border-gray-100">
                                    {/* Product ID */}
                                    <span className="inline-block px-3 py-1 bg-[#1B9C85]/10 text-[#1B9C85] text-sm font-semibold rounded-full mb-4">
                                        #{product.productID}
                                    </span>

                                    {/* Title */}
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                        {product.name}
                                    </h1>
                                    
                                    {/* Alt Names */}
                                    {product.altNames?.length > 0 && (
                                        <p className="text-lg text-gray-500 mb-4">
                                            {product.altNames.join(" • ")}
                                        </p>
                                    )}

                                    {/* Rating */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar key={star} className={star <= 4 ? "text-yellow-400" : "text-gray-300"} />
                                            ))}
                                        </div>
                                        <span className="text-gray-500">(128 reviews)</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-4 mb-6">
                                        <span className="text-4xl font-bold text-[#1B9C85]">
                                            LKR {product.price.toFixed(2)}
                                        </span>
                                        {product.labeledPrice > product.price && (
                                            <span className="text-xl text-gray-400 line-through">
                                                LKR {product.labeledPrice.toFixed(2)}
                                            </span>
                                        )}
                                        {discount > 0 && (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                                                Save LKR {(product.labeledPrice - product.price).toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        {product.description}
                                    </p>

                                    {/* Quantity Selector */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-gray-100 rounded-full p-1">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-[#1B9C85] hover:text-white transition-all"
                                                >
                                                    -
                                                </button>
                                                <span className="w-16 text-center text-xl font-bold">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-[#1B9C85] hover:text-white transition-all"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                <FiCheck className="inline w-4 h-4 text-green-500 mr-1" />
                                                In Stock
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                        <button
                                            onClick={() => {
                                                addToCart(product, quantity);
                                                toast.success(`${quantity} item(s) added to cart`);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-[#1B9C85] text-[#1B9C85] font-semibold rounded-2xl hover:bg-[#1B9C85] hover:text-white transition-all duration-300"
                                        >
                                            <FiShoppingCart className="w-5 h-5" />
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate("/checkout", {
                                                    state: {
                                                        items: [{
                                                            productId: product.productID,
                                                            name: product.name,
                                                            altNames: product.altNames,
                                                            price: product.price,
                                                            labeledPrice: product.labeledPrice,
                                                            image: product.images[0],
                                                            quantity: quantity,
                                                        }],
                                                    },
                                                });
                                            }}
                                            className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-[#1B9C85] text-white font-semibold rounded-2xl hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30"
                                        >
                                            Buy Now
                                        </button>
                                    </div>

                                    {/* Wishlist & Share */}
                                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                                        <button 
                                            onClick={handleWishlistClick}
                                            disabled={wishlistLoading}
                                            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors disabled:opacity-50"
                                        >
                                            {isWishlisted ? <FaHeart className="w-5 h-5 text-red-500" /> : <FiHeart className="w-5 h-5" />}
                                            <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-600 hover:text-[#1B9C85] transition-colors">
                                            <FiShare2 className="w-5 h-5" />
                                            <span>Share</span>
                                        </button>
                                    </div>

                                    {/* Features */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <FiTruck className="w-6 h-6 text-[#1B9C85]" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                                                <p className="text-xs text-gray-500">On orders over LKR 5000</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <FiShield className="w-6 h-6 text-[#1B9C85]" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                                                <p className="text-xs text-gray-500">100% protected</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <FiRefreshCw className="w-6 h-6 text-[#1B9C85]" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
                                                <p className="text-xs text-gray-500">30 day returns</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductOverview;
