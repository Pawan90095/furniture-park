import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // Generate random 6-digit order ID
        const randomId = Math.floor(100000 + Math.random() * 900000);
        setOrderId(randomId);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-10 md:p-16 text-center max-w-lg shadow-soft rounded-sm"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        <CheckCircle size={80} className="text-secondary" />
                    </motion.div>
                </div>
                <h1 className="text-3xl font-serif font-bold text-primary mb-4">Thank you for your order!</h1>
                <p className="text-gray-500 mb-2 leading-relaxed font-medium">
                    Your Order ID is <span className="text-primary font-bold">#FP-{orderId}</span>
                </p>
                <p className="text-gray-400 text-sm mb-8">
                    You will receive an email confirmation shortly.
                </p>

                <div className="flex justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-white hover:bg-secondary transition-colors rounded-sm shadow-md font-medium"
                    >
                        <span>Continue Shopping</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
