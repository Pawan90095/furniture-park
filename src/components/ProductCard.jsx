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
                className="group relative bg-transparent transition-all duration-500 hover-lift"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                {/* Badge */}
                {product.badge && (
                    <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest text-white px-4 py-1.5 rounded-full bg-[#D4816E] backdrop-blur-sm">
                        {product.badge}
                    </span>
                )}

                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#F5F1E8]">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                    </Link>

                    {/* Wishlist Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                            const isAdding = !isWishlisted;
                            toast.success(isAdding ? '❤️ Added to wishlist' : '💔 Removed from wishlist');
                        }}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all z-10 shadow-md"
                    >
                        <Heart
                            size={18}
                            className={`transition-colors ${isWishlisted ? 'fill-[#D4816E] text-[#D4816E]' : 'text-[#2C2C2C]'}`}
                        />
                    </button>

                    {/* Action Buttons */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                        {/* Quick View */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowQuickView(true);
                            }}
                            className="btn btn-secondary flex-1 !py-2.5 !text-xs"
                        >
                            <Eye size={14} className="mr-1.5" />
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
                            className="w-12 h-12 bg-[#2C2C2C] text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-[#D4816E] transition-colors"
                            title="Add to Cart"
                        >
                            <ShoppingBag size={18} />
                        </motion.button>
                    </div>

                    {/* Compare Button */}
                    {!isInCompare && (
                        <button
                            onClick={handleAddToCompare}
                            className="absolute top-4 left-4 p-2 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 shadow-md"
                            title="Add to Compare"
                        >
                            <GitCompare size={16} className="text-[#2C2C2C]" />
                        </button>
                    )}
                </div>

                {/* Details */}
                <div className="pt-5 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                            <p className="text-overline text-[#888] mb-2">{product.category}</p>
                            <Link to={`/product/${product.id}`}>
                                <h3 className="text-lg font-display text-[#2C2C2C] hover:text-[#D4816E] transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                            </Link>
                        </div>
                        <p className="text-lg font-semibold text-[#2C2C2C] ml-3">₹{(product.price).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        {/* Colors */}
                        <div className="flex gap-2">
                            {product.colors && product.colors.slice(0, 3).map((color, idx) => (
                                <div
                                    key={idx}
                                    className="w-4 h-4 rounded-full border-2 border-[#2C2C2C]/10 hover:border-[#D4816E] transition-all cursor-pointer shadow-sm"
                                    style={{ backgroundColor: color }}
                                    title={`Color option ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Rating */}
                        {product.rating && (
                            <div className="flex items-center text-xs font-medium text-[#4A4A4A]">
                                <Star size={14} className="fill-[#D4816E] text-[#D4816E] mr-1" />
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
