import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import AdminProductsPage from "./admin/AdminProductsPage";
import AddProductForm from "./admin/AddProductForm";
import EditProduct from "./admin/EditProduct";


const AdminPage = () => {
    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="h-full w-[300px] ">
                <Link to="/admin/users" className=" p-2 flex items-center"><FaUsers className="mr-2" />Users</Link>
                <Link to="/admin/products" className=" p-2 flex items-center"><FaWarehouse className="mr-2" />Products</Link>
                <Link to="/admin/orders" className=" p-2 flex items-center"><FaFileInvoice className="mr-2" />Orders</Link>
            </div>
            <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg">
                <Routes path="/*">
                    <Route path="/users" element={<h1>Users</h1>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/orders" element={<h1>Orders</h1>}/>
                    <Route path="/addProduct" element={<AddProductForm/>}/>
                    <Route path="/editProduct" element={<EditProduct/>}/>
                    
                </Routes>
            </div>
        </div>
        
    );
};

export default AdminPage;