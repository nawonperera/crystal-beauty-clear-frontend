const ForgetPassword = () => {
    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <span></span>
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
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
