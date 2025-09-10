import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";

const EditProduct = () => {
    const locationData = useLocation();
    const navigate = useNavigate();
    if (locationData.state == null) {
        toast.error("Please select a product to edit");
        window.location.href = "/admin/products";
    }
    const [productId, setProductId] = useState(locationData.state.productID);
    const [name, setName] = useState(locationData.state.name);
    const [altNames, setAltNames] = useState(locationData.state.altNames.join(","));
    const [price, setPrice] = useState(locationData.state.price);
    const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    const [images, setImages] = useState([]);

    const handleSubmit = async () => {
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

            const altNamesInArray = altNames.split(",");
            const product = {
                productID: productId,
                name: name,
                altNames: altNamesInArray,
                price: price,
                labeledPrice: labeledPrice,
                description: description,
                stock: stock,
                images: result,
            };
            const token = localStorage.getItem("token");
            //console.log(token);

            await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, product, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            toast.success("Product updated successfully");
            navigate("/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Product updating failed");
        }
    };

    return (
        <div className="w-full h-full rounded-lg flex justify-center items-center ">
            <div className="lg:w-[500px] lg:h-[500px] w-full h-full rounded-lg shadow-lg flex flex-col items-center ">
                <h1 className="text-3x1 font-bold text-gray-700 m-[10px]">Edit Product</h1>
                <input
                    disabled
                    value={productId}
                    onChange={(event) => {
                        setProductId(event.target.value);
                        toast.success(event.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="ProductID"
                />
                <input
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        toast.success(event.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Product Name"
                />
                <input
                    value={altNames}
                    onChange={(event) => {
                        setAltNames(event.target.value);
                        toast.success(event.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Alternative Names"
                />
                <input
                    value={price}
                    onChange={(event) => {
                        setPrice(event.target.value);
                        toast.success(event.target.value);
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Price"
                />
                <input
                    value={labeledPrice}
                    onChange={(event) => {
                        setLabeledPrice(event.target.value);
                        toast.success(event.target.value);
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Labeled Price"
                />
                <textarea
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                        toast.success(event.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Description"
                />

                <input
                    type="file"
                    onChange={(event) => {
                        setImages(event.target.files);
                    }}
                    multiple
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Product Images"
                />

                <input
                    value={stock}
                    onChange={(event) => {
                        setStock(event.target.value);
                        toast.success(event.target.value);
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Stock"
                />
                <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                    <Link
                        to={"/admin/products"}
                        className="bg-red-400 text-white p-[10px] w-[180px] text-center rounded-lg cursor-pointer hover:bg-red-600 "
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white p-[10px] w-[180px] text-center rounded-lg ml-[10px] cursor-pointer hover:bg-green-600"
                    >
                        Edit Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
