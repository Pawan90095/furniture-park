import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="max-w-[1920px] mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center bg-white">
            <div className="order-2 md:order-1">
                <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-6 text-balance">
                    Modern Furniture <br /> For Real Life.
                </h1>

                <p className="text-gray-500 text-lg md:text-xl max-w-md mb-8 leading-relaxed">
                    Clean lines. Smart design. Built to last. Discover our curated collection of contemporary essentials.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/shop" className="btn-primary inline-flex justify-center items-center text-center">
                        Shop All Furniture
                    </Link>
                    <Link to="/shop?sort=sale" className="btn-outline inline-flex justify-center items-center text-center">
                        View Sale
                    </Link>
                </div>
            </div>

            <div className="order-1 md:order-2 relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop"
                    alt="Modern Living Room"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
}
