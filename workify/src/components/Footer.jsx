import React from "react";
import Logo from '../assets/logo.svg?react'
import LinkedIn from '../assets/linkedin.svg?react'
import Instagram from '../assets/instagram.svg?react'
import Button from "./ui/button";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6  px-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Company Info */}
                    <div>
                        <img src={Logo} alt="Workify Logo" className="w-10 h-10" />
                        <h2 className="text-xl font-bold">Workify</h2>
                        <p className="text-gray-400 text-sm">Empowering job seekers and employers.</p>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        <p className="text-gray-400 text-sm">📧 Email: worlify@email.com</p>
                        <p className="text-gray-400 text-sm">📞 Phone: +91 999999999</p>
                        <div className="flex gap-4 mt-3">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <img src={LinkedIn} alt="LinkedIn" className="w-6 h-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src={Instagram} alt="Instagram" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Send Us a Message</h3>
                        <form className="flex flex-col gap-3">
                            <input type="text" placeholder="Your Name" className="p-2 rounded bg-gray-800 text-white border border-gray-600" />
                            <input type="email" placeholder="Your Email" className="p-2 rounded bg-gray-800 text-white border border-gray-600" />
                            <textarea placeholder="Your Message" rows="3" className="p-2 rounded bg-gray-800 text-white border border-gray-600"></textarea>
                            <Button variant="outline" className="text-white bg-gray-900 w-[100%] hover:bg-white hover:text-black">
                                        Send
                                    </Button>
                        </form>
                    </div>
                </div>
                <hr className="my-6 border-gray-700" />
                <p className="text-center text-gray-500 text-sm">© {new Date().getFullYear()} Workify. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
