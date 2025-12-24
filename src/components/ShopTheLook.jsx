import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';

const hotspots = [
    {
        id: 1,
        x: 45, // % from left
        y: 60, // % from top
        product: {
            name: "Velvet Lounge Sofa",
            price: 79999,
            link: "/product/lr-1",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        }
    },
    {
        id: 2,
        x: 75,
        y: 35,
        product: {
            name: "Arc Floor Lamp",
            price: 12999,
            link: "/shop?q=lamp",
            image: "https://images.unsplash.com/photo-1507473888900-52e1adad5481?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        }
    }
];

export default function ShopTheLook() {
    const [activeSpot, setActiveSpot] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div>
                        <span className="text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Inspiration</span>
                        <h2 className="text-4xl font-serif text-primary">Shop The Look</h2>
                    </div>
                    <Link to="/shop" className="hidden md:inline-flex items-center text-primary font-bold uppercase tracking-wider text-xs border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all">
                        View All Rooms <ChevronRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-luxury">
                    <img
                        src="https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                        alt="Modern Living Room"
                        className="w-full h-full object-cover"
                    />

                    {/* Hotspots */}
                    {hotspots.map((spot) => (
                        <div
                            key={spot.id}
                            className="absolute"
                            style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                            onMouseEnter={() => setActiveSpot(spot.id)}
                            onMouseLeave={() => setActiveSpot(null)}
                        >
                            <div className="relative group cursor-pointer">
                                {/* Pulsing Ring */}
                                <div className="absolute -inset-2 bg-white/30 rounded-full animate-ping"></div>
                                {/* Dot */}
                                <div className="relative w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
                                    <Plus size={16} className="text-primary" />
                                </div>

                                {/* Popover Card */}
                                <AnimatePresence>
                                    {activeSpot === spot.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-2xl z-20"
                                        >
                                            <div className="aspect-square rounded-md overflow-hidden mb-2">
                                                <img src={spot.product.image} alt={spot.product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <h4 className="font-serif text-sm font-bold text-gray-900 leading-tight mb-1">{spot.product.name}</h4>
                                            <div className="flex items-center justify-between">
                                                <span className="text-secondary text-xs font-bold">₹{spot.product.price.toLocaleString()}</span>
                                                <Link to={spot.product.link} className="p-1 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors">
                                                    <ChevronRight size={12} />
                                                </Link>
                                            </div>
                                            {/* Arrow Notch */}
                                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 transform"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
