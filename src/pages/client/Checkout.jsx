import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
    const location = useLocation();

    const [cart, setCart] = useState(location.state.items);
    const [cartRefresh, setCartRefresh] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

    function placeOrder() {
        const orderData = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            billItems: [],
        };
        for (let i = 0; i < cart.length; i++) {
            orderData.billItems[i] = {
                productId: cart[i].productId,
                quantity: cart[i].quantity,
            };
        }
        console.log(localStorage);

        const token = localStorage.getItem("token");
        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then(() => {
                toast.success("Order placed successfully");
                navigate("/");
            })
            .catch((error) => {
                toast.error("Order placement failed");
            });
    }

    function getTotal() {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.quantity;
        });
        return total;
    }

    function getTotalForLabeledPrice() {
        let total = 0;
        cart.forEach((product) => {
            total += product.labeledPrice * product.quantity;
        });
        return total;
    }

    return (
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-[700px]">
                {cart.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                "w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative"
                            }
                        >
                            <button
                                className={
                                    "absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer"
                                }
                                onClick={() => {
                                    const newCart = cart.filter((product) => product.productId !== item.productId);
                                    setCart(newCart);
                                    setCartRefresh(!cartRefresh);
                                }}
                            >
                                <TbTrash />
                            </button>
                            <img alt={"Product Image"} src={item.image} className="h-full aspect-square object-cover" />
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
                                        const newCart = cart;
                                        newCart[index].quantity -= 1;
                                        if (newCart[index].quantity <= 0) newCart[index].quantity = 1;
                                        setCart(newCart);
                                        setCartRefresh(!cartRefresh);
                                    }}
                                >
                                    -
                                </button>
                                <h1 className="text-xl font-bold">{item.quantity}</h1>
                                <button
                                    className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                    onClick={() => {
                                        const newCart = cart;
                                        newCart[index].quantity += 1;
                                        setCart(newCart);
                                        setCartRefresh(!cartRefresh);
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

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Name</h1>
                    <input
                        className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Number</h1>
                    <input
                        className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Address</h1>
                    <input
                        className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="w-full flex justify-end mt-4">
                    <button
                        className="h-[40px] w-[170px] cursor-pointer rounded-lg bg-pink-400 pr-2 shadow text-center text-white text-xl"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
