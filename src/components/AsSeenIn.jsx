import React from 'react';
import { motion } from 'framer-motion';

const mediaLogos = [
    { name: 'Times of India', text: 'TIMES OF INDIA' },
    { name: 'Architectural Digest', text: 'AD' },
    { name: 'Elle Decor', text: 'ELLE DECOR' },
    { name: 'Forbes India', text: 'FORBES' },
    { name: 'Vogue Living', text: 'VOGUE' },
    { name: 'Economic Times', text: 'ET' },
];

export default function AsSeenIn() {
    return (
        <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">
                    As Featured In
                </p>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
                    {mediaLogos.map((logo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-center"
                        >
                            <div className="text-center group cursor-pointer">
                                <p className="text-gray-400 font-bold text-sm md:text-base group-hover:text-primary transition-colors">
                                    {logo.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
                        <span className="text-2xl">🏆</span>
                        <span className="text-sm font-bold text-gray-700">
                            Winner of "Best Furniture Brand 2024" - India Design Awards
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
