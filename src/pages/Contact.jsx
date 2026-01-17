import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Hero */}
            <div className="bg-[#2C2C2C] text-white py-24 px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-display font-medium mb-6"
                >
                    Get in Touch
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-300 max-w-2xl mx-auto font-light"
                >
                    We're here to help you create your perfect space. Reach out to our concierge team for assistance with orders, styling advice, or custom inquiries.
                </motion.p>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Information */}
                    <div>
                        <h2 className="text-3xl font-display font-medium text-primary mb-8">Contact Information</h2>
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#556B2F] shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-1">Phone Support</h3>
                                    <p className="text-secondary mb-2">Mon-Sat from 9am to 7pm</p>
                                    <a href="tel:+919587742740" className="text-xl font-medium text-primary hover:text-secondary decoration-current">+91 95877 42740</a>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#556B2F] shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-1">Email Us</h3>
                                    <p className="text-secondary mb-2">We'll respond within 24 hours</p>
                                    <a href="mailto:info.g.rservies@gmail.com" className="text-xl font-medium text-primary hover:text-secondary decoration-current">info.g.rservies@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#556B2F] shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-1">Showroom</h3>
                                    <p className="text-secondary text-lg leading-relaxed">
                                        Ladnun, Didwana Kuchaman<br />
                                        Rajasthan, India - 341306
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-[#F9F8F6] rounded-2xl border border-[#E6E1D6]">
                            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                <Clock size={20} /> Opening Hours
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-secondary">Monday - Friday</span>
                                    <span className="font-medium text-primary">9:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">Saturday</span>
                                    <span className="font-medium text-primary">10:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">Sunday</span>
                                    <span className="font-medium text-primary">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-card border border-[#F0EFEC]">
                        <h2 className="text-3xl font-display font-medium text-primary mb-8">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Name</label>
                                    <input type="text" className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 outline-none border border-[#F9F8F6] transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Email</label>
                                    <input type="email" className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 outline-none border border-[#F9F8F6] transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Subject</label>
                                <select className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 outline-none border border-[#F9F8F6] transition-all">
                                    <option>General Inquiry</option>
                                    <option>Order Status</option>
                                    <option>Custom Orders</option>
                                    <option>Trade Program</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Message</label>
                                <textarea rows={6} className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 outline-none border border-[#F9F8F6] transition-all"></textarea>
                            </div>
                            <button className="w-full bg-[#2C2C2C] text-white py-4 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-[#556B2F] transition-all shadow-lg">
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
