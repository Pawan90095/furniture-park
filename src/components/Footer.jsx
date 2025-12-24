import React from 'react';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-24 pb-12">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-20 border-b border-gray-800 pb-20">

                    {/* Brand Column */}
                    <div className="md:col-span-4">
                        <Link to="/" className="inline-block mb-8">
                            <span className="text-3xl font-serif font-bold tracking-tight text-white">Furniture Park.</span>
                        </Link>
                        <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
                            Curating exceptional spaces for the modern connoisseur. We blend timeless artistry with functional design to create furniture that tells a story.
                        </p>
                        <div className="flex space-x-6">
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer group">
                                <Instagram size={18} className="text-white" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer group">
                                <Facebook size={18} className="text-white" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer group">
                                <Twitter size={18} className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-2">
                        <h4 className="font-serif text-xl mb-8 text-white">Shop</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="hover:text-secondary cursor-pointer transition-colors"><Link to="/shop">Living Room</Link></li>
                            <li className="hover:text-secondary cursor-pointer transition-colors"><Link to="/shop">Bedroom</Link></li>
                            <li className="hover:text-secondary cursor-pointer transition-colors"><Link to="/shop">Dining</Link></li>
                            <li className="hover:text-secondary cursor-pointer transition-colors"><Link to="/shop">Office</Link></li>
                            <li className="hover:text-secondary cursor-pointer transition-colors"><Link to="/shop">New Arrivals</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-serif text-xl mb-8 text-white">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="hover:text-secondary cursor-pointer transition-colors"><Link to="/contact">Contact Us</Link></li>
                            <li className="hover:text-secondary cursor-pointer transition-colors">FAQ</li>
                            <li className="hover:text-secondary cursor-pointer transition-colors">Shipping & Returns</li>
                            <li className="hover:text-secondary cursor-pointer transition-colors">Care Guide</li>
                            <li className="hover:text-secondary cursor-pointer transition-colors">Warranty</li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="md:col-span-4">
                        <h4 className="font-serif text-xl mb-4 text-white">Join our world</h4>
                        <p className="text-gray-400 text-sm mb-8">Receive exclusive offers and design inspiration directly to your inbox.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full bg-transparent border-b border-gray-700 text-white px-0 py-4 text-base focus:outline-none focus:border-secondary transition-colors placeholder-gray-600"
                            />
                            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-secondary hover:text-white transition-colors">
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Furniture Park. All rights reserved.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
