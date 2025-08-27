import Header from "../components/Header.jsx";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./client/ProductsPage.jsx";
import ProductOverview from "./client/ProductOverview.jsx";
import Cart from "./client/Cart.jsx";
import Checkout from "./client/Checkout.jsx";
import Home from "./client/Home.jsx";
import ContactPage from "./client/ContactPage.jsx";

const HomePage = () => {
    return (
        <div className="w-full h-screen max-h-screen ">
            {/* <Header /> */}
            {/* <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)] "> */}
            <div className="w-full h-full ">
                <Routes path={"/*"}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contacts" element={<ContactPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
};

export default HomePage;
