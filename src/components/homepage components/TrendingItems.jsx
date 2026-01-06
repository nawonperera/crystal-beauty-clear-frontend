import axios from "axios";
import ProductCards from "../ProductCards";
import Loader from "../Loader";
import { useEffect, useState } from "react";

const TrendingItems = () => {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        if (!productsLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then((response) => {
                setProductList(response.data);
                setProductsLoaded(true);
            });
        }
    }, [productsLoaded]);

    return (
        <div className="h-full w-full">
            {productsLoaded ? (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {productList.slice(0, 6).map((product) => {
                        return <ProductCards key={product.productID} product={product} />;
                    })}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default TrendingItems;
