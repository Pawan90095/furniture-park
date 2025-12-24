import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, Star, Award } from 'lucide-react';

const stats = [
    {
        icon: Users,
        end: 10000,
        suffix: '+',
        label: 'Happy Customers',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        icon: Package,
        end: 50000,
        suffix: '+',
        label: 'Products Delivered',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
    },
    {
        icon: Star,
        end: 4.8,
        suffix: '★',
        label: 'Average Rating',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        decimals: 1,
    },
    {
        icon: Award,
        end: 15,
        suffix: '+',
        label: 'Years of Excellence',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
    },
];

function Counter({ end, duration = 2, decimals = 0, suffix = '' }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            setCount(progress * end);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return (
        <span>
            {count.toFixed(decimals).toLocaleString()}
            {suffix}
        </span>
    );
}

export default function StatsCounter() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onViewportEnter={() => setIsVisible(true)}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Join our growing community of satisfied customers across India
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className={`w-20 h-20 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <stat.icon size={32} className={stat.color} />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {isVisible ? (
                                    <Counter
                                        end={stat.end}
                                        decimals={stat.decimals || 0}
                                        suffix={stat.suffix}
                                    />
                                ) : (
                                    '0'
                                )}
                            </div>
                            <p className="text-white/90 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
