
import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';

export default function NewsletterPopup() {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Check if seen in this session
        const hasSeen = sessionStorage.getItem('newsletterSeen');

        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000); // 5 seconds delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('newsletterSeen', 'true');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically integrate with a backend
        console.log('Newsletter subscription:', email);
        toast.success('Thanks for subscribing!');
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex relative"
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-1 bg-white rounded-full"
                    >
                        <X size={24} />
                    </button>

                    {/* Image Section - Hidden on Mobile */}
                    <div className="w-1/2 bg-gray-100 hidden md:block relative">
                        <img
                            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Interior"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/10"></div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="text-primary w-6 h-6" />
                        </div>

                        <h2 className="text-3xl font-serif text-primary font-bold mb-3">
                            Get 10% Off
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Subscribe to our newsletter and get an exclusive code for your first order of premium furniture.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors"
                            >
                                Subscribe Now
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 mt-4">
                            By subscribing, you agree to our Terms & Conditions.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
