import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#F9F8F6] border-t border-[#E6E1D6] pt-20 pb-10 text-primary">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-20">

                    {/* Brand Section */}
                    <div className="md:col-span-4">
                        <Link to="/" className="inline-block mb-6">
                            <span className="text-3xl font-display font-medium tracking-tight">Furniture Park.</span>
                        </Link>
                        <p className="text-secondary text-base leading-relaxed mb-8 max-w-sm">
                            Curating exceptional spaces for the modern connoisseur. We blend timeless artistry with functional design to create furniture that tells a story.
                        </p>
                        <div className="flex space-x-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#E6E1D6] flex items-center justify-center hover:bg-[#556B2F] hover:text-white hover:border-[#556B2F] transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links - Shop */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h4 className="font-display text-xl mb-6">Collections</h4>
                        <ul className="space-y-4 text-secondary">
                            {['Living Room', 'Dining', 'Bedroom', 'Office', 'New Arrivals'].map((item) => (
                                <li key={item}>
                                    <Link to="/shop" className="hover:text-[#556B2F] transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links - Company */}
                    <div className="md:col-span-2">
                        <h4 className="font-display text-xl mb-6">Company</h4>
                        <ul className="space-y-4 text-secondary">
                            {['Our Story', 'Sustainability', 'Careers', 'Terms of Service', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link to="/about" className="hover:text-[#556B2F] transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-4">
                        <h4 className="font-display text-xl mb-4">Stay Connected</h4>
                        <p className="text-secondary text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white border border-[#E6E1D6] rounded-full py-3 px-6 pr-12 text-sm focus:outline-none focus:border-[#556B2F] transition-colors"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#2C2C2C] text-white rounded-full hover:bg-[#556B2F] transition-colors">
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#E6E1D6] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-secondary tracking-wide">
                    <p>&copy; {new Date().getFullYear()} Furniture Park. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed for the discerning.</p>
                </div>
            </div>
        </footer>
    );
}
