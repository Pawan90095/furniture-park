import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Editorial Hero */}
            <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1616594039964-40891a909d99?q=80&w=2670&auto=format&fit=crop"
                    alt="Design Studio"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-center text-white max-w-4xl px-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-display font-medium mb-8 leading-tight italic"
                        >
                            Crafting Sanctuary
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto"
                        >
                            We believe that good design should be accessible, sustainable, and timeless.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Our Story */}
            <section className="py-24 px-6 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <span className="text-[#556B2F] font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-primary mb-8">Modern furniture for the thoughtful home.</h2>
                        <div className="space-y-6 text-lg text-secondary leading-relaxed font-light">
                            <p>
                                Founded in 2024, Furniture Park began with a simple mission: to bridge the gap between high-end design and everyday living. We saw a market flooded with fast furniture that didn't last, and luxury pieces that were out of reach.
                            </p>
                            <p>
                                We partner directly with master artisans in Rajasthan and certified manufacturers to bring you pieces that are not only beautiful but built to withstand the test of time.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=1000" alt="Craftsmanship" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Values */}
            <section className="bg-[#2C2C2C] text-white py-24 px-6">
                <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-display mb-2">10k+</h3>
                        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Happy Homes</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-display mb-2">500+</h3>
                        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Curated Products</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-display mb-2">100%</h3>
                        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Sustainable Wood</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-display mb-2">24/7</h3>
                        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Expert Support</p>
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="py-32 px-6 text-center bg-[#F9F8F6]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-display font-medium text-primary mb-8 leading-tight">
                        "Your home should be filled with things that you love, things that tell your story. We're just here to help provide the characters."
                    </h2>
                    <p className="font-bold text-secondary uppercase tracking-widest text-sm">— The Founders</p>
                </div>
            </section>
        </div>
    );
}
