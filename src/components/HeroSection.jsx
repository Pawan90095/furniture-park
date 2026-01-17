import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="max-w-[1920px] mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-white">
            {/* Text Content - First on Mobile, Left on Desktop */}
            <div>
                <h1 className="text-3xl md:text-6xl font-semibold leading-tight tracking-tight mb-4 md:mb-6 text-balance text-black">
                    Modern Furniture <br className="hidden md:block" /> For Real Life.
                </h1>

                <p className="text-gray-600 text-base md:text-xl max-w-md mb-8 leading-relaxed">
                    Clean lines. Smart design. Built to last. Discover our curated collection of contemporary essentials.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/shop"
                        className="btn-primary w-full md:w-auto h-12 inline-flex justify-center items-center text-center px-8"
                    >
                        Shop All Furniture
                    </Link>
                    <Link
                        to="/shop?sort=sale"
                        className="btn-outline w-full md:w-auto h-12 inline-flex justify-center items-center text-center px-8"
                    >
                        View Sale
                    </Link>
                </div>
            </div>

            {/* Image - Second on Mobile, Right on Desktop */}
            <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop"
                    alt="Modern Living Room with grey sofa and minimal decor"
                    className="w-full h-full object-cover"
                    loading="eager" // Hero image should load fast
                />
            </div>
        </section>
    );
}
