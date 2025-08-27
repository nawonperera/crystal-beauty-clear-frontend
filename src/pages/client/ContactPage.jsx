import Header from "../../components/Header";

const ContactPage = () => {
    return (
        <div className="min-h-screen w-full bg-[#EDF6EE]">
            <div className="h-[55vh] w-full bg-[linear-gradient(to_top,rgba(90,177,101,0.8),rgba(90,177,101,0)),url('/ContactsPageBanner.jpg')] bg-cover bg-center">
                <Header />
            </div>

            <div className="w-full h-[1000px] flex justify-center relative">
                <div className="w-[49%] h-full bg-[#EDF6EE]"></div>
                <div className="w-[50%] h-full bg-[url('/ContactsPageBackground.jpg')] bg-cover bg-center "></div>
                <div className="w-[800px] h-auto bg-white absolute top-[120px] left-[360px] shadow-2xl  p-10">
                    {/* Header */}
                    <div className="text-center">
                        <h4 className=" text-2xl uppercase font-semibold tracking-wider text-green-600  px-4 py-1 ">
                            Message Us
                        </h4>
                        <h2 className="mt-[24px] text-4xl font-semibold text-gray-900">GET IN TOUCH WITH US</h2>
                    </div>

                    {/* Form */}
                    <form className="mt-10 space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="5"
                                placeholder="Write your message here..."
                                className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="px-8 py-3 uppercase bg-green-600 text-white text-lg font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transition duration-300 ease-in-out"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="w-full h-screen bg-green-200"></div>
        </div>
    );
};

export default ContactPage;
