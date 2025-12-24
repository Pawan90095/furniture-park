import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductComparison from './ProductComparison';

export default function CompareFloatingBar() {
    const compareList = useStore((state) => state.compareList);
    const products = useStore((state) => state.products);
    const removeFromCompare = useStore((state) => state.removeFromCompare);
    const [showComparison, setShowComparison] = useState(false);

    const compareProducts = compareList
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean);

    if (compareList.length === 0) return null;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-white rounded-full shadow-2xl border-2 border-primary px-6 py-4 flex items-center space-x-4"
                >
                    <div className="flex items-center space-x-2">
                        <GitCompare size={20} className="text-primary" />
                        <span className="font-bold text-gray-900">
                            Compare ({compareList.length}/3)
                        </span>
                    </div>

                    {/* Product Thumbnails */}
                    <div className="flex items-center space-x-2">
                        {compareProducts.map((product) => (
                            <div key={product.id} className="relative group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    onClick={() => removeFromCompare(product.id)}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowComparison(true)}
                        className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-secondary transition-colors"
                    >
                        Compare Now
                    </button>
                </motion.div>
            </AnimatePresence>

            <ProductComparison
                isOpen={showComparison}
                onClose={() => setShowComparison(false)}
            />
        </>
    );
}
