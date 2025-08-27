import Header from "../../components/Header";

const ContactPage = () => {
    return (
        <div className="min-h-screen w-full bg-[#EDF6EE]">
            <div className="h-[55vh] w-full bg-[linear-gradient(to_top,rgba(90,177,101,0.6),rgba(90,177,101,0)),url('/ContactsPageBanner.jpg')] bg-cover bg-center">
                <Header />
            </div>

            <div className="w-full h-[1000px] flex justify-center relative">
                <div className="w-[49%] h-full bg-[#EDF6EE]"></div>
                <div className="w-[50%] h-full bg-[url('/ContactsPageBackground.jpg')] bg-cover bg-center "></div>
                <div className="w-[800px] h-auto bg-white absolute top-[30vh] left-1/2 -translate-x-1/2 shadow-2xl p-10">
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
                                    required
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
                                required
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
                                required
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

            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white">
                    <div className="md:grid md:grid-cols-2">
                        {/* Left: Hero + Social */}
                        <div className="relative h-80 md:h-auto">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(16,185,129,0.12), rgba(16,185,129,0.04)), url('/ContactsPageBackground2.jpg')",
                                }}
                                aria-hidden="true"
                            />
                            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center bg-[rgba(255,255,255,0.72)]">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-3">Contact Us</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    We’d love to hear from you. Whether you have a question about our services, pricing
                                    or anything else — our team is ready to answer.
                                </p>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            aria-label="Facebook"
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-green-50 transform transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                                        >
                                            <svg
                                                className="w-5 h-5 text-green-600"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.3v-2.9h2.3V9.3c0-2.3 1.4-3.5 3.3-3.5.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.37.65-1.37 1.32v1.57h2.33l-.37 2.9h-1.96v7A10 10 0 0022 12z" />
                                            </svg>
                                        </button>

                                        <button
                                            aria-label="Twitter"
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-green-50 transform transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                                        >
                                            <svg
                                                className="w-5 h-5 text-green-600"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M23 4.6c-.8.4-1.6.7-2.5.8.9-.6 1.6-1.5 1.9-2.6-.9.5-2 .9-3.1 1.1C18 3.4 16.5 3 15 3c-2.5 0-4.5 2-4.5 4.5 0 .4 0 .9.1 1.3C7.7 9.5 4.1 7.7 1.7 4.9c-.5.9-.8 1.9-.8 3 0 2 1 3.7 2.6 4.7-.7 0-1.3-.2-1.9-.5v.1c0 2.3 1.6 4.2 3.7 4.6-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 1.9 2.3 3.4 4.3 3.5-1.6 1.3-3.6 2.1-5.7 2.1-.4 0-.8 0-1.2-.1C2.8 21.5 5.8 22 8.1 22c6 0 9.3-5 9.3-9.4v-.4c.6-.4 1.2-.9 1.6-1.5-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8z" />
                                            </svg>
                                        </button>

                                        <button
                                            aria-label="Instagram"
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-green-50 transform transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                                        >
                                            <svg
                                                className="w-5 h-5 text-green-600"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.8a4.2 4.2 0 100 8.4 4.2 4.2 0 000-8.4zM19.7 6.1a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <a
                                        href="#contact"
                                        className="inline-block px-5 py-3 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition"
                                    >
                                        Get in touch
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact details + map */}
                        <div className="p-6 md:p-8 flex flex-col justify-center bg-white">
                            <div className="space-y-4 text-gray-700">
                                <div>
                                    <p className="font-semibold text-gray-800">Union Square Greenmarket</p>
                                    <p className="text-sm text-gray-600">123 Fifth Avenue, New York, NY 10160</p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <svg
                                        className="w-5 h-5 text-green-600"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 6.5 12.6 6.7 12.9.2.3.6.3.8 0C12.5 21.6 19 14.2 19 9c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                                    </svg>
                                    <p className="font-semibold">14 St · Union Square</p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <svg
                                        className="w-5 h-5 text-green-600"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M21 10c0 1.1-.9 2-2 2h-1v7a2 2 0 01-2 2H8a2 2 0 01-2-2v-7H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v4zM9 8h6v2H9V8z" />
                                    </svg>
                                    <p className="text-gray-600">Timing: 9am - 8pm</p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <a
                                        className="text-blue-600 underline text-sm hover:text-blue-700"
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View larger map
                                    </a>
                                    <a
                                        className="px-3 py-2 bg-green-50 text-green-700 rounded-md text-sm font-semibold hover:bg-green-100 transition"
                                        href="tel:+1234567890"
                                    >
                                        Call: +1 (234) 567-890
                                    </a>
                                </div>

                                <div className="mt-4 bg-gray-50 rounded-lg p-3 shadow-inner">
                                    <p className="font-semibold text-gray-800">Upcoming Market</p>
                                    <p className="text-sm text-gray-600">
                                        Union Square Holiday Market · Nov 24 - Dec 24
                                    </p>
                                </div>

                                <div className="mt-4 rounded-lg overflow-hidden shadow-sm">
                                    {/* Map — replace src with your embed or component */}
                                    <iframe
                                        title="Union Square Map"
                                        className="w-full h-40 border-0"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.642571601698!2d-73.98930868459306!3d40.73467317932812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af20d3e0d5%3A0x10b54b9f9b1d17f6!2sUnion%20Square%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1610000000000"
                                        loading="lazy"
                                    />
                                    <div className="p-3 flex justify-between items-center bg-white">
                                        <span className="text-sm text-gray-600">Google</span>
                                        <a
                                            className="text-green-600 font-semibold text-sm hover:underline"
                                            href="#"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Get directions
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
