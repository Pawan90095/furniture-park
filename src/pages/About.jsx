import React from 'react';
import { Award, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="pt-24 min-h-screen bg-background pb-12">
            {/* Header */}
            <div className="bg-primary text-white py-20 px-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Story</h1>
                    <p className="text-lg font-light text-gray-300">Reshaping modern living since 2024.</p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-serif font-bold text-primary mb-6">Crafting Comfort for Every Home</h2>
                        <div className="prose text-gray-600 leading-relaxed">
                            <p className="mb-4">
                                At Furniture Park, we believe that your home should be your sanctuary. In a world that's constantly moving, we create spaces that invite you to pause.
                            </p>
                            <p>
                                Our mission is simple: to bring high-end, modern aesthetic furniture to Indian homes without the traditional markup. We partner directly with artisans to ensure every piece is crafted with integrity and style.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="aspect-square bg-gray-100 rounded-sm overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Workshop"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* Why Choose Us */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-12">Why Furniture Park?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white shadow-soft rounded-sm hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                                <Award size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
                            <p className="text-sm text-gray-500">Hand-selected materials ensuring durability and timeless elegance.</p>
                        </div>

                        <div className="p-8 bg-white shadow-soft rounded-sm hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                                <Truck size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
                            <p className="text-sm text-gray-500">Delivery across India within 5-7 business days with secure packaging.</p>
                        </div>

                        <div className="p-8 bg-white shadow-soft rounded-sm hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                                <Clock size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                            <p className="text-sm text-gray-500">Dedicated customer service team ready to assist you anytime.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
