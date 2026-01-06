import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { FiStar, FiHeart, FiUsers, FiAward, FiShield, FiTruck, FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { BiLeaf } from "react-icons/bi";

const AboutPage = () => {
    return (
        <div className="min-h-screen w-full bg-[#EDF6EE] overflow-x-hidden">
            <div className="relative h-[70vh] w-full bg-gradient-to-br from-[#0d5c4f] via-[#1B9C85] to-[#2dd4bf] flex flex-col">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-32 right-20 w-4 h-4 bg-green-300 rounded-full opacity-60 animate-bounce"></div>
                    <div className="absolute top-48 left-32 w-3 h-3 bg-emerald-200 rounded-full opacity-50 animate-bounce"></div>
                    <div className="absolute bottom-32 left-20 w-5 h-5 bg-teal-300 rounded-full opacity-40 animate-bounce"></div>
                </div>

                <Header headerImage="public\footer-logo.png" navBarColor="text-white" />

                <div className="flex-1 flex items-center justify-center text-center px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <HiSparkles className="w-4 h-4 text-green-300" />
                            <span className="text-white/90 text-sm font-medium">Established 2020</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            About{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
                                    Cristal Beauty
                                </span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-teal-300 rounded-full"></span>
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                            Enhancing natural beauty with premium skincare solutions crafted for your radiance
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="space-y-8">
                            <div>
                                <span className="inline-block text-[#1B9C85] font-semibold tracking-widest uppercase text-sm mb-4">
                                    Our Story
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Passion for Beauty
                                    <span className="block text-[#1B9C85]">& Wellness</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Founded in 2020, <strong className="text-gray-800">Cristal Beauty & Clear</strong>{" "}
                                    began as a vision to provide high-quality, natural skincare solutions that enhance
                                    your inner radiance.
                                </p>
                                <p>
                                    We carefully curate products that combine traditional beauty wisdom with modern
                                    scientific innovation. Every item in our collection is tested and verified.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md border border-gray-100">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#1B9C85] to-emerald-500 rounded-lg flex items-center justify-center">
                                        <HiSparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-semibold text-gray-800">Premium Quality</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md border border-gray-100">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                        <BiLeaf className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-semibold text-gray-800">Natural Ingredients</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#1B9C85]/20 to-emerald-500/20 rounded-3xl blur-2xl"></div>
                            <div className="relative bg-gradient-to-br from-[#1B9C85] via-emerald-600 to-teal-600 p-10 rounded-3xl text-white shadow-2xl">
                                <div className="absolute inset-0 bg-white/5 rounded-3xl"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                        <FiHeart className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                                        To empower individuals with premium beauty and wellness products that celebrate
                                        natural beauty while promoting self-care and confidence.
                                    </p>
                                    <div className="flex items-center gap-2 text-green-200 font-medium">
                                        <span>Learn more about our values</span>
                                        <FiArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-300/20 rounded-full blur-xl"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-300/20 rounded-full blur-xl"></div>
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                                <div className="text-3xl font-bold text-[#1B9C85]">5K+</div>
                                <div className="text-gray-500 text-sm">Happy Customers</div>
                            </div>
                            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                                <div className="text-3xl font-bold text-[#1B9C85]">4.8★</div>
                                <div className="text-gray-500 text-sm">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1B9C85]/5 to-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-500/5 to-green-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <span className="inline-block text-[#1B9C85] font-semibold tracking-widest uppercase text-sm mb-4">
                            Why Choose Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Built on trust, quality, and customer satisfaction — these values guide everything we do.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#1B9C85]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#1B9C85]/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1B9C85]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#1B9C85] to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#1B9C85]/30">
                                    <FiAward className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Premium Quality</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We source only the finest products from trusted suppliers, ensuring every item meets
                                    our rigorous quality standards.
                                </p>
                            </div>
                        </div>

                        <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-pink-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-pink-500/30">
                                    <FiHeart className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Customer Love</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Your satisfaction is our priority. We provide personalized service and support to
                                    help you find the perfect products.
                                </p>
                            </div>
                        </div>

                        <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/30">
                                    <FiShield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Trusted Brand</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Built on transparency and authenticity, we have earned the trust of thousands of
                                    satisfied customers across Sri Lanka.
                                </p>
                            </div>
                        </div>

                        <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-purple-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/30">
                                    <FiUsers className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Community Focus</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We believe in building a supportive community where beauty enthusiasts can share
                                    experiences and grow together.
                                </p>
                            </div>
                        </div>

                        <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-orange-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-orange-500/30">
                                    <FiTruck className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Quick and reliable delivery service ensures your beauty essentials reach you when
                                    you need them most.
                                </p>
                            </div>
                        </div>

                        <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-teal-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-teal-500/30">
                                    <FiStar className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Excellence</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We continuously strive for excellence in every aspect of our service, from product
                                    selection to customer experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-gradient-to-br from-[#0d5c4f] via-[#1B9C85] to-emerald-600 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                5000+
                            </div>
                            <div className="text-white/70 font-medium text-lg">Happy Customers</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                500+
                            </div>
                            <div className="text-white/70 font-medium text-lg">Premium Products</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                4.8★
                            </div>
                            <div className="text-white/70 font-medium text-lg">Average Rating</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                3+
                            </div>
                            <div className="text-white/70 font-medium text-lg">Years Experience</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 lg:py-32 bg-[#EDF6EE] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block text-[#1B9C85] font-semibold tracking-widest uppercase text-sm mb-4">
                            Meet The Team
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Passionate Professionals</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our dedicated team of beauty experts work tirelessly to bring you the best experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="group">
                            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="h-72 bg-gradient-to-br from-[#1B9C85] via-emerald-500 to-teal-500 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                                    <div className="w-36 h-36 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 group-hover:scale-110 transition-transform duration-300">
                                        <FiUsers className="w-16 h-16 text-white" />
                                    </div>
                                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
                                </div>
                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Sarah Johnson</h3>
                                    <p className="text-[#1B9C85] font-semibold mb-4">Founder and CEO</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Beauty enthusiast with 10+ years experience in the cosmetics industry.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="h-72 bg-gradient-to-br from-pink-500 via-rose-500 to-red-400 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                                    <div className="w-36 h-36 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 group-hover:scale-110 transition-transform duration-300">
                                        <FiHeart className="w-16 h-16 text-white" />
                                    </div>
                                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
                                </div>
                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Priya Patel</h3>
                                    <p className="text-[#1B9C85] font-semibold mb-4">Product Specialist</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Licensed aesthetician specializing in skincare consultation for all skin types.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="h-72 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                                    <div className="w-36 h-36 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 group-hover:scale-110 transition-transform duration-300">
                                        <FiStar className="w-16 h-16 text-white" />
                                    </div>
                                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
                                </div>
                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Michael Chen</h3>
                                    <p className="text-[#1B9C85] font-semibold mb-4">Customer Success</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Dedicated to ensuring exceptional customer experience and building lasting
                                        relationships.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1B9C85] to-emerald-600 rounded-3xl blur-xl opacity-20"></div>
                        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B9C85]/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Ready to Start Your Beauty Journey?
                                </h3>
                                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Discover our curated collection of premium beauty and skincare products.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="group px-8 py-4 bg-gradient-to-r from-[#1B9C85] to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#1B9C85]/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                        Shop Now
                                        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20">
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;
