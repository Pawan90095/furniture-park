import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 text-sm">
            <div className="max-w-[1920px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Customer Service */}
                    <div>
                        <h4 className="font-bold mb-4 text-black">Customer Service</h4>
                        <ul className="space-y-3 text-gray-500">
                            <li><Link to="/contact" className="hover:text-black hover:underline">Help Center</Link></li>
                            <li><Link to="/contact" className="hover:text-black hover:underline">Track Your Order</Link></li>
                            <li><Link to="/contact" className="hover:text-black hover:underline">Returns & Exchanges</Link></li>
                            <li><Link to="/contact" className="hover:text-black hover:underline">Shipping Info</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Account */}
                    <div>
                        <h4 className="font-bold mb-4 text-black">My Account</h4>
                        <ul className="space-y-3 text-gray-500">
                            <li><Link to="/account" className="hover:text-black hover:underline">Manage Account</Link></li>
                            <li><Link to="/wishlist" className="hover:text-black hover:underline">My Favorites</Link></li>
                            <li><Link to="/account/orders" className="hover:text-black hover:underline">Order History</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: About */}
                    <div>
                        <h4 className="font-bold mb-4 text-black">About Us</h4>
                        <ul className="space-y-3 text-gray-500">
                            <li><Link to="/about" className="hover:text-black hover:underline">Who We Are</Link></li>
                            <li><Link to="/contact" className="hover:text-black hover:underline">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-black hover:underline">Accessibility</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="font-bold mb-4 text-black">Get the best deals</h4>
                        <p className="text-gray-500 mb-4">Sign up for exclusive offers and style inspiration.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 border border-gray-300 p-2 text-sm focus:outline-none focus:border-black rounded-none"
                            />
                            <button className="bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                                Sign Up
                            </button>
                        </div>
                        <div className="flex space-x-6 mt-6">
                            <Instagram size={20} className="text-gray-400 hover:text-black cursor-pointer" />
                            <Facebook size={20} className="text-gray-400 hover:text-black cursor-pointer" />
                            <Twitter size={20} className="text-gray-400 hover:text-black cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>© 2026 AllModern Clone. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className="hover:text-black cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-black cursor-pointer">Terms of Use</span>
                        <span className="hover:text-black cursor-pointer">Do Not Sell My Info</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
