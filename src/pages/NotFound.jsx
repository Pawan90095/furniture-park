import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] px-6 text-center">
            <div className="max-w-xl mx-auto relative">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="font-display text-[12vw] md:text-[150px] leading-none text-[#E6E1D6] select-none"
                >
                    404
                </motion.h1>
                <div className="relative -mt-8 md:-mt-16 z-10">
                    <h2 className="text-3xl md:text-4xl font-display font-medium text-primary mb-4">Piece Not Found</h2>
                    <p className="text-secondary text-lg mb-8 leading-relaxed">
                        The page you are looking for might have been moved, removed, or never existed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-[#2C2C2C] text-white px-8 py-3 rounded-xl hover:bg-[#556B2F] transition-all shadow-lg font-bold"
                        >
                            <Home size={18} />
                            <span>Back Home</span>
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary px-8 py-3 rounded-xl hover:border-gray-400 transition-all font-bold"
                        >
                            <ArrowLeft size={18} />
                            <span>Go Back</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
