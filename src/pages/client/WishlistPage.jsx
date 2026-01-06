import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FiHeart, FiTrash2, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { getWishlist, removeFromWishlist, isLoggedIn } from "../../utils/wishlist";
import { addToCart } from "../../utils/cart";
import Loader from "../../components/Loader";

const WishlistPage = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            toast.error("Please login to view your wishlist");
            navigate("/login");
            return;
        }
        fetchWishlistProducts();
    }, [navigate]);

    const fetchWishlistProducts = async () => {
        setLoading(true);
        try {
            const wishlist = await getWishlist();
            
            if (wishlist.length > 0) {
                const productPromises = wishlist.map(productId =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`)
                        .then(res => res.data.product)
                        .catch(() => null)
                );
                const products = await Promise.all(productPromises);
                setWishlistProducts(products.filter(p => p !== null));
            } else {
                setWishlistProducts([]);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            toast.error("Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(productId);
            setWishlistProducts(prev => prev.filter(p => p.productID !== productId));
            toast.success("Removed from wishlist");
        } catch (error) {
            toast.error("Failed to remove from wishlist");
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        toast.success("Added to cart");
    };

    return (
        <div className="min-h-screen bg-[#EDF6EE]">
            <Header navBarColor="text-black" headerImage="/Logo.png" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-[#1B9C85] hover:text-[#158a74] mb-6 transition-colors font-medium"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    <span>Continue Shopping</span>
                </Link>

                {/* Page Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <FiHeart className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                        <p className="text-gray-500">{wishlistProducts.length} items saved</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader />
                    </div>
                ) : wishlistProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <FiHeart className="w-12 h-12 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Save items you love by clicking the heart icon on any product.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B9C85] text-white font-semibold rounded-full hover:bg-[#158a74] transition-all duration-300"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistProducts.map((product) => (
                            <div
                                key={product.productID}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <Link to={`/overview/${product.productID}`}>
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </Link>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(product.productID)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                                    >
                                        <FiTrash2 className="w-5 h-5 text-red-500" />
                                    </button>
                                    {product.labeledPrice > product.price && (
                                        <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                            -{Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100)}%
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <Link to={`/overview/${product.productID}`}>
                                        <h3 className="font-bold text-gray-900 mb-2 truncate hover:text-[#1B9C85] transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl font-bold text-[#1B9C85]">
                                            LKR {product.price.toFixed(2)}
                                        </span>
                                        {product.labeledPrice > product.price && (
                                            <span className="text-sm text-gray-400 line-through">
                                                LKR {product.labeledPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full py-3 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all flex items-center justify-center gap-2"
                                    >
                                        <FiShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default WishlistPage;
