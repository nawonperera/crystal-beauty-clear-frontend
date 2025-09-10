import getCart, { addToCart, getTotal, getTotalForLabeledPrice, removeFromCart } from "../../utils/cart.js";
import { TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";

const Cart = () => {
    const [cartLoaded, setCartLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cartLoaded === false) {
            const cart = getCart();
            setCart(cart);
            setCartLoaded(true);
        }
    }, [cartLoaded]);

    return (
        <div className="bg-[#EDF6EE]">
            <div className="mb-6">
                <Header navBarColor="text-black" headerImage="public\logo.png" />
            </div>
            <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 p-6">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg-white border rounded-xl shadow-md mb-4 flex flex-col lg:flex-row items-center lg:items-stretch relative"
                        >
                            <button
                                className="absolute top-2 right-2 bg-red-500 w-8 h-8 rounded-full text-white flex justify-center items-center shadow hover:bg-red-600"
                                onClick={() => {
                                    removeFromCart(item.productId);
                                    setCartLoaded(false);
                                }}
                            >
                                <TbTrash />
                            </button>

                            <img
                                alt="Product Image"
                                src={item.image}
                                className="lg:w-32 w-full h-32 object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-t-none"
                            />

                            <div className="flex-1 p-4">
                                <h1 className="text-lg font-semibold">{item.name}</h1>
                                <p className="text-sm text-gray-500 truncate">{item.altNames.join(" | ")}</p>
                                <p className="text-md text-gray-700 font-medium">LKR {item.price.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center justify-center p-4">
                                <button
                                    className="text-lg w-8 h-8 bg-black text-white rounded-full flex justify-center items-center hover:bg-gray-800"
                                    onClick={() => {
                                        addToCart(item, -1);
                                        setCartLoaded(false);
                                    }}
                                >
                                    -
                                </button>
                                <span className="mx-3 text-lg font-bold">{item.quantity}</span>
                                <button
                                    className="text-lg w-8 h-8 bg-black text-white rounded-full flex justify-center items-center hover:bg-gray-800"
                                    onClick={() => {
                                        addToCart(item, 1);
                                        setCartLoaded(false);
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <div className="flex items-center justify-center p-4">
                                <h1 className="text-lg font-semibold text-gray-700">
                                    {(item.price * item.quantity).toFixed(2)}
                                </h1>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 border-t pt-4 space-y-2">
                        <div className="flex justify-between text-lg">
                            <span>Total</span>
                            <span>{getTotalForLabeledPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span>Discount</span>
                            <span className="border-b-2">{(getTotalForLabeledPrice() - getTotal()).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Net Total</span>
                            <span className="border-b-4 border-double">{getTotal().toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            className="h-12 w-48 cursor-pointer bg-[#1B9C85] hover:bg-[#178E79] shadow text-white text-lg font-semibold transition"
                            onClick={() => {
                                navigate("/checkout", { state: { items: cart } });
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );
};

export default Cart;
