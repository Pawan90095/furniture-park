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
            <div className="container-custom">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <p className="text-overline text-[#D4816E] mb-4">Shop by Room</p>
                    <h2 className="font-display text-[#2C2C2C] mb-4">
                        Explore Collections
                    </h2>
                    <p className="text-[#4A4A4A] max-w-2xl mx-auto">
                        Curated spaces for every corner of your home
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.link}
                            className={`group relative overflow-hidden rounded-2xl hover-lift ${category.className}`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-white/70 text-xs mb-2 font-medium uppercase tracking-wider">
                                            {category.itemCount}
                                        </p>
                                        <h3 className="text-white font-display text-3xl font-normal leading-tight transition-transform duration-300 group-hover:translate-x-2">
                                            {category.name}
                                        </h3>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                                        <div className="w-12 h-12 rounded-full bg-[#D4816E] flex items-center justify-center">
                                            <ArrowUpRight className="text-white" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
