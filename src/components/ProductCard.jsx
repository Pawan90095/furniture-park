import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart, Eye, GitCompare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist, compareList, addToCompare } = useStore();
    const isWishlisted = wishlist.includes(product.id);
    const isInCompare = compareList.includes(product.id);
    const toast = useToast();
    const [showQuickView, setShowQuickView] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCompare = (e) => {
        e.preventDefault();
        if (compareList.length >= 3) {
            toast.error('❌ You can only compare up to 3 products');
            return;
        }
        addToCompare(product.id);
        toast.success('✅ Added to comparison');
    };

    return (
        <>
            <div
                className="group relative bg-transparent rounded-2xl transition-all duration-500 hover:-translate-y-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                {/* Badge */}
                {product.badge && (
                    <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm">
                        {product.badge}
                    </span>
                )}

                {/* Image Container with Zoom Reveal */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-transparent">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                    </Link>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                            const isAdding = !isWishlisted;
                            toast.success(isAdding ? '❤️ Added to wishlist' : '💔 Removed from wishlist');
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-transparent hover:bg-white/50 transition-colors z-10"
                    >
                        <Heart
                            size={18}
                            className={`transition-colors ${isWishlisted ? 'fill-secondary text-secondary' : 'text-gray-800'}`}
                        />
                    </button>

                    {/* Action Buttons Row */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20 gap-2">
                        {/* Quick View */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowQuickView(true);
                            }}
                            className="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide hover:bg-white transition-colors shadow-lg flex items-center justify-center space-x-1.5"
                        >
                            <Eye size={14} />
                            <span>Quick View</span>
                        </motion.button>

                        {/* Add to Cart */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                toast.success(`✅ ${product.name} added to cart`);
                            }}
                            className="w-12 h-12 bg-secondary text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
                            title="Add to Cart"
                        >
                            <ShoppingBag size={18} />
                        </motion.button>
                    </div>

                    {/* Compare Button (Top Left) */}
                    {!isInCompare && (
                        <button
                            onClick={handleAddToCompare}
                            className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
                            title="Add to Compare"
                        >
                            <GitCompare size={16} className="text-gray-700" />
                        </button>
                    )}
                </div>

                {/* Details - Clean & Minimal */}
                <div className="pt-6 pb-2 px-2">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">{product.category}</p>
                            <Link to={`/product/${product.id}`}>
                                <h3 className="text-lg font-display font-normal text-stone-900 hover:text-secondary transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                            </Link>
                        </div>
                        {/* Price aligned right */}
                        <p className="text-lg font-body font-semibold text-stone-900">₹{(product.price).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        {/* Colors */}
                        <div className="flex space-x-1.5">
                            {product.colors && product.colors.map((color, idx) => (
                                <div key={idx} className="w-3 h-3 rounded-full border border-gray-200 ring-1 ring-transparent hover:ring-gray-300 transition-all cursor-pointer" style={{ backgroundColor: color }}></div>
                            ))}
                        </div>

                        {/* Rating */}
                        {product.rating && (
                            <div className="flex items-center text-xs font-semibold text-gray-500">
                                <Star size={12} className="fill-secondary text-secondary mr-1" />
                                {product.rating}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </>
    );
}
