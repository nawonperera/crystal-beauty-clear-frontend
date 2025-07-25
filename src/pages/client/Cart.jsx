import getCart, { addToCart, getTotal, getTotalForLabeledPrice, removeFromCart } from "../../utils/cart.js";
import { TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-full lg:w-[700px] ">
                {cart.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                "w-full lg:h-[100px] bg-white shadow-2xl my-[5px] flex lg:flex-row flex-col justify-between items-center relative"
                            }
                        >
                            <button
                                className={
                                    "absolute lg:right-[-50px] right-2 top-2 bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer"
                                }
                                onClick={() => {
                                    removeFromCart(item.productId);
                                    setCartLoaded(false);
                                }}
                            >
                                <TbTrash />
                            </button>
                            <img
                                alt={"Product Image"}
                                src={item.image}
                                className="lg:h-full h-[100px] aspect-square object-cover"
                            />
                            <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                <h1 className="text-xl font-bold">{item.name}</h1>
                                <h2 className="text-lg text-gray-500">{item.altNames.join(" | ")}</h2>
                                <h2 className="text-lg text-gray-500">LKR: {item.price.toFixed(2)}</h2>
                            </div>
                            <div className="h-full w-[100px] flex justify-center items-center">
                                <button
                                    className={
                                        "text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                    }
                                    onClick={() => {
                                        addToCart(item, -1);
                                        setCartLoaded(false);
                                    }}
                                >
                                    -
                                </button>
                                <h1 className="text-xl font-bold">{item.quantity}</h1>
                                <button
                                    className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                    onClick={() => {
                                        addToCart(item, 1);
                                        setCartLoaded(false);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <div className="h-full w-[100px] flex justify-center items-center">
                                <h1 className="text-xl w-full text-end pr-2">
                                    {(item.price * item.quantity).toFixed(2)}
                                </h1>
                            </div>
                        </div>
                    );
                })}

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end pr-2 text-xl">Total</h1>
                    <h1 className="w-[100px] text-end pr-2 text-xl">{getTotalForLabeledPrice().toFixed(2)}</h1>
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end pr-2 text-xl">Discount</h1>
                    <h1 className="w-[100px] border-b-[2px] text-end pr-2 text-xl">
                        {(getTotalForLabeledPrice() - getTotal()).toFixed(2)}
                    </h1>
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end pr-2 text-xl">Net Total</h1>
                    <h1 className="w-[100px] border-double border-b-[4px]  text-end pr-2 text-xl">
                        {getTotal().toFixed(2)}
                    </h1>
                </div>

                <div className="w-full flex justify-end mt-4">
                    <button
                        className="h-[40px] w-[170px] cursor-pointer rounded-lg bg-pink-400 pr-2 shadow text-center text-white text-xl"
                        onClick={() => {
                            navigate("/checkout", {
                                state: {
                                    items: cart,
                                },
                            });
                        }}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
