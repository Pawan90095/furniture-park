import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, Check, ShoppingBag, ShieldCheck, Truck, Clock, Star, Plus, Minus, X, User, CreditCard, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageZoom from '../components/ImageZoom';

export default function ProductDetails() {
    const { id } = useParams();
    const { toast } = useToast();
    const products = useStore((state) => state.products);
    const addToRecentlyViewed = useStore((state) => state.addToRecentlyViewed);
    const { addToCart } = useCart();
    // FAQ State
    const [openFaq, setOpenFaq] = useState(null);
    // Review Modal State
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const product = products.find((p) => (p._id || p.id) == id); // Handle Mongo _id or legacy id

    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        // Track recently viewed
        if (product) {
            addToRecentlyViewed(product.id);
        }

        // Scroll listener for sticky button
        const handleScroll = () => {
            setShowSticky(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [product, addToRecentlyViewed]);

    // Handle product not found
    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-serif mb-4">Product not found</h2>
                <Link to="/shop" className="text-primary hover:underline">Back to Shop</Link>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .sort(() => 0.5 - Math.random()) // Randomize
        .slice(0, 3);

    return (
        <div className="pt-24 min-h-screen bg-white pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Breadcrumbs */}
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-primary font-medium">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                    {/* Image with Zoom */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <ImageZoom
                            src={product.image}
                            alt={product.name}
                            className="aspect-square bg-gray-100 rounded-sm"
                        />
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-center"
                    >
                        <h5 className="text-xs font-bold text-secondary mb-2 uppercase tracking-widest">{product.category}</h5>
                        <h1 className="text-5xl lg:text-7xl font-serif font-bold italic text-primary mb-4 leading-tight">{product.name}</h1>
                        {/* Price Display */}
                        <div className="flex items-end gap-3 mb-8">
                            <p className="text-4xl lg:text-5xl font-sans font-bold text-primary">₹{product.price.toLocaleString()}</p>
                        </div>

                        <div className="prose prose-sm text-gray-500 mb-8 max-w-none leading-relaxed">
                            <p>{product.description}</p>
                            <p className="mt-4">
                                Designed with precision and care, this piece exemplifies our commitment to quality. The materials are sustainably sourced, ensuring that your furniture is as kind to the planet as it is to your home.
                            </p>
                        </div>

                        <button
                            onClick={() => addToCart(product)}
                            className="w-full md:w-auto bg-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-2 hover:bg-secondary transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <ShoppingBag size={18} />
                            <span>Add to Cart</span>
                        </button>

                        <div className="flex items-center space-x-6 mt-4 text-xs text-gray-500 font-medium">
                            <div className="flex items-center gap-1.5"><Truck size={14} className="text-secondary" /> Free Delivery</div>
                            <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-secondary" /> 1-Year Warranty</div>
                            <div className="flex items-center gap-1.5"><CreditCard size={14} className="text-secondary" /> Secure Payment</div>
                        </div>

                        {/* Frequently Bought Together */}
                        {relatedProducts[0] && (
                            <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                <h4 className="font-bold text-sm text-gray-800 mb-3">Frequently Bought Together</h4>
                                <div className="flex items-center gap-4">
                                    <img src={relatedProducts[0].image} alt="Accessory" className="w-16 h-16 rounded-md object-cover" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{relatedProducts[0].name}</p>
                                        <p className="text-xs text-gray-500">Perfect match for your item</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-primary">₹{(relatedProducts[0].price * 0.9).toFixed(0)}</p>
                                        <p className="text-xs text-gray-400 line-through">₹{relatedProducts[0].price}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        addToCart(relatedProducts[0]);
                                    }}
                                    className="w-full mt-3 bg-white border border-secondary text-secondary py-2 rounded-lg text-xs font-bold hover:bg-secondary hover:text-white transition-colors"
                                >
                                    Add Bundle to Cart (Save 10%)
                                </button>
                            </div>
                        )}

                        <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-3">
                                <Clock size={18} className="text-secondary" />
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sticky Mobile Buy Button */}
                <AnimatePresence>
                    {showSticky && (
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100 }}
                            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 md:hidden shadow-2xl flex items-center justify-between"
                        >
                            <div>
                                <p className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{product.name}</p>
                                <p className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</p>
                            </div>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm"
                            >
                                Buy Now
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mb-24">
                    <h3 className="text-2xl font-serif font-bold mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {[
                            { q: "What is the warranty period?", a: "We offer a comprehensive 1-year warranty on this product covering manufacturing defects." },
                            { q: "Do you offer assembly?", a: "Yes! Use code FREEASSEMBLY at checkout for complimentary assembly within 48 hours of delivery." },
                            { q: "What is the return policy?", a: "We have a hassle-free 7-day return policy. If you don't love it, we'll take it back." }
                        ].map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    {item.q}
                                    {openFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
                                </button>
                                {openFaq === idx && (
                                    <div className="p-4 text-gray-600 bg-white border-t border-gray-200 text-sm">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="max-w-4xl mx-auto mb-24 pt-12 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                        <div>
                            <h3 className="text-3xl font-serif font-bold mb-2">Customer Reviews</h3>
                            <div className="flex items-center space-x-2">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                                </div>
                                <span className="text-gray-600 font-medium">4.8/5 (124 Reviews)</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsReviewModalOpen(true)}
                            className="mt-6 md:mt-0 px-6 py-3 bg-white border border-gray-300 rounded-full font-bold hover:bg-gray-50 transition-colors"
                        >
                            Write a Review
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Rahul S.", date: "2 days ago", text: "Absolutely love the fabric quality! Fits perfectly in my living room." },
                            { name: "Priya M.", date: "1 week ago", text: "Great delivery service and the assembly was super quick. Highly recommended!" },
                            { name: "Amit K.", date: "3 weeks ago", text: "Looks exactly like the pictures. Very sturdy and comfortable." }
                        ].map((review, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-xl">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-primary font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <p className="font-bold text-sm text-gray-900">{review.name}</p>
                                            <BadgeCheck size={16} className="text-green-600" title="Verified Purchase" />
                                        </div>
                                        <p className="text-xs text-gray-500">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400 mb-2">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review Modal */}
                {isReviewModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
                            <button
                                onClick={() => setIsReviewModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-black"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-serif font-bold mb-6">Write a Review</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Review submitted");
                                setIsReviewModalOpen(false);
                                toast.success("Thank you for your review!");
                            }}>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                                    <div className="flex space-x-2 text-gray-300 hover:text-yellow-400 cursor-pointer">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={28} className="hover:fill-yellow-400 transition-colors" />)}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Review</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
                                        rows="4"
                                        placeholder="How was your experience?"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Related */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-gray-100 pt-16">
                        <h3 className="text-2xl font-serif font-bold mb-10 text-center">You Might Also Like</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {relatedProducts.map((p) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    key={p.id}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-4 relative">
                                        <Link to={`/product/${p.id}`}>
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </Link>
                                    </div>
                                    <h4 className="font-serif font-medium text-lg text-primary text-center group-hover:text-secondary transition-colors">
                                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                                    </h4>
                                    <p className="text-gray-500 text-center mt-1">₹{p.price.toLocaleString()}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
