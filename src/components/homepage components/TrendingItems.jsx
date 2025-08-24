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
                <div className="w-full h-full grid grid-cols-4 justify-start">
                    {productList.slice(0, 9).map((product) => {
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
