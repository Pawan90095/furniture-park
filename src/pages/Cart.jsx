import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const total = cartTotal;

    if (cart.length === 0) {
        return (
            <div className="pt-32 min-h-[70vh] flex flex-col items-center justify-center bg-[#F9F8F6] px-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                    <ShoppingBag size={32} className="text-secondary" />
                </div>
                <h2 className="text-4xl font-display font-medium mb-4 text-primary">Your bag is empty</h2>
                <p className="text-secondary mb-10 max-w-md text-center leading-relaxed">
                    Discover our latest collection of hand-crafted furniture and accessories.
                </p>
                <Link
                    to="/shop"
                    className="bg-[#2C2C2C] text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-[#556B2F] transition-all shadow-md"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 min-h-screen bg-[#F9F8F6] pb-24">
            <div className="max-w-[1280px] mx-auto px-6">
                <h1 className="text-5xl font-display font-medium mb-16 text-primary">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Cart Items - List Layout */}
                    <div className="lg:col-span-8">
                        <div className="space-y-10">
                            {cart.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-[#E6E1D6] last:border-0"
                                >
                                    <div className="w-full sm:w-40 aspect-[4/5] bg-[#F0EFEC] rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-display font-medium text-2xl text-primary mb-2 hover:text-[#556B2F] transition-colors">
                                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                </h3>
                                                <p className="text-secondary text-sm uppercase tracking-widest">{item.category}</p>
                                            </div>
                                            <p className="font-medium text-xl text-primary hidden sm:block">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>

                                        <div className="flex justify-between items-end mt-6 sm:mt-0">
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center border border-[#E6E1D6] rounded-full px-4 py-2 bg-white">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="text-secondary hover:text-primary transition-colors disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="text-secondary hover:text-primary transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-secondary hover:text-red-500 transition-colors flex items-center gap-1 text-sm border-b border-transparent hover:border-red-500 pb-0.5"
                                                >
                                                    <Trash2 size={16} /> <span>Remove</span>
                                                </button>
                                            </div>
                                            <p className="font-medium text-xl text-primary sm:hidden">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Summary - Minimal Card */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-10 rounded-2xl shadow-soft sticky top-32">
                            <h3 className="font-display font-medium text-2xl mb-8 text-primary">Order Summary</h3>

                            <div className="space-y-6 mb-8 text-base">
                                <div className="flex justify-between text-secondary">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-secondary">
                                    <span>Shipping</span>
                                    <span className="text-[#556B2F]">Free</span>
                                </div>
                                <div className="border-t border-[#E6E1D6] pt-6 flex justify-between font-display font-medium text-2xl text-primary">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-[#2C2C2C] text-white py-4 font-medium tracking-wide text-base hover:bg-[#556B2F] transition-all flex items-center justify-center space-x-3 shadow-md rounded-full mb-6"
                            >
                                <span>Proceed to Checkout</span>
                                <ArrowRight size={18} />
                            </Link>

                            <div className="flex items-center justify-center text-secondary text-sm gap-2">
                                <ShieldCheck size={16} />
                                <span>Secure SSL Encrypted Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
