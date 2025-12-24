import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Minus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export default function ProductComparison({ isOpen, onClose }) {
    const products = useStore((state) => state.products);
    const compareList = useStore((state) => state.compareList);
    const removeFromCompare = useStore((state) => state.removeFromCompare);
    const clearCompare = useStore((state) => state.clearCompare);

    const compareProducts = compareList
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean);

    if (!isOpen || compareProducts.length === 0) return null;

    const features = [
        { key: 'price', label: 'Price', format: (p) => `₹${p.price.toLocaleString()}` },
        { key: 'category', label: 'Category', format: (p) => p.category },
        { key: 'rating', label: 'Rating', format: (p) => p.rating ? `${p.rating} ★` : 'N/A' },
        { key: 'colors', label: 'Color Options', format: (p) => p.colors ? `${p.colors.length} colors` : 'N/A' },
        { key: 'badge', label: 'Special Badge', format: (p) => p.badge || '-' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-primary">
                                    Product Comparison
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Compare up to 3 products side by side
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => {
                                        clearCompare();
                                        onClose();
                                    }}
                                    className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-gray-700" />
                                </button>
                            </div>
                        </div>

                        {/* Comparison Table */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="text-left p-4 font-bold text-gray-700 bg-gray-50 border-b-2 border-gray-200 w-48">
                                                Feature
                                            </th>
                                            {compareProducts.map((product) => (
                                                <th key={product.id} className="p-4 border-b-2 border-gray-200 min-w-[250px]">
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => removeFromCompare(product.id)}
                                                            className="absolute -top-2 -right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                                                        >
                                                            <X size={16} className="text-red-600" />
                                                        </button>
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-48 object-cover rounded-lg mb-3"
                                                        />
                                                        <Link
                                                            to={`/product/${product.id}`}
                                                            onClick={onClose}
                                                            className="font-serif font-bold text-primary hover:text-secondary transition-colors line-clamp-2"
                                                        >
                                                            {product.name}
                                                        </Link>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {features.map((feature, idx) => (
                                            <tr key={feature.key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="p-4 font-bold text-gray-700 border-b border-gray-200">
                                                    {feature.label}
                                                </td>
                                                {compareProducts.map((product) => (
                                                    <td key={product.id} className="p-4 text-center border-b border-gray-200">
                                                        <span className="text-gray-900 font-medium">
                                                            {feature.format(product)}
                                                        </span>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="p-4 font-bold text-gray-700">
                                                Description
                                            </td>
                                            {compareProducts.map((product) => (
                                                <td key={product.id} className="p-4 text-sm text-gray-600">
                                                    {product.description}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="p-4 font-bold text-gray-700">
                                                Action
                                            </td>
                                            {compareProducts.map((product) => (
                                                <td key={product.id} className="p-4">
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                        onClick={onClose}
                                                        className="block w-full bg-primary text-white px-4 py-3 rounded-lg font-bold text-sm text-center hover:bg-secondary transition-colors"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
