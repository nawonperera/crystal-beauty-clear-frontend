import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import Testing from "./pages/testing";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/client/Register";
import HomePage from "./pages/HomePage";
import Test from "./pages/test";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />
            <Routes path="/*">
                <Route path="/admin/*" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/*" element={<HomePage />} />
                <Route path="/testing" element={<Testing />} />
                <Route path="/r" element={<Test />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
