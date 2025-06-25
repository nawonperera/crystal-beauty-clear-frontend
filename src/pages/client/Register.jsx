import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
            email,
            firstName,
            lastName,
            password,
            phone
        }).then(response => {
            console.log("Register successful", response.data);
            toast.success("Registration Successful");
            navigate("/login");
        }).catch(error => {
            console.log("Register failed", error.response?.data);
            toast.error(error.response?.data?.message || "Registration failed");
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[600px] min-h-[650px] py-10 backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="text"
                        placeholder="Last Name"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="text"
                        placeholder="Phone Number"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button
                        onClick={handleRegister}
                        className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer m-[5px]"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <p className="text-gray-600 text-center m[10px]">
                        Already have an account?
                        &nbsp;
                        <span className="text-green-500 cursor-pointer hover:text-green-700">
                            <Link to={"/login"}>Login Here</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
