import React from "react";
import { Route, Routes } from "react-router-dom";
import CartSidePanel from "../components/cartSidePanel/CartSidePanel";

const test = () => {
    return (
        <Routes>
            <Route path="/" element={<CartSidePanel />} />
        </Routes>
    );
};

export default test;
