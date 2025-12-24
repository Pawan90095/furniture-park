import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export default function StickyProductBar({ product, isVisible, onAddToCart }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-100 py-3 hidden md:block"
                >
                    <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                            <div>
                                <h3 className="font-serif font-bold text-gray-900 text-sm">{product.name}</h3>
                                <p className="font-sans text-xs text-secondary font-bold">₹{product.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onAddToCart}
                                className="bg-primary text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-secondary transition-colors flex items-center"
                            >
                                <ShoppingBag size={16} className="mr-2" /> Add to Cart
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
