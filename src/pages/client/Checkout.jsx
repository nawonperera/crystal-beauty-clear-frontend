import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
            name,
            address,
            phoneNumber,
            billItems: cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        const token = localStorage.getItem("token");
        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
                headers: { Authorization: "Bearer " + token },
            })
            .then(() => {
                toast.success("Order placed successfully");
                navigate("/");
            })
            .catch(() => {
                toast.error("Order placement failed");
            });
    }

    function getTotal() {
        return cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    }

    function getTotalForLabeledPrice() {
        return cart.reduce((sum, product) => sum + product.labeledPrice * product.quantity, 0);
    }

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
                                    setCart(cart.filter((p) => p.productId !== item.productId));
                                    setCartRefresh(!cartRefresh);
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
                                        const newCart = [...cart];
                                        newCart[index].quantity = Math.max(1, newCart[index].quantity - 1);
                                        setCart(newCart);
                                        setCartRefresh(!cartRefresh);
                                    }}
                                >
                                    -
                                </button>
                                <span className="mx-3 text-lg font-bold">{item.quantity}</span>
                                <button
                                    className="text-lg w-8 h-8 bg-black text-white rounded-full flex justify-center items-center hover:bg-gray-800"
                                    onClick={() => {
                                        const newCart = [...cart];
                                        newCart[index].quantity += 1;
                                        setCart(newCart);
                                        setCartRefresh(!cartRefresh);
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

                    <div className="mt-6 space-y-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Name</label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Phone Number</label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Address</label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            className="h-12 w-48 cursor-pointer bg-[#1B9C85] hover:bg-[#178E79] shadow text-white text-lg font-semibold transition"
                            onClick={placeOrder}
                        >
                            Place Order
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
