import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiX } from "react-icons/fi";
import { getWishlist, WISHLIST_UPDATED_EVENT } from "../utils/wishlist";

const UserData = () => {
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [showWishlist, setShowWishlist] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token != null) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setUser(response.data.user);
                })
                .catch((e) => {
                    console.log(e);
                    setUser(null);
                });
        }
    }, [token]);

    const fetchWishlistProducts = useCallback(async (wishlistIds) => {
        if (wishlistIds.length > 0) {
            setLoading(true);
            try {
                const productPromises = wishlistIds.map(productId =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`)
                        .then(res => res.data.product)
                        .catch(() => null)
                );
                const products = await Promise.all(productPromises);
                setWishlistProducts(products.filter(p => p !== null));
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setWishlistProducts([]);
        }
    }, []);

    const fetchWishlist = useCallback(async () => {
        try {
            const wishlistData = await getWishlist();
            setWishlist(wishlistData);
            await fetchWishlistProducts(wishlistData);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }, [fetchWishlistProducts]);

    // Fetch wishlist when user is logged in
    useEffect(() => {
        if (user) {
            fetchWishlist();
        }
    }, [user, fetchWishlist]);

    // Listen for wishlist updates from other components
    useEffect(() => {
        const handleWishlistUpdate = (event) => {
            const updatedWishlist = event.detail;
            setWishlist(updatedWishlist);
            fetchWishlistProducts(updatedWishlist);
        };

        window.addEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);
        
        return () => {
            window.removeEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);
        };
    }, [fetchWishlistProducts]);

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/wishlist/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state
            const newWishlist = wishlist.filter(id => id !== productId);
            setWishlist(newWishlist);
            setWishlistProducts(prev => prev.filter(p => p.productID !== productId));
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    return (
        <>
            {user == null ? (
                <div className="h-full flex justify-center items-center flex-row gap-2">
                    <Link to="/login" className="px-5 py-2.5 bg-white text-[#1B9C85] text-sm font-semibold rounded-full hover:bg-gray-100 transition-all shadow-md">
                        Login
                    </Link>
                    <Link to="/register" className="px-5 py-2.5 bg-[#1B9C85] text-white text-sm font-semibold rounded-full hover:bg-[#158a74] transition-all border-2 border-white shadow-md">
                        Register
                    </Link>
                </div>
            ) : (
                <div className="h-full flex justify-center items-center flex-row gap-4">
                    {/* Wishlist Button */}
                    <div className="relative">
                        <button
                            onClick={() => setShowWishlist(!showWishlist)}
                            className="relative p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                        >
                            <FiHeart className="w-6 h-6 text-white" />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                                    {wishlist.length}
                                </span>
                            )}
                        </button>

                        {/* Wishlist Dropdown */}
                        {showWishlist && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900">My Wishlist ({wishlist.length})</h3>
                                    <button onClick={() => setShowWishlist(false)} className="text-gray-400 hover:text-gray-600">
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>
                                
                                <div className="max-h-80 overflow-y-auto">
                                    {loading ? (
                                        <div className="p-6 text-center">
                                            <div className="w-8 h-8 border-2 border-[#1B9C85] border-t-transparent rounded-full animate-spin mx-auto"></div>
                                            <p className="text-gray-500 mt-2">Loading...</p>
                                        </div>
                                    ) : wishlistProducts.length === 0 ? (
                                        <div className="p-6 text-center">
                                            <FiHeart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500">Your wishlist is empty</p>
                                            <Link 
                                                to="/products" 
                                                onClick={() => setShowWishlist(false)}
                                                className="text-[#1B9C85] text-sm font-medium hover:underline mt-2 inline-block"
                                            >
                                                Browse Products
                                            </Link>
                                        </div>
                                    ) : (
                                        wishlistProducts.map((product) => (
                                            <div key={product.productID} className="p-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
                                                <img 
                                                    src={product.images[0]} 
                                                    alt={product.name}
                                                    className="w-14 h-14 object-cover rounded-lg"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <Link 
                                                        to={`/overview/${product.productID}`}
                                                        onClick={() => setShowWishlist(false)}
                                                        className="font-medium text-gray-900 text-sm truncate block hover:text-[#1B9C85]"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                    <p className="text-[#1B9C85] font-semibold text-sm">
                                                        LKR {product.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromWishlist(product.productID)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                >
                                                    <FiX className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {wishlistProducts.length > 0 && (
                                    <div className="p-3 border-t border-gray-100">
                                        <Link
                                            to="/wishlist"
                                            onClick={() => setShowWishlist(false)}
                                            className="block w-full py-2 text-center text-[#1B9C85] font-medium hover:bg-[#1B9C85]/5 rounded-lg transition-all"
                                        >
                                            View All Wishlist
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <button
                        className="px-5 py-2.5 bg-white text-[#1B9C85] text-sm font-semibold rounded-full hover:bg-gray-100 transition-all shadow-md"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setUser(null);
                            window.location = "/login";
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </>
    );
};

export default UserData;
