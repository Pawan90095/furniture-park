import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import {
    ArrowLeft, Check, ShoppingBag, ShieldCheck, Truck, Clock, Star,
    Plus, Minus, X, User, CreditCard, BadgeCheck, Ruler, Box, Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageZoom from '../components/ImageZoom';

// Tab Component Helper
const TabButton = ({ active, label, onClick }) => (
    <button
        onClick={onClick}
        className={`pb-4 px-2 text-sm font-bold tracking-wide uppercase transition-all relative ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`}
    >
        {label}
        {active && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
    </button>
);

export default function ProductDetails() {
    const { id } = useParams();
    const { toast } = useToast();
    const products = useStore((state) => state.products);
    const addToRecentlyViewed = useStore((state) => state.addToRecentlyViewed);
    const { addToCart } = useCart();

    // UI State
    const [activeTab, setActiveTab] = useState('description');
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [showSticky, setShowSticky] = useState(false);

    const product = products.find((p) => (p._id || p.id) == id);

    useEffect(() => {
        if (product) addToRecentlyViewed(product.id);

        const handleScroll = () => setShowSticky(window.scrollY > 800);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [product, addToRecentlyViewed]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F8F6]">
                <h2 className="text-3xl font-display mb-4">Piece Not Found</h2>
                <Link to="/shop" className="text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all">Return to Collection</Link>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="pt-20 min-h-screen bg-white pb-24">

            {/* Sticky Mobile Bar */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden"
                    >
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{product.category}</p>
                            <p className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-[#2C2C2C] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg"
                        >
                            Add to Cart
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-xs font-medium text-secondary mb-12 uppercase tracking-widest">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-primary">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-24">
                    {/* Left: Gallery */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="aspect-square bg-[#F9F8F6] rounded-sm overflow-hidden relative group cursor-crosshair">
                            {/* Main Image */}
                            <ImageZoom
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                                Best Seller
                            </div>
                        </div>
                        {/* Thumbnails (Mock) */}
                        <div className="grid grid-cols-4 gap-4">
                            {[product.image, product.image, product.image].map((img, i) => (
                                <div key={i} className={`aspect-square bg-[#F9F8F6] rounded-sm cursor-pointer border-2 transition-all ${i === 0 ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}>
                                    <img src={img} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Info */}
                    <div className="flex flex-col">
                        <div className="mb-8 border-b border-gray-100 pb-8">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary mb-4">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-sans font-medium text-primary">₹{product.price.toLocaleString()}</span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm font-bold text-primary ml-1">4.9</span>
                                    <span className="text-xs text-secondary underline decoration-gray-300 underline-offset-4 ml-2 cursor-pointer hover:text-primary">(128 Reviews)</span>
                                </div>
                            </div>
                            <p className="text-secondary leading-relaxed text-lg font-light">
                                {product.description} A statement piece designed to elevate your space with timeless elegance and superior comfort.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mb-10">
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="flex-1 bg-[#2C2C2C] text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#556B2F] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                                >
                                    <ShoppingBag size={20} />
                                    <span>Add to Cart</span>
                                </button>
                                <button className="px-4 py-4 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-primary">
                                    <Plus size={24} />
                                </button>
                            </div>
                            <div className="bg-[#F9F8F6] rounded-xl p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-sm text-primary">
                                    <Truck size={18} className="text-[#556B2F]" />
                                    <span className="font-bold">Free Premium Delivery</span>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-secondary">Arrives by <span className="font-bold text-primary">Oct 24</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-primary">
                                    <ShieldCheck size={18} className="text-[#556B2F]" />
                                    <span className="font-bold">5-Year Structural Warranty</span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-auto">
                            <div className="flex gap-8 border-b border-gray-100 mb-6 overflow-x-auto">
                                <TabButton active={activeTab === 'description'} label="Description" onClick={() => setActiveTab('description')} />
                                <TabButton active={activeTab === 'dimensions'} label="Dimensions" onClick={() => setActiveTab('dimensions')} />
                                <TabButton active={activeTab === 'care'} label="Care" onClick={() => setActiveTab('care')} />
                                <TabButton active={activeTab === 'shipping'} label="Shipping" onClick={() => setActiveTab('shipping')} />
                            </div>
                            <div className="min-h-[150px] text-gray-600 leading-relaxed text-sm">
                                {activeTab === 'description' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <p className="mb-4">Handcrafted by skilled artisans using premium materials. The {product.category} collection blends modern minimalist design with functional comfort. Each piece is rigorously tested to ensure durability and style that lasts.</p>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-500">
                                            <li>Premium upholstery fabric</li>
                                            <li>Solid wood kiln-dried frame</li>
                                            <li>High-density foam cushioning</li>
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'dimensions' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs uppercase font-bold text-gray-400 mb-1">Overall Height</span>
                                            <span className="font-medium text-primary">32 inches</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs uppercase font-bold text-gray-400 mb-1">Overall Width</span>
                                            <span className="font-medium text-primary">84 inches</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs uppercase font-bold text-gray-400 mb-1">Seat Depth</span>
                                            <span className="font-medium text-primary">24 inches</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs uppercase font-bold text-gray-400 mb-1">Leg Height</span>
                                            <span className="font-medium text-primary">6 inches</span>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'care' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex gap-4 items-start mb-4">
                                            <div className="p-2 bg-gray-100 rounded-full"><Leaf size={16} /></div>
                                            <div>
                                                <h5 className="font-bold text-primary text-sm mb-1">Professional Cleaning</h5>
                                                <p className="text-xs">Recommended every 12-18 months to maintain fabric integrity.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="p-2 bg-gray-100 rounded-full"><Box size={16} /></div>
                                            <div>
                                                <h5 className="font-bold text-primary text-sm mb-1">Spot Cleaning</h5>
                                                <p className="text-xs">Blot spills immediately with a clean, dry white cloth. Do not rub.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'shipping' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <p className="mb-4">This item ships via White Glove Delivery. Our team will bring it into your home, unpack it, assemble it, and remove all packaging materials.</p>
                                        <div className="p-3 bg-yellow-50 border border-yellow-100 rounded text-yellow-800 text-xs">
                                            <strong>Note:</strong> Please measure your doorways and hallways to ensure this item will fit.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bundle / Frequently Bought Together (Editorial Style) */}
                {relatedProducts.length > 0 && (
                    <section className="border-t border-gray-100 pt-16 mb-24">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-display font-medium text-primary mb-2">Complete the Look</h2>
                                <p className="text-secondary text-sm">Curated pairings to enhance your space.</p>
                            </div>
                            <Link to="/shop" className="text-sm font-bold border-b border-primary pb-1 hover:text-[#556B2F] hover:border-[#556B2F] transition-all hidden md:block">
                                View Full Collection
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProducts.map(p => (
                                <div key={p.id} className="group">
                                    <div className="relative aspect-[4/5] bg-[#F9F8F6] mb-4 overflow-hidden rounded-sm">
                                        <Link to={`/product/${p.id}`}>
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        </Link>
                                        <button
                                            onClick={() => addToCart(p)}
                                            className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    <h3 className="font-display text-lg text-primary mb-1 group-hover:text-[#556B2F] transition-colors">
                                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                                    </h3>
                                    <p className="text-sm text-secondary">₹{p.price.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews Summary (Mock for now) */}
                <section className="bg-[#F9F8F6] rounded-2xl p-8 md:p-16 text-center">
                    <h2 className="text-3xl font-display font-medium text-primary mb-8">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            { text: "The quality is unmatched. It transformed my living room entirely.", author: "Sarah J." },
                            { text: "White glove delivery was seamless. They set everything up in 15 minutes.", author: "Michael B." },
                            { text: "Worth every rupee. The fabric feels incredibly luxurious.", author: "Priya K." }
                        ].map((rev, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
                                <div className="flex text-[#556B2F] mb-4">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-primary mb-6 leading-relaxed">"{rev.text}"</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-secondary">— {rev.author}</p>
                            </div>
                        ))}
                    </div>
                    <button className="mt-12 bg-white border border-gray-200 px-8 py-3 rounded-full font-bold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                        Read All 128 Reviews
                    </button>
                </section>
            </div>

            {/* Review Modal Placeholder */}
            {isReviewModalOpen && <div />}
        </div>
    );
}
