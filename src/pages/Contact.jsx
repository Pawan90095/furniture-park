import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="pt-32 min-h-screen bg-background pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-serif font-bold text-primary mb-4">Get in Touch</h1>
                    <p className="text-gray-500">We'd love to hear from you. Send us a message and we'll reply as soon as possible.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Form */}
                    <div className="bg-white p-8 md:p-12 shadow-soft rounded-sm">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                <input type="text" className="w-full bg-background border-none px-4 py-3 rounded-sm focus:ring-1 focus:ring-secondary transition-all" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                <input type="email" className="w-full bg-background border-none px-4 py-3 rounded-sm focus:ring-1 focus:ring-secondary transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                                <textarea rows="5" className="w-full bg-background border-none px-4 py-3 rounded-sm focus:ring-1 focus:ring-secondary transition-all" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-colors duration-300">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="text-secondary mt-1" size={20} />
                                    <div>
                                        <p className="font-bold text-primary">Our Showroom</p>
                                        <p className="text-gray-500">123 Design Avenue, Creative District<br />Indiranagar, Bangalore 560038</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Phone className="text-secondary" size={20} />
                                    <p className="text-gray-500">+91 98765 43210</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Mail className="text-secondary" size={20} />
                                    <p className="text-gray-500">hello@furniturepark.com</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-serif font-bold mb-6">Business Hours</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-4 text-gray-500">
                                    <Clock className="text-secondary" size={20} />
                                    <span>Mon - Fri: 10:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex items-center space-x-4 text-gray-500 pl-9">
                                    <span>Saturday: 11:00 AM - 9:00 PM</span>
                                </div>
                                <div className="flex items-center space-x-4 text-gray-500 pl-9">
                                    <span>Sunday: By Appointment</span>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-64 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Map"
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-white px-4 py-2 font-bold text-sm shadow-md">Google Map Placeholder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
