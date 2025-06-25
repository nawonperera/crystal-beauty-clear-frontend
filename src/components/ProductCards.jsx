import { Link } from "react-router-dom";

const ProductCards = (props) => {
    const product = props.product;

    return (
        <Link
            to={"/overview/" + product.productID}
            className="w-[250px] m-4 h-[350px] shadow-2xl"
        >
            <img
                className="w-full h-[175px] object-cover"
                src={product.images[0]}
                alt={""}
            ></img>
            <div className="h=[110px] w-full flex justify-center flex-col px-4">
                <p className="text-gray-400">{product.productID}</p>
                <p className="text-lg font-bold">{product.name}</p>
                <p className="text-lg text-pink-400 ">
                    {product.price.toFixed(2)}{" "}
                    <span className="line-through text-gray-400 text-sm">
                        {product.price < product.labeledPrice &&
                            product.labeledPrice.toFixed(2)}
                    </span>
                </p>
            </div>
        </Link>
    );
};

export default ProductCards;
