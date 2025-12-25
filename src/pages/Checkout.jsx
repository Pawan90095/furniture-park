import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Banknote, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Checkout() {
    const { cart, clearCart, cartTotal } = useCart();
    const navigate = useNavigate();
    const subtotal = cartTotal;
    const shipping = subtotal > 50000 ? 0 : 500; // Updated threshold and cost
    const total = subtotal + shipping;

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate order placement
        setTimeout(() => {
            clearCart();
            setIsProcessing(false);
            navigate('/order-success');
        }, 2000);
    };

    if (cart.length === 0 && !isProcessing) {
        // If cart is empty, redirect to shop or show empty message. 
        // But allow component to render briefly or handle redirect in useEffect
    }

    // Better to handle redirect in effect to avoid render issues
    React.useEffect(() => {
        if (cart.length === 0 && !isProcessing) {
            navigate('/shop');
        }
    }, [cart, navigate, isProcessing]);

    if (cart.length === 0) return null;

    return (
        <div className="pt-32 pb-16 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-primary mb-12 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-200 pb-2">Shipping Information</h2>
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                                    <input required type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                                    <input required type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                <input required type="email" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Street Address</label>
                                <input required type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
                                    <input required type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pincode</label>
                                    <input required type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                                    <input required type="tel" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                            </div>

                            <h2 className="text-xl font-serif font-bold mt-10 mb-6 border-b border-gray-200 pb-2">Payment Method</h2>
                            <div className="space-y-4">
                                <div
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-secondary bg-secondary/5' : 'border-gray-200'}`}
                                >
                                    <CreditCard className="mr-4 text-primary" size={24} />
                                    <span className="font-medium text-primary">Credit / Debit Card</span>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-secondary bg-secondary/5' : 'border-gray-200'}`}
                                >
                                    <span className="mr-4 text-primary font-bold text-xl w-6 text-center">@</span>
                                    <span className="font-medium text-primary">UPI</span>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-secondary bg-secondary/5' : 'border-gray-200'}`}
                                >
                                    <Banknote className="mr-4 text-primary" size={24} />
                                    <span className="font-medium text-primary">Cash on Delivery</span>
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Right Column: Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-8 h-fit shadow-soft rounded-sm sticky top-28"
                    >
                        <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 mr-4 rounded-sm overflow-hidden">
                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-primary">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center font-bold text-xl text-primary border-t border-black pt-4 mb-8">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>

                        <button
                            form="checkout-form"
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-primary text-white py-4 font-medium hover:bg-secondary transition-colors flex items-center justify-center space-x-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Place Order</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                        <div className="mt-4 flex justify-center space-x-4 text-gray-400">
                            <Truck size={18} />
                            <span className="text-xs">Secure Shipping</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
