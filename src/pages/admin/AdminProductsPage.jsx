import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPackage, FiDollarSign, FiAlertCircle, FiBox } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = () => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((response) => {
            setProducts(response.data);
            setLoaded(true);
        });
    };

    // Initial load
    useEffect(() => {
        fetchProducts();
    }, []);

    // Polling for real-time updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchProducts();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.productID.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchTerm, products]);

    async function deleteProduct(id) {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login to delete a product");
            return;
        }
        setDeleteLoading(id);
        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id, {
                headers: { Authorization: "Bearer " + token },
            });
            setLoaded(false);
            setShowDeleteModal(null);
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error deleting product");
        } finally {
            setDeleteLoading(null);
        }
    }

    // Stats
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
    const lowStock = products.filter(p => (p.stock || 0) <= 5).length;

    return (
        <div className="w-full h-full p-6 bg-gray-50 overflow-auto">
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiTrash2 className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Product?</h3>
                        <p className="text-gray-500 text-center mb-6">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteProduct(showDeleteModal)}
                                disabled={deleteLoading === showDeleteModal}
                                className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {deleteLoading === showDeleteModal ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FiTrash2 className="w-4 h-4" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
                    <p className="text-gray-500">Manage your product inventory</p>
                </div>
                <Link
                    to="/admin/addProduct"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all shadow-lg shadow-[#1B9C85]/30"
                >
                    <FiPlus className="w-5 h-5" />
                    Add Product
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Products</p>
                            <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                        </div>
                        <div className="w-14 h-14 bg-[#1B9C85]/10 rounded-2xl flex items-center justify-center">
                            <FiPackage className="w-7 h-7 text-[#1B9C85]" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Inventory Value</p>
                            <p className="text-3xl font-bold text-blue-600">LKR {totalValue.toLocaleString()}</p>
                        </div>
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <FiDollarSign className="w-7 h-7 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Low Stock Items</p>
                            <p className="text-3xl font-bold text-orange-500">{lowStock}</p>
                        </div>
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                            <FiAlertCircle className="w-7 h-7 text-orange-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by product name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Products Table */}
            {!loaded ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <FiBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or add a new product</p>
                    <Link
                        to="/admin/addProduct"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all"
                    >
                        <FiPlus className="w-5 h-5" />
                        Add Product
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Original Price</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, index) => {
                                    const discount = product.labeledPrice > product.price
                                        ? Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100)
                                        : 0;
                                    const isLowStock = (product.stock || 0) <= 5;
                                    
                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                        >
                                            {/* Product Info */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                        {product.images?.[0] ? (
                                                            <img 
                                                                src={product.images[0]} 
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <FiPackage className="w-6 h-6 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 mb-1">{product.name}</p>
                                                        <p className="text-sm text-[#1B9C85] font-medium">#{product.productID}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Price */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="font-bold text-gray-900">LKR {product.price?.toFixed(2)}</span>
                                                    {discount > 0 && (
                                                        <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full mt-1">
                                                            {discount}% OFF
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            {/* Labeled Price */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`font-medium ${discount > 0 ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                                    LKR {product.labeledPrice?.toFixed(2)}
                                                </span>
                                            </td>
                                            {/* Stock */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                                                    isLowStock
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}>
                                                    <span className={`w-2 h-2 rounded-full ${isLowStock ? "bg-red-500" : "bg-green-500"}`}></span>
                                                    {product.stock || 0} units
                                                </span>
                                            </td>
                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => navigate("/admin/editProduct", { state: product })}
                                                        className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                                                        title="Edit Product"
                                                    >
                                                        <FiEdit2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setShowDeleteModal(product.productID)}
                                                        className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all"
                                                        title="Delete Product"
                                                    >
                                                        <FiTrash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Table Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-700">{filteredProducts.length}</span> of <span className="font-medium text-gray-700">{totalProducts}</span> products
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;
