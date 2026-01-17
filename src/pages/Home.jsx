import React from 'react';
import { useStore } from '../store/useStore';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/PromoBanner';

// Simple Grid Component purely for internal Home use
const SimpleProductGrid = ({ title, products }) => {
    if (!products || products.length === 0) return null;
    return (
        <section className="max-w-[1920px] mx-auto px-6 py-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center tracking-tight text-balance">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default function Home() {
    const products = useStore((state) => state.products);

    // Filter Logic
    const trending = products.filter(p => p.rating >= 4.5).slice(0, 4);
    const newArrivals = products.slice(0, 8); // Assuming last added are new
    const bestSellers = products.filter(p => p.reviews > 10).slice(0, 4); // Dummy logic for best sellers

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Hero */}
            <HeroSection />

            {/* 2. Shop Categories */}
            <CategoryGrid />

            {/* 3. Trending Now */}
            <SimpleProductGrid title="Trending Now" products={trending} />

            {/* 4. New Arrivals */}
            <SimpleProductGrid title="New Arrivals" products={newArrivals} />

            {/* 5. Best Sellers */}
            <SimpleProductGrid title="Best Sellers" products={bestSellers} />

            {/* 6. Promo Banner (Reusing or updating if needed. Note: Ensure styles match) */}
            <div className="max-w-[1920px] mx-auto px-6 py-20">
                <div className="bg-gray-100 py-24 px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Join the list</h2>
                    <p className="text-gray-500 mb-8">Unlock 15% off your first order when you sign up.</p>
                    <div className="max-w-md mx-auto flex">
                        <input className="flex-1 bg-white p-3 text-sm focus:outline-none border border-transparent focus:border-black" placeholder="Email Address" />
                        <button className="bg-black text-white px-8 py-3 text-sm font-bold uppercase">Subscribe</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
