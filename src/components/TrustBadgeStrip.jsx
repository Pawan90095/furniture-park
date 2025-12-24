import React from 'react';
import { Shield, Truck, Award, CreditCard, Lock, CheckCircle } from 'lucide-react';

export default function TrustBadgeStrip({ variant = 'default' }) {
    const badges = [
        {
            icon: Shield,
            title: '10-Year Warranty',
            subtitle: 'On all products',
        },
        {
            icon: Truck,
            title: 'Free Delivery',
            subtitle: 'On orders over ₹10,000',
        },
        {
            icon: Award,
            title: 'Premium Quality',
            subtitle: 'Handcrafted in India',
        },
        {
            icon: CheckCircle,
            title: '30-Day Returns',
            subtitle: 'Hassle-free policy',
        },
    ];

    const paymentMethods = [
        { name: 'Visa', logo: '💳' },
        { name: 'Mastercard', logo: '💳' },
        { name: 'UPI', logo: '📱' },
        { name: 'PayTM', logo: '💰' },
        { name: 'Google Pay', logo: 'G' },
    ];

    if (variant === 'payment') {
        return (
            <div className="bg-gray-50 border-t border-b border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-2">
                            <Lock size={18} className="text-green-600" />
                            <span className="text-sm font-bold text-gray-700">
                                100% Secure Checkout
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-xs text-gray-500 font-medium">
                                We Accept:
                            </span>
                            {paymentMethods.map((method, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-center w-12 h-8 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:border-primary transition-colors"
                                    title={method.name}
                                >
                                    {method.logo}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border-t border-b border-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {badges.map((badge, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center space-y-2 group"
                        >
                            <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                <badge.icon size={24} className="text-secondary" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900">
                                    {badge.title}
                                </p>
                                <p className="text-xs text-gray-500">{badge.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
