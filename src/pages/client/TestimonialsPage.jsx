import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { FiStar, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteLeft, FaHeart } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useState } from "react";

const TestimonialsPage = () => {
    const [activeFilter, setActiveFilter] = useState("all");

    const testimonials = [
        {
            id: 1,
            name: "Amaya Perera",
            role: "Loyal Customer",
            image: null,
            rating: 5,
            category: "skincare",
            text: "I have been using Cristal Beauty products for over a year now, and my skin has never looked better! The natural ingredients really make a difference. Highly recommend their vitamin C serum!",
            product: "Vitamin C Serum",
            date: "2 weeks ago"
        },
        {
            id: 2,
            name: "Dinesh Fernando",
            role: "First-time Buyer",
            image: null,
            rating: 5,
            category: "haircare",
            text: "Amazing quality products and super fast delivery! I ordered the hair care bundle and it arrived within 2 days. The packaging was beautiful and the products smell incredible.",
            product: "Hair Care Bundle",
            date: "1 month ago"
        },
        {
            id: 3,
            name: "Sachini Silva",
            role: "Beauty Enthusiast",
            image: null,
            rating: 5,
            category: "skincare",
            text: "Finally found a brand that understands sensitive skin! Their gentle cleanser is a game-changer. No irritation, just clean and fresh skin every time.",
            product: "Gentle Cleanser",
            date: "3 weeks ago"
        },
        {
            id: 4,
            name: "Kavinda Jayawardena",
            role: "Regular Customer",
            image: null,
            rating: 4,
            category: "makeup",
            text: "Great selection of makeup products. The lipsticks are long-lasting and the colors are gorgeous. Customer service was also very helpful when I had questions.",
            product: "Matte Lipstick Collection",
            date: "1 week ago"
        },
        {
            id: 5,
            name: "Nethmi Dissanayake",
            role: "Skincare Lover",
            image: null,
            rating: 5,
            category: "skincare",
            text: "The anti-aging cream is worth every penny! I have noticed visible improvements in my skin texture within just 3 weeks. My friends keep asking what my secret is!",
            product: "Anti-Aging Cream",
            date: "2 months ago"
        },
        {
            id: 6,
            name: "Ravindu Wickramasinghe",
            role: "Gift Buyer",
            image: null,
            rating: 5,
            category: "gifts",
            text: "Bought a gift set for my wife's birthday and she absolutely loved it! The presentation was stunning and the products are top-notch. Will definitely be back for more.",
            product: "Luxury Gift Set",
            date: "1 month ago"
        }
    ];

    const stats = [
        { number: "5000+", label: "Happy Customers" },
        { number: "4.8", label: "Average Rating" },
        { number: "98%", label: "Would Recommend" },
        { number: "500+", label: "5-Star Reviews" }
    ];

    const filters = [
        { id: "all", label: "All Reviews" },
        { id: "skincare", label: "Skincare" },
        { id: "haircare", label: "Hair Care" },
        { id: "makeup", label: "Makeup" },
        { id: "gifts", label: "Gifts" }
    ];

    const filteredTestimonials = activeFilter === "all" 
        ? testimonials 
        : testimonials.filter(t => t.category === activeFilter);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FiStar
                key={i}
                className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
        ));
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
                <div className="flex-1 flex items-center justify-center text-center px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <HiSparkles className="w-4 h-4 text-green-300" />
                            <span className="text-white/90 text-sm font-medium">Real Stories from Real Customers</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Customer{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
                                    Reviews
                                </span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-teal-300 rounded-full"></span>
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                            See what our amazing customers have to say about their Cristal Beauty experience
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-[#1B9C85] mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Review */}
            <div className="py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-[#1B9C85]/20 to-emerald-500/20 rounded-3xl blur-2xl"></div>
                        <div className="relative bg-gradient-to-br from-[#1B9C85] via-emerald-600 to-teal-600 p-10 md:p-16 rounded-3xl text-white shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-white/5"></div>
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-300/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10 max-w-4xl mx-auto text-center">
                                <FaQuoteLeft className="w-12 h-12 text-white/30 mx-auto mb-6" />
                                <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 text-white/95">
                                    "Cristal Beauty has completely transformed my skincare routine. The quality of their products is unmatched, and the results speak for themselves. I have never felt more confident in my skin!"
                                </p>
                                <div className="flex items-center justify-center gap-1 mb-4">
                                    {renderStars(5)}
                                </div>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
                                        SP
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-lg">Sanduni Pathirana</p>
                                        <p className="text-white/70">Verified Customer • Colombo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white py-8 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    activeFilter === filter.id
                                        ? "bg-gradient-to-r from-[#1B9C85] to-emerald-500 text-white shadow-lg shadow-[#1B9C85]/30"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="py-16 bg-[#EDF6EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-[#1B9C85] font-semibold tracking-widest uppercase text-sm mb-4">
                            Testimonials
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTestimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-1">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <span className="text-sm text-gray-400">{testimonial.date}</span>
                                </div>

                                <div className="relative mb-6">
                                    <FaQuoteLeft className="absolute -top-2 -left-2 w-8 h-8 text-[#1B9C85]/10" />
                                    <p className="text-gray-600 leading-relaxed pl-6">
                                        {testimonial.text}
                                    </p>
                                </div>

                                <div className="inline-block px-4 py-2 bg-[#1B9C85]/10 text-[#1B9C85] text-sm font-medium rounded-full mb-6">
                                    {testimonial.product}
                                </div>

                                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#1B9C85] to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-[#1B9C85]/30">
                                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                    <button className="ml-auto text-gray-300 hover:text-red-400 transition-colors">
                                        <FaHeart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTestimonials.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No reviews found for this category yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Write a Review CTA */}
            <div className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1B9C85] to-emerald-600 rounded-3xl blur-xl opacity-20"></div>
                        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B9C85]/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#1B9C85] to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#1B9C85]/30">
                                    <FiStar className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Share Your Experience
                                </h3>
                                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Loved our products? We would love to hear about your experience! Your review helps others discover Cristal Beauty.
                                </p>
                                <button className="group px-8 py-4 bg-gradient-to-r from-[#1B9C85] to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#1B9C85]/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
                                    Write a Review
                                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="py-16 bg-[#EDF6EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trusted by Thousands</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1">Verified Reviews</h3>
                            <p className="text-sm text-gray-500">100% Authentic</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1">Secure Shopping</h3>
                            <p className="text-sm text-gray-500">SSL Protected</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1">Easy Payments</h3>
                            <p className="text-sm text-gray-500">Multiple Options</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1">Fast Delivery</h3>
                            <p className="text-sm text-gray-500">Island Wide</p>
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
                        Join Our Happy Customers
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Experience the Cristal Beauty difference and see why thousands trust us for their skincare needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group px-8 py-4 bg-white text-[#1B9C85] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                            Shop Now
                            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20">
                            View All Products
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TestimonialsPage;
