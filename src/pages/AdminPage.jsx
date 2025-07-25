import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import AdminProductsPage from "./admin/AdminProductsPage";
import AddProductForm from "./admin/AddProductForm";
import EditProduct from "./admin/EditProduct";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const AdminPage = () => {
    const [userValidated, setUserValidated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You are not logged in");
            navigate("/login");
        } else {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    if (response.data.user.role === "admin") {
                        setUserValidated(true);
                    } else {
                        toast.error("Failed to fetch user info");
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    //console.error("Error fetching user:", error);
                    toast.error("Something went wrong please login");
                    navigate("/login");
                });
        }
    }, []);

    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            {userValidated ? (
                <>
                    <div className="h-full w-[300px] ">
                        <Link to="/admin/users" className=" p-2 flex items-center">
                            <FaUsers className="mr-2" />
                            Users
                        </Link>
                        <Link to="/admin/products" className=" p-2 flex items-center">
                            <FaWarehouse className="mr-2" />
                            Products
                        </Link>
                        <Link to="/admin/orders" className=" p-2 flex items-center">
                            <FaFileInvoice className="mr-2" />
                            Orders
                        </Link>
                    </div>
                    <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg">
                        <Routes path="/*">
                            <Route path="/users" element={<h1>Users</h1>} />
                            <Route path="/products" element={<AdminProductsPage />} />
                            <Route path="/orders" element={<AdminOrdersPage />} />
                            <Route path="/addProduct" element={<AddProductForm />} />
                            <Route path="/editProduct" element={<EditProduct />} />
                        </Routes>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AdminPage;
