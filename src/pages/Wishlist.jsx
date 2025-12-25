
import React from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/ui/EmptyState';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Wishlist() {
    const { products, wishlist } = useStore();

    // Filter products that are in the wishlist
    const wishlistProducts = products.filter(product => wishlist.includes(product.id));

    return (
        <div className="pt-32 min-h-screen bg-white pb-24">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">

                <div className="flex items-center space-x-4 mb-12">
                    <Heart className="w-8 h-8 text-primary fill-primary" />
                    <h1 className="text-4xl md:text-5xl font-serif text-primary">Your Wishlist</h1>
                </div>

                {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                        {wishlistProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={Heart}
                        title="Your wishlist is empty"
                        description="Save items you love to revisit them later."
                        actionText="Start Browsing"
                        actionLink="/shop"
                    />
                )}
            </div>
        </div>
    );
}
