import Header from "../components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import ProductsPage from "./client/ProductsPage.jsx";
import ProductOverview from "./client/ProductOverview.jsx";

const HomePage = () => {
    return (
        <div className="w-full h-screen max-h-screen ">
            <Header/>
            <div className="w-full min-h-[calc(100vh-70px)] ">
                <Routes path={"/*"}>
                    <Route path="/" element={<h1>Home Page</h1>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/overview/:id" element={<ProductOverview/>}/>
                    <Route path="/*" element={<h1>404 Not Found</h1>}/>
                </Routes>
            </div>
        </div>
    );
};

export default HomePage;