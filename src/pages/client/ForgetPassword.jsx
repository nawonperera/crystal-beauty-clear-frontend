import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function sendEmail() {
        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail", { email: email })
            .then((response) => {
                // console.log("Email sent successfully", response.data);
                setEmailSent(true);
                toast.success("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending email", error);
                toast.error("Failed to send email");
            });
    }

    function changePassword() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/user/changePassword", {
                email: email,
                otp: otp,
                password: password,
            })
            .then((response) => {
                console.log("Password changed successfully", response.data);
                toast.success("Password changed successfully");
                window.location = "/login"; // Redirect to login page after successful password change
            })
            .catch((error) => {
                console.error("Error changing password", error);
                toast.error("Failed to change password");
            });
    }

    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            {emailSent ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-md w-[400px]">
                        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            onClick={changePassword}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-md w-[400px]">
                        <h1 className="text-2xl font-bold mb-4">Forget Password</h1>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    onChange={(e) => setEmail(e.target.value)} // When user types, update React state variable `email` with input value
                                    value={email}
                                    // 👆 Controlled component → value comes from React state `email`
                                    // React re-renders input whenever `email` state changes
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                onClick={sendEmail}
                            >
                                Send OPT
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;
