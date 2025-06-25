import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
import ProductCards from "../../components/ProductCards.jsx";

const ProductsPage = () => {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        if (!productsLoaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
                .then((response) => {
                    setProductList(response.data);
                    setProductsLoaded(true);
                });
        }
    }, [productsLoaded]);

    return (
        <div className="h-full w-full ">
            {productsLoaded ? (
                <div className="w-full h-full flex flex-wrap justify-center">
                    {productList.map((product) => {
                        return (
                            <ProductCards key={product.productID} product={product} />
                        );
                    })}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProductsPage;
