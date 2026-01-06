import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import Header from "../components/Header";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const loginFormRef = useRef(null);
    const emailInputRef = useRef(null);

    // Scroll to login form on mount
    useEffect(() => {
        if (loginFormRef.current) {
            loginFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        // Focus on email input
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (res) => {
            setLoading(true);
            axios
                .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                    accessToken: res.access_token,
                })
                .then((response) => {
                    toast.success("Login Successful");
                    localStorage.setItem("token", response.data.token);

                    const user = response.data.user;
                    if (user.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Google login failed");
                    setLoading(false);
                });
        },
    });

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);

        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.token);

                const user = response.data.user;
                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Login failed");
                setLoading(false);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin(e);
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
                            Welcome Back to<br />
                            <span className="text-green-300">CRISTAL</span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            Sign in to access your account and continue your beauty journey with us.
                        </p>
                        <div className="mt-10 flex items-center gap-4">
                            <div className="w-12 h-1 bg-green-300 rounded-full"></div>
                            <span className="text-white/60 text-sm">Premium Beauty Products</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 lg:ml-auto flex items-start justify-center px-6 py-12">
                    <div 
                        ref={loginFormRef}
                        className="w-full max-w-md"
                    >
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-8">
                            <img src="/Logo.png" alt="Cristal" className="h-16 mx-auto mb-4" />
                        </div>

                        {/* Form Card */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                                <p className="text-gray-500">Enter your credentials to continue</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-5">
                                {/* Email Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            ref={emailInputRef}
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Enter your email"
                                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
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
                                            placeholder="Enter your password"
                                            className="w-full pl-12 pr-12 py-4 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
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

                                {/* Forgot Password */}
                                <div className="text-right">
                                    <Link 
                                        to="/forget" 
                                        className="text-sm text-[#1B9C85] hover:text-[#158a74] font-medium"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
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

                                {/* Google Login */}
                                <button
                                    type="button"
                                    onClick={loginWithGoogle}
                                    disabled={loading}
                                    className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <GrGoogle className="w-5 h-5 text-red-500" />
                                    Continue with Google
                                </button>
                            </form>

                            {/* Register Link */}
                            <p className="text-center mt-8 text-gray-600">
                                Don't have an account?{" "}
                                <Link 
                                    to="/register" 
                                    className="text-[#1B9C85] hover:text-[#158a74] font-semibold"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>

                        {/* Footer Text */}
                        <p className="text-center mt-6 text-sm text-gray-500">
                            By signing in, you agree to our{" "}
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

export default LoginPage;
