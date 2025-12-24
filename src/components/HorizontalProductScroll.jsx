import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function HorizontalProductScroll({ title, products }) {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-4xl md:text-5xl font-display font-normal text-stone-900">{title}</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} className="text-gray-700" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} className="text-gray-700" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
                >
                    {products.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-72 snap-start">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
