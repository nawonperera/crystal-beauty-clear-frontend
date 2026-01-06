import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUser, FiPhone } from "react-icons/fi";
import Header from "../../components/Header";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const registerFormRef = useRef(null);
    const firstNameInputRef = useRef(null);

    // Google Login
    const registerWithGoogle = useGoogleLogin({
        onSuccess: (res) => {
            setLoading(true);
            axios
                .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                    accessToken: res.access_token,
                })
                .then((response) => {
                    toast.success("Account created successfully!");
                    localStorage.setItem("token", response.data.token);
                    navigate("/");
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Google registration failed");
                    setLoading(false);
                });
        },
    });

    // Scroll to register form on mount
    useEffect(() => {
        if (registerFormRef.current) {
            registerFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (firstNameInputRef.current) {
            firstNameInputRef.current.focus();
        }
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
            email,
            firstName,
            lastName,
            password,
            phone
        }).then(() => {
            toast.success("Registration Successful! Please login.");
            navigate("/login");
        }).catch(error => {
            toast.error(error.response?.data?.message || "Registration failed");
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleRegister(e);
        }
    };

    return (
        <div className="min-h-screen bg-[#EDF6EE]">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header navBarColor="text-gray-800" headerImage="/Logo.png" />
            </div>

            {/* Main Content */}
            <div className="min-h-screen flex pt-[20vh]">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 relative">
                    <div 
                        className="fixed top-0 left-0 w-1/2 h-full bg-cover bg-center"
                        style={{ backgroundImage: "url(/login-bg.jpg)" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1B9C85]/80 to-transparent"></div>
                    </div>
                    
                    {/* Welcome Text */}
                    <div className="fixed top-0 left-0 w-1/2 h-full z-10 flex flex-col justify-center px-16 text-white">
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            Join the<br />
                            <span className="text-green-300">CRISTAL</span> Family
                        </h1>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            Create your account and start your journey to discover premium beauty products.
                        </p>
                        <div className="mt-10 flex items-center gap-4">
                            <div className="w-12 h-1 bg-green-300 rounded-full"></div>
                            <span className="text-white/60 text-sm">Premium Beauty Products</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="w-full lg:w-1/2 lg:ml-auto flex items-start justify-center px-6 py-12">
                    <div 
                        ref={registerFormRef}
                        className="w-full max-w-xl"
                    >
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-8">
                            <img src="/Logo.png" alt="Cristal" className="h-16 mx-auto mb-4" />
                        </div>

                        {/* Form Card */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                                <p className="text-gray-500">Fill in your details to get started</p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-5">
                                {/* Row 1: First Name & Last Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                ref={firstNameInputRef}
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="First name"
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Last name"
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Email & Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Enter your email"
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="+94 77 123 4567"
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3: Password & Confirm Password */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Create password"
                                                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Confirm password"
                                                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <FiArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">or continue with</span>
                                    </div>
                                </div>

                                {/* Google Register */}
                                <button
                                    type="button"
                                    onClick={registerWithGoogle}
                                    disabled={loading}
                                    className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <GrGoogle className="w-5 h-5 text-red-500" />
                                    Continue with Google
                                </button>
                            </form>

                            {/* Login Link */}
                            <p className="text-center mt-8 text-gray-600">
                                Already have an account?{" "}
                                <Link 
                                    to="/login" 
                                    className="text-[#1B9C85] hover:text-[#158a74] font-semibold"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>

                        {/* Footer Text */}
                        <p className="text-center mt-6 text-sm text-gray-500">
                            By creating an account, you agree to our{" "}
                            <a href="#" className="text-[#1B9C85] hover:underline">Terms</a>
                            {" "}and{" "}
                            <a href="#" className="text-[#1B9C85] hover:underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
