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
        <section className="max-w-[1920px] mx-auto px-6 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Link key={cat.name} to={cat.link} className="group block">
                        <div className="aspect-square bg-gray-50 overflow-hidden mb-3">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                            />
                        </div>
                        <h3 className="text-sm font-semibold text-center text-gray-900">{cat.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
