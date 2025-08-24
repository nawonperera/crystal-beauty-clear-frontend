import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductCards = ({ product }) => {
    const discount =
        product.price < product.labeledPrice
            ? Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100)
            : null;

    // ⭐ Calculate rating stars (assuming product.rating exists e.g. 4.3)
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }
        return stars;
    };

    return (
        <Link
            to={`/overview/${product.productID}`}
            className="w-[260px] h-[420px] bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
            {/* Image + discount badge */}
            <div className="relative w-full h-[180px]">
                <img className="w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                {discount && (
                    <span className="absolute top-2 left-2 bg-[#1b9c85] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        -{discount}%
                    </span>
                )}
            </div>

            {/* Product details */}
            <div className="p-4 flex flex-col justify-between h-[240px] bg-[#EDF6EE]">
                <p className="text-gray-400 text-sm">#{product.productID}</p>
                <p className="text-lg font-bold truncate">{product.name}</p>

                {/* Price section */}
                <div className="mt-2">
                    <p className="text-lg font-semibold text-[#1b9c85]">${product.price.toFixed(2)}</p>
                    {product.price < product.labeledPrice && (
                        <p className="text-sm text-gray-400 line-through">${product.labeledPrice.toFixed(2)}</p>
                    )}
                </div>

                {/* ⭐ Review stars */}
                <div className="flex items-center space-x-1 mt-2">
                    {renderStars(product.rating || 4.2)} {/* fallback rating */}
                    <span className="text-sm text-gray-500 ml-1">({product.reviews || 120})</span>
                </div>

                {/* Button */}
                <button className="mt-3 border-[#1b9c85] border text-[#1b9c85] shadow-lg text-sm px-4 py-2 rounded-lg hover:bg-[#1b9c85] transition hover:text-white cursor-pointer">
                    View Details
                </button>
            </div>
        </Link>
    );
};

export default ProductCards;
