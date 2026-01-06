import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
import ProductCards from "../../components/ProductCards.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { FiSearch, FiX, FiGrid, FiList, FiChevronDown, FiSliders } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

const ProductsPage = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        hasMore: false
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const categories = [
        { id: "all", label: "All Products" },
        { id: "skincare", label: "Skincare" },
        { id: "haircare", label: "Hair Care" },
        { id: "makeup", label: "Makeup" },
        { id: "bodycare", label: "Body Care" },
        { id: "fragrance", label: "Fragrance" }
    ];

    const fetchProducts = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            
            if (search.trim()) params.append("search", search.trim());
            if (activeCategory !== "all") params.append("category", activeCategory);
            if (priceRange.min) params.append("minPrice", priceRange.min);
            if (priceRange.max) params.append("maxPrice", priceRange.max);
            if (sortBy) params.append("sortBy", sortBy);
            params.append("page", page);
            params.append("limit", 12);

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/product/filter?${params.toString()}`
            );

            setProductList(response.data.products);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error("Error fetching products:", error);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/`);
                setProductList(response.data);
                setPagination({
                    currentPage: 1,
                    totalPages: 1,
                    totalProducts: response.data.length,
                    hasMore: false
                });
            } catch (fallbackError) {
                console.error("Fallback error:", fallbackError);
                setProductList([]);
            }
        } finally {
            setLoading(false);
        }
    }, [search, activeCategory, priceRange, sortBy]);

    useEffect(() => {
        fetchProducts(1);
    }, [activeCategory, sortBy]);

    const handleSearch = () => {
        fetchProducts(1);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const clearFilters = () => {
        setSearch("");
        setActiveCategory("all");
        setSortBy("newest");
        setPriceRange({ min: "", max: "" });
    };

    const applyPriceFilter = () => {
        fetchProducts(1);
    };

    return (
        <div className="min-h-screen w-full bg-[#EDF6EE] overflow-x-hidden">
            {/* Hero Banner Section */}
            <div className="relative h-[45vh] w-full bg-gradient-to-br from-[#0d5c4f] via-[#1B9C85] to-[#2dd4bf] flex flex-col">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="py-[10px]">
                    <Header navBarColor="text-white" headerImage="/Footer-logo.png" />
                </div>

                <div className="flex-1 flex items-center justify-center text-center px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <HiSparkles className="w-4 h-4 text-green-300" />
                            <span className="text-white/90 text-sm font-medium">Premium Beauty Collection</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            Our <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">Products</span>
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Discover our curated collection of premium beauty essentials
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full pl-12 pr-12 py-4 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all duration-300"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {search && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        fetchProducts(1);
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-8 py-4 bg-[#1B9C85] text-white font-semibold rounded-xl shadow-lg hover:bg-[#158a74] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <FiSearch className="w-5 h-5" />
                            Search
                        </button>
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="lg:hidden px-6 py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 flex items-center justify-center gap-2"
                        >
                            <FiSliders className="w-5 h-5" />
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content - Sidebar + Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Sidebar - Filters (20%) */}
                    <aside className={`lg:w-1/5 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                                {(activeCategory !== "all" || priceRange.min || priceRange.max) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-[#1B9C85] hover:text-[#158a74] font-medium"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            {/* Categories */}
                            <div className="mb-8">
                                <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Categories</h4>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                                activeCategory === category.id
                                                    ? "bg-[#1B9C85] text-white shadow-md"
                                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                            }`}
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8">
                                <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Price Range</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:border-[#1B9C85] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                                        <input
                                            type="number"
                                            placeholder="10000"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:border-[#1B9C85] transition-all"
                                        />
                                    </div>
                                    <button
                                        onClick={applyPriceFilter}
                                        className="w-full py-3 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all"
                                    >
                                        Apply Price
                                    </button>
                                </div>
                            </div>

                            {/* Sort By */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Sort By</h4>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full appearance-none bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:border-[#1B9C85] transition-all cursor-pointer"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name-asc">Name: A to Z</option>
                                        <option value="name-desc">Name: Z to A</option>
                                    </select>
                                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content - Products (80%) */}
                    <main className="lg:w-4/5">
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {activeCategory === "all" ? "All Products" : categories.find(c => c.id === activeCategory)?.label}
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    {loading ? "Loading..." : `${pagination.totalProducts} products found`}
                                </p>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center bg-gray-100 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2.5 rounded-lg transition-all duration-300 ${
                                            viewMode === "grid" ? "bg-white shadow text-[#1B9C85]" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        <FiGrid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2.5 rounded-lg transition-all duration-300 ${
                                            viewMode === "list" ? "bg-white shadow text-[#1B9C85]" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        <FiList className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader />
                            </div>
                        ) : productList.length > 0 ? (
                            <>
                                <div className={`grid gap-6 ${
                                    viewMode === "grid" 
                                        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                                        : "grid-cols-1"
                                }`}>
                                    {productList.map((product) => (
                                        <ProductCards 
                                            key={product.productID} 
                                            product={product} 
                                            viewMode={viewMode}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-12">
                                        <button
                                            onClick={() => fetchProducts(pagination.currentPage - 1)}
                                            disabled={pagination.currentPage === 1}
                                            className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-600 font-medium hover:border-[#1B9C85] hover:text-[#1B9C85] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            Previous
                                        </button>
                                        
                                        {[...Array(Math.min(pagination.totalPages, 5))].map((_, index) => {
                                            const pageNum = index + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => fetchProducts(pageNum)}
                                                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                                        pagination.currentPage === pageNum
                                                            ? "bg-[#1B9C85] text-white"
                                                            : "border-2 border-gray-200 text-gray-600 hover:border-[#1B9C85] hover:text-[#1B9C85]"
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                        
                                        <button
                                            onClick={() => fetchProducts(pagination.currentPage + 1)}
                                            disabled={!pagination.hasMore}
                                            className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-600 font-medium hover:border-[#1B9C85] hover:text-[#1B9C85] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FiSearch className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductsPage;
