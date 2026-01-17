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
        <section className="max-w-[1440px] mx-auto px-6 py-24">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-4xl font-display font-medium text-primary">{title}</h2>
                <Link to="/shop" className="text-secondary hover:text-[#556B2F] border-b border-transparent hover:border-[#556B2F] transition-all pb-0.5 hidden md:block">
                    View All
                </Link>
            </div>
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
        <div className="bg-[#F9F8F6] min-h-screen">
            {/* 1. Hero */}
            <HeroSection />

            {/* 2. Brand Philosophy / Intro (New editorial section) */}
            <section className="py-24 px-6 max-w-[1440px] mx-auto text-center">
                <span className="text-sm font-medium tracking-[0.2em] text-[#556B2F] uppercase mb-6 block">The Philosophy</span>
                <h2 className="text-3xl md:text-5xl font-display font-medium text-primary max-w-4xl mx-auto leading-tight mb-8">
                    We believe in design that nurtures. <br /> Spaces that breathe.
                </h2>
                <p className="text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                    Every piece in our collection is crafted with intention, balancing form and function to create a home that feels as good as it looks.
                </p>
            </section>

            {/* 3. Shop Categories */}
            <CategoryGrid />

            {/* 4. Trending Now */}
            <SimpleProductGrid title="Curated for You" products={trending} />

            {/* 5. Highlight / Feature Split Section */}
            <section className="py-24 max-w-[1920px] mx-auto">
                <div className="grid md:grid-cols-2 bg-[#EAE8E4]">
                    <div className="relative aspect-square md:aspect-auto h-full min-h-[500px]">
                        <img
                            src="https://images.unsplash.com/photo-1595515106967-0b3fa7422784?q=80&w=2670&auto=format&fit=crop"
                            alt="Artisan Craftsmanship"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-12 md:p-24">
                        <span className="text-sm font-medium tracking-[0.2em] text-[#556B2F] uppercase mb-6">Craftsmanship</span>
                        <h2 className="text-4xl font-display font-medium mb-6 text-primary">Made by Hand, <br /> Built for Life.</h2>
                        <p className="text-secondary text-lg mb-8 leading-relaxed">
                            Our furniture is constructed using sustainable, solid woods and natural fabrics. We partner with master artisans who bring generations of skill to every joint and stitch.
                        </p>
                        <Link to="/about" className="btn-outline self-start">Discover Our Process</Link>
                    </div>
                </div>
            </section>

            {/* 6. New Arrivals */}
            <SimpleProductGrid title="New Arrivals" products={newArrivals} />

            {/* 7. Newsletter Banner */}
            <div className="py-24 px-6">
                <div className="bg-white rounded-3xl max-w-[1440px] mx-auto overflow-hidden shadow-soft relative">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-12 md:p-24">
                            <h2 className="text-4xl font-display font-medium mb-4 text-primary">Join the Inner Circle</h2>
                            <p className="text-secondary text-lg mb-8">Receive early access to new collections, exclusive event invites, and styling tips from our designers.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    className="flex-1 bg-[#F9F8F6] px-6 py-4 rounded-full text-base focus:outline-none border border-transparent focus:border-[#556B2F] transition-all"
                                    placeholder="Email Address"
                                />
                                <button className="bg-[#2C2C2C] text-white px-10 py-4 rounded-full font-medium hover:bg-[#556B2F] transition-all text-sm tracking-wide">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div className="h-full min-h-[400px] relative">
                            <img
                                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2565&auto=format&fit=crop"
                                alt="Newsletter Interior"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
