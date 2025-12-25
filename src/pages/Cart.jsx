import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const total = cartTotal;

    if (cart.length === 0) {
        return (
            <div className="pt-32 min-h-[70vh] flex flex-col items-center justify-center bg-background px-4">
                <h2 className="text-3xl font-serif font-bold mb-4 font-primary">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't found the right piece yet.</p>
                <Link
                    to="/shop"
                    className="bg-primary text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 min-h-screen bg-background pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold mb-12 text-primary">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-sm shadow-soft"
                            >
                                <div className="w-full sm:w-32 aspect-square bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-serif font-bold text-lg text-primary">{item.name}</h3>
                                            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{item.category}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-end mt-4 sm:mt-0">
                                        <div className="flex items-center border border-gray-200 rounded-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-2 hover:bg-gray-50 text-gray-600"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <p className="font-medium text-lg text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-sm shadow-soft sticky top-28">
                            <h3 className="font-serif font-bold text-xl mb-6 text-primary">Order Summary</h3>

                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-xl text-primary">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
                            >
                                <span>Proceed to Checkout</span>
                                <ArrowRight size={18} />
                            </Link>

                            <div className="mt-6 flex items-center justify-center text-gray-400 text-xs gap-2">
                                <ShieldCheck size={14} />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
