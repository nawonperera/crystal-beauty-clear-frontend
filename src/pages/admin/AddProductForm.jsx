import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";

const AddProductForm = () => {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const promisesArray = [];
        for (let i = 0; i < images.length; i++) {
            const promise = mediaUpload(images[i]);
            promisesArray[i] = promise;
        }

        try {
            const result = await Promise.all(promisesArray);

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

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            toast.success("Product added successfully");
            navigate("/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Product adding failed");
        }
    };

    return (
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[500px] rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-3x1 font-bold text-gray-700 m-[10px]">Add Product</h1>
                <input
                    value={productId}
                    onChange={(event) => {
                        setProductId(event.target.value);
                        //toast.success(event.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="ProductID"
                />
                <input
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        //toast.success(event.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Product Name"
                />
                <input
                    value={altNames}
                    onChange={(event) => {
                        setAltNames(event.target.value);
                        //toast.success(event.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Alternative Names"
                />
                <input
                    value={price}
                    onChange={(event) => {
                        setPrice(event.target.value);
                        //toast.success(event.target.value);
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Price"
                />
                <input
                    value={labeledPrice}
                    onChange={(event) => {
                        setLabeledPrice(event.target.value);
                        //toast.success(event.target.value);
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Labeled Price"
                />
                <textarea
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                        //toast.success(event.target.value);
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
                        //toast.success(event.target.value);
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
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;
