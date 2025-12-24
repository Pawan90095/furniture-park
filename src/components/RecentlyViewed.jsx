import React from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

export default function RecentlyViewed() {
    const products = useStore((state) => state.products);
    const recentlyViewed = useStore((state) => state.recentlyViewed);

    // Get product details for recently viewed IDs
    const recentProducts = recentlyViewed
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean)
        .slice(0, 8);

    if (recentProducts.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <Clock size={24} className="text-secondary" />
                        <h2 className="text-3xl font-serif font-bold text-primary">
                            Recently Viewed
                        </h2>
                    </div>
                    <Link
                        to="/shop"
                        className="hidden md:flex items-center space-x-2 text-sm font-bold text-secondary hover:text-primary transition-colors group"
                    >
                        <span>Continue Shopping</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                    <div className="flex space-x-6 pb-4">
                        {recentProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-64 group"
                            >
                                <Link to={`/product/${product.id}`}>
                                    <div className="aspect-[4/5] bg-white rounded-lg overflow-hidden mb-3 shadow-sm hover:shadow-xl transition-all duration-300">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                                        {product.category}
                                    </p>
                                    <h3 className="font-serif text-lg text-primary group-hover:text-secondary transition-colors line-clamp-1 mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="font-bold text-gray-900">
                                        ₹{product.price.toLocaleString()}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile "Continue Shopping" */}
                <Link
                    to="/shop"
                    className="md:hidden mt-6 flex items-center justify-center space-x-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
                >
                    <span>Continue Shopping</span>
                    <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}
