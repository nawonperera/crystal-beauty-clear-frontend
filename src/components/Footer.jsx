import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaYoutube,
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaHeart,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 h-screen/2">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 h-full">
                {/* Contact Details */}
                <div className="flex-1 w-full lg:w-auto">
                    <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-[#1B9C85]">
                        CONTACT DETAILS
                    </h3>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-4 transition-transform hover:translate-x-1">
                            <FaPhoneAlt className="text-[#1B9C85] mt-1 flex-shrink-0" />
                            <span className="text-base">929-242-6868</span>
                        </li>
                        <li className="flex items-start gap-4 transition-transform hover:translate-x-1">
                            <FaEnvelope className="text-[#1B9C85] mt-1 flex-shrink-0" />
                            <span className="text-base">contact@info.com</span>
                        </li>
                        <li className="flex items-start gap-4 transition-transform hover:translate-x-1">
                            <FaMapMarkerAlt className="text-[#1B9C85] mt-1 flex-shrink-0" />
                            <span className="text-base">123 Fifth Avenue, New York, NY 10160</span>
                        </li>
                    </ul>
                </div>

                {/* Logo */}
                <div className="flex-1 flex items-center justify-center my-8 lg:my-0">
                    <div className="p-2">
                        <img src="public\Footer-logo.png" alt="Company Logo" className="h-4\0 w-40 object-contain" />
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex-1 w-full lg:w-auto">
                    <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-[#1B9C85]">
                        QUICK LINKS
                    </h3>
                    <ul className="space-y-4 text-gray-300">
                        <li>
                            <a
                                href="#"
                                className="text-base hover:text-[#1B9C85] transition-colors flex items-center group"
                            >
                                <span className="w-2 h-2 bg-[#1B9C85] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Shipping & Returns
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-base hover:text-[#1B9C85] transition-colors flex items-center group"
                            >
                                <span className="w-2 h-2 bg-[#1B9C85] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-base hover:text-[#1B9C85] transition-colors flex items-center group"
                            >
                                <span className="w-2 h-2 bg-[#1B9C85] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Customer Service
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-400 text-center md:text-left flex items-center justify-center md:justify-start">
                    Copyright © 2025 Cosmetics Store | Made with <FaHeart className="text-red-500 mx-1" /> by Cosmetics
                    Store
                </p>

                {/* Social Icons */}
                <div className="flex gap-3 mt-4 md:mt-0">
                    {[
                        { icon: <FaYoutube />, color: "hover:text-red-500" },
                        { icon: <FaInstagram />, color: "hover:text-pink-500" },
                        { icon: <FaFacebookF />, color: "hover:text-blue-500" },
                        { icon: <FaTwitter />, color: "hover:text-blue-400" },
                    ].map((social, index) => (
                        <a
                            key={index}
                            href="#"
                            className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-all duration-300 ${social.color} hover:bg-gray-700 transform hover:-translate-y-1`}
                            aria-label={`Social media link`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
