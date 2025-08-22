import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
import ProductCards from "../../components/ProductCards.jsx";

const ProductsPage = () => {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [search, setSearch] = useState("");

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
        <div className="h-full w-full ">
            <div className="w-full h-[70px] flex items-center justify-center">
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

            {productsLoaded ? (
                <div className="w-full h-full flex flex-wrap justify-center">
                    {productList.map((product) => {
                        return <ProductCards key={product.productID} product={product} />;
                    })}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProductsPage;
