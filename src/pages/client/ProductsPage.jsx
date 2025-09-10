import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
import ProductCards from "../../components/ProductCards.jsx";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";

const ProductsPage = () => {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const navBarColor = "text-black";
    const shadowStyle = "";

    useEffect(() => {
        if (!productsLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then((response) => {
                setProductList(response.data);
                setProductsLoaded(true);
            });
        }
    }, [productsLoaded]);

    function searchProducts() {
        if (search.length > 0) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search).then((response) => {
                setProductList(response.data.products);
            });
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#EDF6EE]">
            {/*Header*/}

            <div className="py-[10px]">
                <Header navBarColor={navBarColor} headerImage="public\logo.png" />
            </div>

            {/* Search bar */}

            <div className="w-full h-[70px] flex items-center justify-center ">
                <div className="flex items-center bg-white p-4">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-[400px] h-[40px] border border-gray-300 rounded-md p-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        onClick={() => {
                            searchProducts();
                        }}
                    >
                        Search
                    </button>
                    <button
                        className="ml-2 bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
                        onClick={() => {
                            setProductsLoaded(false);
                            setSearch("");
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Product grid */}

            {productsLoaded ? (
                <div className="w-full h-full flex flex-wrap justify-center bg-[#EDF6EE]">
                    <div className="flex justify-between flex-wrap items-center bg-white p-1 m-5">
                        {productList.map((product) => {
                            return <ProductCards key={product.productID} product={product} shadow={shadowStyle} />;
                        })}
                        {/* {productList.map((product) => {
                        return <ProductCards key={product.productID} product={product} />;
                    })} */}
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProductsPage;
