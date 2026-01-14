import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star, Eye, Flame, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';

export default function QuickViewModal({ product, isOpen, onClose }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useStore();
    const isWishlisted = wishlist.includes(product?.id);
    const { toast } = useToast();

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`✅ ${product.name} added to cart`);
    };

    const handleToggleWishlist = () => {
        toggleWishlist(product.id);
        const isAdding = !isWishlisted;
        toast.success(isAdding ? '❤️ Added to wishlist' : '💔 Removed from wishlist');
    };

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
                        transition={{ type: 'spring', damping: 25 }}
                        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                        >
                            <X size={20} className="text-gray-700" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                            {/* Image */}
                            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {product.badge && (
                                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm">
                                        {product.badge}
                                    </span>
                                )}
                                <button
                                    onClick={handleToggleWishlist}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                                >
                                    <Heart
                                        size={18}
                                        className={`transition-colors ${isWishlisted ? 'fill-secondary text-secondary' : 'text-gray-800'}`}
                                    />
                                </button>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col">
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">
                                        {product.category}
                                    </p>
                                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4 leading-tight">
                                        {product.name}
                                    </h2>

                                    {/* Rating */}
                                    {product.rating && (
                                        <div className="flex items-center space-x-2 mb-4">
                                            <div className="flex text-yellow-400">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} size={16} fill="currentColor" />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium">
                                                {product.rating} (124 reviews)
                                            </span>
                                        </div>
                                    )}

                                    {/* Urgency Indicators */}
                                    <div className="flex flex-col gap-2 mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
                                        <div className="flex items-center space-x-2 text-red-600 font-bold text-sm">
                                            <Flame size={14} />
                                            <span>Only {Math.floor(Math.random() * 5) + 2} units left!</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600 text-sm">
                                            <Eye size={14} />
                                            <span>{Math.floor(Math.random() * 15) + 5} people viewing now</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-end gap-3 mb-6">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-400 font-medium line-through">
                                                ₹{(product.price * 1.3).toFixed(0)}
                                            </p>
                                            <p className="text-3xl font-sans font-bold text-amber-700">
                                                ₹{product.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-1">
                                            Save 30%
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {product.description}
                                    </p>

                                    {/* Colors */}
                                    {product.colors && product.colors.length > 0 && (
                                        <div className="mb-6">
                                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                                                Available Colors
                                            </p>
                                            <div className="flex space-x-2">
                                                {product.colors.map((color, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-primary transition-all cursor-pointer"
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-primary text-white px-6 py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-2 hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 rounded-lg"
                                    >
                                        <ShoppingBag size={18} />
                                        <span>Add to Cart</span>
                                    </button>
                                    <Link
                                        to={`/product/${product.id}`}
                                        onClick={onClose}
                                        className="block w-full text-center border-2 border-gray-300 text-gray-700 px-6 py-3 font-bold uppercase tracking-widest text-sm hover:border-primary hover:text-primary transition-colors rounded-lg"
                                    >
                                        View Full Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
