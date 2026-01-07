import axios from "axios";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiShield } from "react-icons/fi";
import Header from "../../components/Header";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const emailInputRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    function sendEmail(e) {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        setLoading(true);
        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail", { email: email })
            .then((response) => {
                setEmailSent(true);
                toast.success("OTP sent to your email");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error sending email", error);
                toast.error("Failed to send email");
                setLoading(false);
            });
    }

    function changePassword(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/user/changePassword", {
                email: email,
                otp: otp,
                password: password,
            })
            .then((response) => {
                toast.success("Password changed successfully");
                window.location = "/login";
            })
            .catch((error) => {
                console.error("Error changing password", error);
                toast.error("Failed to change password");
                setLoading(false);
            });
    }

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
                            {emailSent ? "Almost There!" : "Forgot Your"}<br />
                            <span className="text-green-300">{emailSent ? "Reset Password" : "Password?"}</span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            {emailSent 
                                ? "Enter the OTP sent to your email and create a new secure password."
                                : "No worries! Enter your email and we'll send you a reset code."
                            }
                        </p>
                        <div className="mt-10 flex items-center gap-4">
                            <div className="w-12 h-1 bg-green-300 rounded-full"></div>
                            <span className="text-white/60 text-sm">Secure Password Recovery</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 lg:ml-auto flex items-start justify-center px-6 py-12">
                    <div ref={formRef} className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-8">
                            <img src="/Logo.png" alt="Cristal" className="h-16 mx-auto mb-4" />
                        </div>

                        {/* Form Card */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                            {emailSent ? (
                                <>
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-[#1B9C85]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiShield className="w-8 h-8 text-[#1B9C85]" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                                        <p className="text-gray-500">Enter the OTP sent to <span className="font-medium text-[#1B9C85]">{email}</span></p>
                                    </div>

                                    <form onSubmit={changePassword} className="space-y-5">
                                        {/* OTP Input */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                OTP Code
                                            </label>
                                            <div className="relative">
                                                <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    placeholder="Enter OTP code"
                                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all tracking-widest text-center font-semibold"
                                                />
                                            </div>
                                        </div>

                                        {/* New Password Input */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Enter new password"
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

                                        {/* Confirm Password Input */}
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
                                                    placeholder="Confirm new password"
                                                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
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

                                        {/* Reset Button */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Resetting...
                                                </>
                                            ) : (
                                                <>
                                                    Reset Password
                                                    <FiArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>

                                        {/* Back Button */}
                                        <button
                                            type="button"
                                            onClick={() => setEmailSent(false)}
                                            className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <FiArrowLeft className="w-5 h-5" />
                                            Change Email
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-[#1B9C85]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiMail className="w-8 h-8 text-[#1B9C85]" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h2>
                                        <p className="text-gray-500">Enter your email to receive a reset code</p>
                                    </div>

                                    <form onSubmit={sendEmail} className="space-y-5">
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
                                                    placeholder="Enter your email"
                                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-xl text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Send OTP Button */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 bg-[#1B9C85] text-white font-semibold rounded-xl hover:bg-[#158a74] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B9C85]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send OTP
                                                    <FiArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* Back to Login Link */}
                            <p className="text-center mt-8 text-gray-600">
                                Remember your password?{" "}
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
                            Need help?{" "}
                            <Link to="/contact" className="text-[#1B9C85] hover:underline">Contact Support</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
