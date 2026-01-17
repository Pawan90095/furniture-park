import React from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/ui/EmptyState';
import { Heart } from 'lucide-react';

export default function Wishlist() {
    const { products, wishlist } = useStore();

    // Filter products that are in the wishlist
    const wishlistProducts = products.filter(product => wishlist.includes(product.id));

    return (
        <div className="pt-24 min-h-screen bg-[#F9F8F6] pb-24">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">

                {/* Header */}
                <div className="mb-12 border-b border-[#E6E1D6] pb-8">
                    <h1 className="text-4xl md:text-5xl font-display font-medium text-primary mb-2">My Wishlist</h1>
                    <p className="text-secondary text-lg">
                        {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>

                {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                        {wishlistProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={Heart}
                        title="Your wishlist is empty"
                        description="Save items you love to revisit them later. Create your own curated collection."
                        actionText="Explore Collection"
                        actionLink="/shop"
                    />
                )}
            </div>
        </div>
    );
}
