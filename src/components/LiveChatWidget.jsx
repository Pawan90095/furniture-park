import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Simulate sending message
        toast.success('✅ Message sent! Our team will respond shortly.');
        setMessage('');
        setIsOpen(false);
    };

    return (
        <>
            {/* Chat Bubble Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
                aria-label="Open chat"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-[90] w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold">Chat with us!</h3>
                                    <p className="text-xs opacity-90">We're here to help</p>
                                </div>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Online" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="p-4 h-64 overflow-y-auto bg-gray-50">
                            <div className="space-y-3">
                                {/* Bot Message */}
                                <div className="flex items-start space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xs font-bold">FP</span>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
                                        <p className="text-sm text-gray-800">
                                            👋 Hi there! Welcome to Furniture Park. How can we help you today?
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Just now</p>
                                    </div>
                                </div>

                                {/* Quick Replies */}
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 font-medium">Quick questions:</p>
                                    {[
                                        'Track my order',
                                        'Product availability',
                                        'Delivery information',
                                        'Return policy',
                                    ].map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setMessage(q);
                                            }}
                                            className="block w-full text-left px-3 py-2 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                <button
                                    type="submit"
                                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-shadow disabled:opacity-50"
                                    disabled={!message.trim()}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Typically replies within minutes
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
