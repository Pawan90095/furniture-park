import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Living Room', image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1780&auto=format&fit=crop', link: '/shop?category=Living Room' },
    { name: 'Dining', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1932&auto=format&fit=crop', link: '/shop?category=Dining' },
    { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-b0346efee539?q=80&w=1974&auto=format&fit=crop', link: '/shop?category=Bedroom' },
    { name: 'Office', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop', link: '/shop?category=Office' },
    { name: 'Lighting', image: 'https://images.unsplash.com/photo-1513506003013-68d27dbe9711?q=80&w=1974&auto=format&fit=crop', link: '/shop?category=Lighting' },
    { name: 'Outdoor', image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1974&auto=format&fit=crop', link: '/shop?category=Outdoor' },
    { name: 'Rugs', image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=1935&auto=format&fit=crop', link: '/shop?category=Rugs' },
    { name: 'Decor', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop', link: '/shop?category=Decor' },
];

export default function CategoryGrid() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 py-24">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-4xl font-display font-medium text-primary">Shop by Category</h2>
                <Link to="/shop" className="text-secondary hover:text-[#556B2F] border-b border-transparent hover:border-[#556B2F] transition-all pb-0.5 hidden md:block">
                    View All Categories
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                {categories.map((cat) => (
                    <Link key={cat.name} to={cat.link} className="group block">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-[#F0EFEC]">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            {/* Overlay Gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-primary group-hover:text-[#556B2F] transition-colors">{cat.name}</h3>
                            <span className="w-8 h-8 rounded-full border border-[#E6E1D6] flex items-center justify-center text-primary group-hover:bg-[#556B2F] group-hover:text-white group-hover:border-[#556B2F] transition-all">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
