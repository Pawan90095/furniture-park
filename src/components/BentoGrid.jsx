import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = [
    {
        id: 1,
        name: "Living Room",
        itemCount: "240+ Items",
        className: "col-span-1 md:col-span-2 md:row-span-2", // Big Box
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        link: "/shop?category=Living Room"
    },
    {
        id: 2,
        name: "Bedroom Oasis",
        itemCount: "120+ Items",
        className: "col-span-1 md:col-span-1 md:row-span-2", // Tall Vertical
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        link: "/shop?category=Bedroom"
    },
    {
        id: 3,
        name: "Dining",
        itemCount: "80+ Items",
        className: "col-span-1 md:col-span-1 md:row-span-1", // Standard
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
        link: "/shop?category=Dining"
    },
    {
        id: 4,
        name: "Workspace",
        itemCount: "45+ Items",
        className: "col-span-1 md:col-span-2 md:row-span-1", // Wide Horizontal
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        link: "/shop?category=Office"
    },
    {
        id: 5,
        name: "Decor & Lighting",
        itemCount: "150+ Items",
        className: "col-span-1 md:col-span-1 md:row-span-1", // Standard
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        link: "/shop?category=Decor"
    }
];

export default function BentoGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-5xl md:text-6xl font-display font-normal text-stone-900 mb-3">
                        Explore collections
                    </h2>
                    <p className="text-stone-600 text-sm uppercase tracking-[0.2em] font-semibold">
                        Curated spaces for every corner of your home
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-4 md:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.link}
                            className={`group relative overflow-hidden rounded-3xl ${category.className}`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                            </div>

                            {/* Content - Bottom Left */}
                            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-white/80 text-xs mb-2 font-medium uppercase tracking-wider">
                                            {category.itemCount}
                                        </p>
                                        <h3 className="text-white font-display text-2xl md:text-3xl font-normal leading-tight transition-transform duration-300 group-hover:translate-x-2">
                                            {category.name}
                                        </h3>
                                    </div>

                                    {/* Arrow Icon - Fades in on hover */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <ArrowUpRight className="text-white" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-3xl transition-all duration-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
