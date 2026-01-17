import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useStore();
    const isWishlisted = wishlist.includes(product.id);
    const { toast } = useToast();
    const [showQuickView, setShowQuickView] = useState(false);

    return (
        <>
            <div className="group relative">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
                        />
                    </Link>

                    {/* Wishlist - Only Show on Hover or if Wishlisted */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                            const isAdding = !isWishlisted;
                            toast.success(isAdding ? 'Saved to Favorites' : 'Removed from Favorites');
                        }}
                        className={`absolute top-2 right-2 p-2 rounded-full transition-all ${isWishlisted ? 'opacity-100 text-red-600' : 'opacity-0 group-hover:opacity-100 bg-white shadow-sm text-gray-900'}`}
                    >
                        <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                    </button>

                    {/* Quick Add - Slide Up on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hidden md:block">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                toast.success('Added to Cart');
                            }}
                            className="w-full bg-white/90 backdrop-blur-sm border border-gray-200 py-3 text-sm font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="mt-3">
                    <div className="flex justify-between items-start">
                        <Link to={`/product/${product.id}`}>
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:underline">
                                {product.name}
                            </h3>
                        </Link>
                        <p className="text-sm font-semibold text-gray-900">
                            ₹{product.price.toLocaleString()}
                        </p>
                    </div>
                    {product.rating && (
                        <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">★★★★★ ({product.rating})</span>
                        </div>
                    )}
                </div>
            </div>

            <QuickViewModal
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </>
    );
}
