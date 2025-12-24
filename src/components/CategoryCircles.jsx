import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    {
        name: "Sofas",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        link: "/shop?category=Living Room"
    },
    {
        name: "Beds",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        link: "/shop?category=Bedroom"
    },
    {
        name: "Lighting",
        image: "https://images.unsplash.com/photo-1507473888900-52e1adad5481?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        link: "/shop?q=lighting"
    },
    {
        name: "Decor",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        link: "/shop?q=decor"
    },
    {
        name: "Dining",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        link: "/shop?category=Dining"
    },
    {
        name: "Office",
        image: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        link: "/shop?q=office"
    }
];

export default function CategoryCircles() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-8">Shop By Category</h2>

                <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={category.link}
                            className="flex-shrink-0 group text-center"
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 border-2 border-gray-200 group-hover:border-secondary transition-all">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <p className="font-semibold text-sm text-gray-900 group-hover:text-secondary transition-colors">
                                {category.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
