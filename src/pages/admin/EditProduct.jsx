import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";
import { FiPackage, FiDollarSign, FiTag, FiFileText, FiImage, FiBox, FiArrowLeft, FiSave, FiX } from "react-icons/fi";

const EditProduct = () => {
    const locationData = useLocation();
    const navigate = useNavigate();
    
    if (locationData.state == null) {
        toast.error("Please select a product to edit");
        window.location.href = "/admin/products";
    }
    
    const [productId] = useState(locationData.state.productID);
    const [name, setName] = useState(locationData.state.name);
    const [altNames, setAltNames] = useState(locationData.state.altNames.join(", "));
    const [price, setPrice] = useState(locationData.state.price);
    const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState(locationData.state.images || []);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const files = e.target.files;
        setImages(files);
        
        // Create preview URLs
        const previews = [];
        for (let i = 0; i < files.length; i++) {
            previews.push(URL.createObjectURL(files[i]));
        }
        if (previews.length > 0) {
            setImagePreview(previews);
        }
    };

    const handleSubmit = async () => {
        if (!name || !price || !labeledPrice || !stock) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        const promisesArray = [];
        for (let i = 0; i < images.length; i++) {
            const promise = mediaUpload(images[i]);
            promisesArray[i] = promise;
        }

        try {
            let result = await Promise.all(promisesArray);

            if (images.length == 0) {
                result = locationData.state.images;
            }

            const altNamesInArray = altNames.split(",").map(name => name.trim()).filter(name => name);
            const product = {
                productID: productId,
                name: name,
                altNames: altNamesInArray,
                price: parseFloat(price),
                labeledPrice: parseFloat(labeledPrice),
                description: description,
                stock: parseInt(stock),
                images: result,
            };
            const token = localStorage.getItem("token");

            await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, product, {
                headers: { Authorization: "Bearer " + token },
            });
            toast.success("Product updated successfully");
            navigate("/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Product updating failed");
        } finally {
            setLoading(false);
        }
    };

    const discount = labeledPrice > price 
        ? Math.round(((labeledPrice - price) / labeledPrice) * 100) 
        : 0;

    return (
        <div className="w-full h-full p-6 bg-gray-50 overflow-auto">
            {/* Header */}
            <div className="mb-8">
                <Link 
                    to="/admin/products" 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1B9C85] transition-colors mb-4"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Product</h1>
                <p className="text-gray-500">Update product information for <span className="text-[#1B9C85] font-medium">#{productId}</span></p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <FiPackage className="w-5 h-5 text-[#1B9C85]" />
                            Basic Information
                        </h2>
                        
                        <div className="space-y-5">
                            {/* Product ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
                                <input
                                    disabled
                                    value={productId}
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                        placeholder="Enter product name"
                                    />
                                </div>
                            </div>

                            {/* Alternative Names */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Names</label>
                                <input
                                    value={altNames}
                                    onChange={(e) => setAltNames(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                    placeholder="Separate names with commas"
                                />
                                <p className="text-xs text-gray-500 mt-1">Separate multiple names with commas</p>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FiFileText className="inline w-4 h-4 mr-1" />
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all resize-none"
                                    placeholder="Enter product description..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <FiDollarSign className="w-5 h-5 text-[#1B9C85]" />
                            Pricing & Stock
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Selling Price <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">LKR</span>
                                    <input
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="number"
                                        className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Labeled Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Original Price <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">LKR</span>
                                    <input
                                        value={labeledPrice}
                                        onChange={(e) => setLabeledPrice(e.target.value)}
                                        type="number"
                                        className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FiBox className="inline w-4 h-4 mr-1" />
                                    Stock <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    type="number"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {discount > 0 && (
                            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-green-700 font-medium">
                                    💰 Discount: <span className="text-green-600">{discount}% OFF</span> 
                                    <span className="text-green-600 ml-2">(Save LKR {(labeledPrice - price).toFixed(2)})</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Images */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <FiImage className="w-5 h-5 text-[#1B9C85]" />
                            Product Images
                        </h2>
                        
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#1B9C85] transition-colors">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                multiple
                                accept="image/*"
                                className="hidden"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-700 font-medium mb-1">Click to upload new images</p>
                                <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                            </label>
                        </div>

                        {/* Image Preview */}
                        {imagePreview.length > 0 && (
                            <div className="mt-6">
                                <p className="text-sm font-medium text-gray-700 mb-3">Current Images</p>
                                <div className="grid grid-cols-4 gap-4">
                                    {imagePreview.map((img, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                            <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar - Preview & Actions */}
                <div className="space-y-6">
                    {/* Preview Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
                        
                        <div className="rounded-xl overflow-hidden bg-gray-100 mb-4 aspect-square">
                            {imagePreview[0] ? (
                                <img src={imagePreview[0]} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FiImage className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2 mb-6">
                            <p className="text-xs text-[#1B9C85] font-medium">#{productId}</p>
                            <h3 className="font-bold text-gray-900 text-lg">{name || "Product Name"}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-[#1B9C85]">LKR {parseFloat(price || 0).toFixed(2)}</span>
                                {discount > 0 && (
                                    <span className="text-sm text-gray-400 line-through">LKR {parseFloat(labeledPrice || 0).toFixed(2)}</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">{stock || 0} units in stock</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="w-5 h-5" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                            <Link
                                to="/admin/products"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                            >
                                <FiX className="w-5 h-5" />
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
