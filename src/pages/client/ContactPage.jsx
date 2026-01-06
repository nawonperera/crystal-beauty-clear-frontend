import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiArrowRight } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ContactPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !email || !message) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/message", {
                firstName,
                lastName,
                email,
                phone,
                message,
            });
            toast.success("Message sent successfully!");
            // Clear form
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setMessage("");
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#EDF6EE] overflow-x-hidden">
            {/* Hero Banner Section */}
            <div className="relative h-[60vh] w-full bg-gradient-to-br from-[#0d5c4f] via-[#1B9C85] to-[#2dd4bf] flex flex-col">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-32 right-20 w-4 h-4 bg-green-300 rounded-full opacity-60 animate-bounce"></div>
                    <div className="absolute top-48 left-32 w-3 h-3 bg-emerald-200 rounded-full opacity-50 animate-bounce"></div>
                    <div className="absolute bottom-32 left-20 w-5 h-5 bg-teal-300 rounded-full opacity-40 animate-bounce"></div>
                </div>

                <Header headerImage="public\footer-logo.png" navBarColor="text-white" />

                {/* Hero Content */}
                <div className="flex-1 flex items-center justify-center text-center px-4 pb-24 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <HiSparkles className="w-4 h-4 text-green-300" />
                            <span className="text-white/90 text-sm font-medium">We are here to help</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Get in{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
                                    Touch
                                </span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-teal-300 rounded-full"></span>
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                            Have questions? We would love to hear from you. Send us a message and we will respond as
                            soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#1B9C85] to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#1B9C85]/30">
                            <FiPhone className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Call Us</h3>
                        <p className="text-gray-600 text-sm">+94 77 123 4567</p>
                    </div>

                    <div className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/30">
                            <FiMail className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Email Us</h3>
                        <p className="text-gray-600 text-sm">hello@cristal.com</p>
                    </div>

                    <div className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                            <FiMapPin className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Visit Us</h3>
                        <p className="text-gray-600 text-sm">123 Fifth Avenue, NY</p>
                    </div>

                    <div className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                            <FiClock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Working Hours</h3>
                        <p className="text-gray-600 text-sm">9:00 AM - 7:00 PM</p>
                    </div>
                </div>
            </div>

            {/* Main Contact Section */}
            <div className="py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left - Contact Form */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#1B9C85]/10 to-emerald-500/10 rounded-3xl blur-2xl"></div>
                            <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
                                <div className="mb-8">
                                    <span className="inline-block text-[#1B9C85] font-semibold tracking-widest uppercase text-sm mb-4">
                                        Message Us
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Send us a Message</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                First Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all duration-300"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Doe"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+94 77 123 4567"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            required
                                            rows="5"
                                            placeholder="Write your message here..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 text-gray-700 bg-gray-50/50 focus:outline-none focus:border-[#1B9C85] focus:bg-white transition-all duration-300 resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group w-full px-8 py-4 bg-gradient-to-r from-[#1B9C85] to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#1B9C85]/30 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right - Contact Info & Map */}
                        <div className="space-y-8">
                            {/* Info Card */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-[#1B9C85]/20 to-emerald-500/20 rounded-3xl blur-2xl"></div>
                                <div className="relative bg-gradient-to-br from-[#1B9C85] via-emerald-600 to-teal-600 p-8 md:p-10 rounded-3xl text-white shadow-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-white/5"></div>
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-300/20 rounded-full blur-2xl"></div>
                                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-300/20 rounded-full blur-2xl"></div>

                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                                        <p className="text-white/80 mb-8 leading-relaxed">
                                            We would love to hear from you. Whether you have a question about our
                                            products, pricing, or anything else — our team is ready to answer.
                                        </p>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                    <FiMapPin className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Our Location</p>
                                                    <p className="text-white/70 text-sm">123 nawon, Kandy, Sri Lanka</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                    <FiPhone className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Phone Number</p>
                                                    <p className="text-white/70 text-sm">+94 77 123 4567</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                    <FiMail className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Email Address</p>
                                                    <p className="text-white/70 text-sm">nawon@info.com</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10 pt-8 border-t border-white/20">
                                            <p className="font-semibold mb-4">Follow Us</p>
                                            <div className="flex gap-3">
                                                <button className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                                                    <FaFacebookF className="w-5 h-5 text-white" />
                                                </button>
                                                <button className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                                                    <FaTwitter className="w-5 h-5 text-white" />
                                                </button>
                                                <button className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                                                    <FaInstagram className="w-5 h-5 text-white" />
                                                </button>
                                                <button className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                                                    <FaWhatsapp className="w-5 h-5 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Card */}
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Find Us on Map</h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Visit our store for a personalized experience
                                    </p>
                                </div>
                                <div className="relative">
                                    <iframe
                                        title="Location Map"
                                        className="w-full h-64 border-0"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.642571601698!2d-73.98930868459306!3d40.73467317932812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af20d3e0d5%3A0x10b54b9f9b1d17f6!2sUnion%20Square%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1610000000000"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4 flex justify-between items-center bg-gray-50">
                                    <span className="text-sm text-gray-600">Union Square, New York</span>
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 text-[#1B9C85] font-semibold text-sm hover:gap-3 transition-all duration-300"
                                    >
                                        Get Directions
                                        <FiArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block text-[#1B9C85] font-semibold tracking-widest uppercase text-sm mb-4">
                            FAQ
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600">Quick answers to common questions</p>
                    </div>

                    <div className="space-y-4">
                        <div className="group bg-gray-50 hover:bg-[#1B9C85]/5 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-[#1B9C85]/20">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#1B9C85] transition-colors">
                                What are your delivery options?
                            </h3>
                            <p className="text-gray-600">
                                We offer island-wide delivery across Sri Lanka. Standard delivery takes 3-5 business
                                days, while express delivery is available for 1-2 business days.
                            </p>
                        </div>

                        <div className="group bg-gray-50 hover:bg-[#1B9C85]/5 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-[#1B9C85]/20">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#1B9C85] transition-colors">
                                Do you offer returns and exchanges?
                            </h3>
                            <p className="text-gray-600">
                                Yes, we have a 14-day return policy for unopened products. Please contact our customer
                                service team to initiate a return or exchange.
                            </p>
                        </div>

                        <div className="group bg-gray-50 hover:bg-[#1B9C85]/5 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-[#1B9C85]/20">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#1B9C85] transition-colors">
                                Are your products cruelty-free?
                            </h3>
                            <p className="text-gray-600">
                                Absolutely! We are committed to offering only cruelty-free products. None of our
                                products are tested on animals.
                            </p>
                        </div>

                        <div className="group bg-gray-50 hover:bg-[#1B9C85]/5 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-[#1B9C85]/20">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#1B9C85] transition-colors">
                                How can I track my order?
                            </h3>
                            <p className="text-gray-600">
                                Once your order is shipped, you will receive a tracking number via email and SMS. You
                                can use this to track your package in real-time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-br from-[#0d5c4f] via-[#1B9C85] to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Experience Premium Beauty?
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and discover the Cristal Beauty difference today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group px-8 py-4 bg-white text-[#1B9C85] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                            Shop Now
                            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
