import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();
    const drawerRef = useRef(null);

    // Close drawer when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        }
        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen, setIsCartOpen]);

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    onClick={() => setIsCartOpen(false)}
                />
            )}

            {isCartOpen && (
                <motion.div
                    key="drawer"
                    ref={drawerRef}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3, ease: "easeOut" }}
                    className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-[#F0EFEC]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-8 border-b border-[#F0EFEC]">
                        <h2 className="text-2xl font-display font-medium text-primary flex items-center gap-3">
                            Shopping Bag
                            <span className="text-lg text-secondary font-sans font-normal">({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
                        </h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-[#F9F8F6] rounded-full transition-colors text-primary"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Free Shipping Progress - Minimal & Elegant */}
                    {cart.length > 0 && (
                        <div className="px-8 py-6 bg-[#F9F8F6]">
                            <div className="mb-2 flex justify-between text-sm">
                                {cartTotal >= 50000 ? (
                                    <span className="text-[#556B2F] font-medium">Free shipping unlocked</span>
                                ) : (
                                    <span className="text-secondary">
                                        Add <span className="text-primary font-medium">₹{(50000 - cartTotal).toLocaleString()}</span> for free shipping
                                    </span>
                                )}
                                <span className="text-secondary">{Math.min(100, Math.round((cartTotal / 50000) * 100))}%</span>
                            </div>
                            <div className="h-1 bg-[#E6E1D6] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#2C2C2C] transition-all duration-500 ease-out rounded-full"
                                    style={{ width: `${Math.min(100, (cartTotal / 50000) * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-16 h-16 bg-[#F9F8F6] rounded-full flex items-center justify-center text-secondary">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <p className="text-primary font-display text-lg mb-2">Your bag is empty</p>
                                    <p className="text-secondary text-sm">Discover our new collection.</p>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-[#556B2F] border-b border-[#556B2F] pb-0.5 hover:text-primary hover:border-primary transition-all text-sm font-medium"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-5 group">
                                    <div className="w-24 aspect-[4/5] bg-[#F0EFEC] rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <Link to={`/product/${item.id}`} className="font-display text-primary text-lg hover:text-[#556B2F] transition-colors line-clamp-2 pr-4" onClick={() => setIsCartOpen(false)}>
                                                {item.name}
                                            </Link>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <p className="text-sm text-secondary mb-4">
                                            ₹{item.price.toLocaleString()}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center border border-[#E6E1D6] rounded-full px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-1 hover:text-[#556B2F] text-secondary transition-colors disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium text-primary">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-1 hover:text-[#556B2F] text-secondary transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <span className="font-medium text-primary">₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-8 border-t border-[#F0EFEC] bg-white">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-secondary">Subtotal</span>
                                <span className="text-2xl font-display font-medium text-primary">₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-secondary mb-6 text-center">
                                Shipping & taxes calculated at checkout
                            </p>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-[#2C2C2C] text-white py-4 px-6 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-[#556B2F] transition-all shadow-md active:scale-[0.99]"
                            >
                                Proceed to Checkout <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
