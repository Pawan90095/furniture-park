import React from 'react';
import { motion } from 'framer-motion';

export default function TextPageLayout({ title, subtitle, children }) {
    return (
        <div className="pt-32 min-h-screen bg-white pb-24">
            <div className="max-w-3xl mx-auto px-6">
                <header className="mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-medium text-primary mb-4"
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-secondary text-lg"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="prose prose-stone max-w-none prose-headings:font-display prose-headings:font-medium prose-a:text-[#556B2F] hover:prose-a:text-primary transition-all"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
