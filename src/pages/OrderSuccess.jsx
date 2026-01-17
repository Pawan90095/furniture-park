import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Package, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function OrderSuccess() {
    const [orderId, setOrderId] = useState('');
    const { user } = useStore();

    useEffect(() => {
        const randomId = Math.floor(100000 + Math.random() * 900000);
        setOrderId(randomId);
    }, []);

    // Estimated delivery date (7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

    return (
        <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E6E1D6]"
            >
                <div className="bg-[#2C2C2C] text-white p-8 text-center relative overflow-hidden">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-16 h-16 bg-[#556B2F] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg z-10 relative"
                    >
                        <Check size={32} className="text-white" strokeWidth={3} />
                    </motion.div>
                    <h1 className="text-3xl font-display font-medium mb-2 relative z-10">Order Confirmed!</h1>
                    <p className="text-gray-300 relative z-10">Thank you for choosing Furniture Park.</p>

                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    </div>
                </div>

                <div className="p-8 md:p-10 space-y-8">
                    <div className="text-center space-y-1">
                        <p className="text-xs font-bold text-secondary uppercase tracking-widest">Order Number</p>
                        <p className="text-2xl font-serif font-bold text-primary">#FP-{orderId}</p>
                    </div>

                    <div className="bg-[#F9F8F6] rounded-xl p-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full shadow-sm">
                                <Package size={20} className="text-[#556B2F]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-primary mb-1">Preparing for Shipment</h4>
                                <p className="text-sm text-secondary">We've received your order and are getting it ready. You'll strictly receive an email with tracking info.</p>
                            </div>
                        </div>
                        <div className="w-px h-6 bg-gray-300 ml-6"></div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full shadow-sm text-gray-400">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-500 mb-1">Estimated Delivery</h4>
                                <p className="text-sm text-gray-400">By {deliveryDate.toLocaleDateString('en-US', dateOptions)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            to="/account"
                            className="w-full py-4 bg-white border border-gray-200 rounded-xl font-bold text-primary hover:border-black transition-all flex items-center justify-center text-sm uppercase tracking-wide"
                        >
                            View Order Details
                        </Link>
                        <Link
                            to="/shop"
                            className="w-full py-4 bg-[#2C2C2C] text-white rounded-xl font-bold hover:bg-[#556B2F] transition-all flex items-center justify-center gap-2 shadow-lg text-sm uppercase tracking-wide"
                        >
                            <span>Continue Shopping</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
