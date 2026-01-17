import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import QuickViewModal from './QuickViewModal';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useStore();
    const isWishlisted = wishlist.includes(product.id);
    const { toast } = useToast();
    const [showQuickView, setShowQuickView] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative flex flex-col"
            >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F0EFEC] mb-4">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                    </Link>

                    {/* Wishlist Button - Top Right */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                            const isAdding = !isWishlisted;
                            toast.success(isAdding ? 'Saved to Favorites' : 'Removed from Favorites');
                        }}
                        className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${isWishlisted ? 'bg-white text-red-500 shadow-sm' : 'bg-white/70 text-primary hover:bg-white hover:shadow-sm'}`}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                    </button>

                    {/* Quick Add Button - Bottom Center (Slide Up) */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 z-10 hidden md:block">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                toast.success('Added to Cart');
                            }}
                            className="w-full bg-[#FFFFFF]/90 backdrop-blur-md text-primary py-3 rounded-xl font-medium text-sm hover:bg-[#2C2C2C] hover:text-white transition-all shadow-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 px-1">
                    <Link to={`/product/${product.id}`} className="group-hover:text-[#556B2F] transition-colors duration-200">
                        <h3 className="font-display text-lg text-primary leading-tight mb-1 truncate">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-medium text-secondary">
                            ₹{product.price.toLocaleString()}
                        </p>
                        {product.rating && (
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] text-yellow-500">★</span>
                                <span className="text-xs text-gray-400">{product.rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Color Dots (Mockup) */}
                    {product.colors && (
                        <div className="flex gap-1.5 mt-3">
                            {product.colors.slice(0, 3).map((col, i) => (
                                <div key={i} className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: col }}></div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            <QuickViewModal
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </>
    );
}
