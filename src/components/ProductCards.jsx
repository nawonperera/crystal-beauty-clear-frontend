import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import { useState, useEffect } from "react";
import { isLoggedIn, toggleWishlistItem, getWishlist } from "../utils/wishlist";
import { addToCart } from "../utils/cart";
import toast from "react-hot-toast";

const ProductCards = ({ product, viewMode = "grid" }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const productId = product.productID;

    const discount =
        product.price < product.labeledPrice
            ? Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100)
            : null;

    useEffect(() => {
        const checkWishlist = async () => {
            if (isLoggedIn()) {
                try {
                    const wishlist = await getWishlist();
                    setIsWishlisted(wishlist.includes(productId));
                } catch (error) {
                    console.error("Error checking wishlist:", error);
                }
            }
        };
        checkWishlist();
    }, [productId]);

    const handleWishlistClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLoggedIn()) {
            toast.error("Please login to add items to wishlist");
            navigate("/login");
            return;
        }

        setIsLoading(true);
        try {
            const result = await toggleWishlistItem(productId);
            setIsWishlisted(result.action === "added");
            toast.success(result.message);
        } catch (error) {
            toast.error("Failed to update wishlist");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        addToCart(product, 1);
        toast.success(`${product.name} added to cart`);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    if (viewMode === "list") {
        return (
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-72 h-64 md:h-auto overflow-hidden">
                        <img 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            src={product.images[0]} 
                            alt={product.name} 
                        />
                        {discount && (
                            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                                -{discount}%
                            </span>
                        )}
                        <button
                            onClick={handleWishlistClick}
                            disabled={isLoading}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors disabled:opacity-50"
                        >
                            {isWishlisted ? (
                                <FaHeart className="w-5 h-5 text-red-500" />
                            ) : (
                                <FaRegHeart className="w-5 h-5 text-gray-600" />
                            )}
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <p className="text-[#1B9C85] text-sm font-medium mb-2">#{product.productID}</p>
                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#1B9C85] transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-gray-500 mb-4 line-clamp-2">
                                {product.description || "Premium quality beauty product for your daily skincare routine."}
                            </p>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-0.5">
                                    {renderStars(product.rating || 4.2)}
                                </div>
                                <span className="text-sm text-gray-500">({product.reviews || 120} reviews)</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-[#1B9C85]">LKR {product.price.toFixed(2)}</p>
                                {product.price < product.labeledPrice && (
                                    <p className="text-sm text-gray-400 line-through">LKR {product.labeledPrice.toFixed(2)}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddToCart}
                                    className="px-6 py-3 bg-gradient-to-r from-[#1B9C85] to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#1B9C85]/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    src={product.images[0]} 
                    alt={product.name} 
                />
                
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* Discount Badge */}
                {discount && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{discount}%
                    </span>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlistClick}
                    disabled={isLoading}
                    className={`absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isHovered || isWishlisted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    } hover:bg-white disabled:opacity-50`}
                >
                    {isWishlisted ? (
                        <FaHeart className="w-5 h-5 text-red-500" />
                    ) : (
                        <FaRegHeart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                    )}
                </button>

                {/* Quick Actions */}
                <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    <Link
                        to={`/overview/${product.productID}`}
                        className="flex-1 py-3 bg-white/95 backdrop-blur-sm text-gray-800 font-semibold rounded-xl text-center hover:bg-white transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        <FiEye className="w-4 h-4" />
                        Quick View
                    </Link>
                </div>
            </div>

            {/* Product Details */}
            <div className="p-5">
                <p className="text-[#1B9C85] text-xs font-semibold mb-2 tracking-wider">#{product.productID}</p>
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate group-hover:text-[#1B9C85] transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                        {renderStars(product.rating || 4.2)}
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews || 120})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold text-[#1B9C85]">LKR {product.price.toFixed(2)}</p>
                        {product.price < product.labeledPrice && (
                            <p className="text-sm text-gray-400 line-through">LKR {product.labeledPrice.toFixed(2)}</p>
                        )}
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        className="w-12 h-12 bg-gradient-to-br from-[#1B9C85] to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#1B9C85]/30 hover:shadow-xl hover:scale-110 transition-all duration-300"
                    >
                        <FiShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCards;
