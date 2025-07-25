import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import ImageSlider from "../../components/ImageSlider.jsx";
import { addToCart } from "../../utils/cart.js";

const ProductOverview = () => {
    const navigate = useNavigate();
    const params = useParams();
    //console.log(params.id);
    if (params.id == null) {
        window.location.href = "/products";
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //loaded, error

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
    }, [status]);

    return (
        <div className="w-full h-full">
            {status === "loading" && <Loader />}
            {status === "loaded" && (
                <div className="w-full h-full flex flex-col lg:flex-row">
                    <h1 className="text-3xl font-bold text-center mb-[40px] lg:hidden">
                        {product.name}
                        {" | "}
                        <span className="text-3xl me-[20px] text-gray-500">{product.altNames.join(" | ")}</span>
                    </h1>

                    <div className="w-full lg:w-[50%] lg:h-full">
                        <ImageSlider images={product.images} />
                    </div>
                    <div className="w-full lg:w-[50%] pt-[100px] h-full p-[40px] ">
                        <h1 className="hidden lg:block text-3xl font-bold text-center mb-[40px]">
                            {product.name}
                            {" | "}
                            <span className="text-3xl me-[20px] text-gray-500">{product.altNames.join(" | ")}</span>
                        </h1>

                        <div className="w-full flex justify-center mb-[30px]">
                            {product.labeledPrice > product.price ? (
                                <>
                                    <h2 className="text-2xl mr-[20px]">LKR: {product.price.toFixed(2)}</h2>
                                    <h2 className="text-2xl line-through text-gray-500 ">
                                        LKR: {product.labeledPrice.toFixed(2)}
                                    </h2>
                                </>
                            ) : (
                                <h2 className="text-3xl">{product.price.toFixed(2)}</h2>
                            )}
                        </div>
                        <p className="text-xl text-center text-gray-500 mb-[30px]">{product.description}</p>
                        <div className="w-full flex justify-center gap-4  mb-[40px]">
                            <button
                                className="px-6 py-3 cursor-pointer bg-pink-800 border border-pink-800 hover:bg-white hover:text-pink-800 text-white rounded-lg transition"
                                onClick={() => {
                                    addToCart(product, 1);
                                    toast.success("Product added to cart");
                                    //console.log(getCart());
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
                                className="px-6 py-3 cursor-pointer bg-pink-800 border border-pink-800 hover:bg-white hover:text-pink-800 text-white rounded-lg transition"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {status === "error" && <div>ERROR</div>}
        </div>
    );
};

export default ProductOverview;
