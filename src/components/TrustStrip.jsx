import React from 'react';
import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

const trustItems = [
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Free shipping on orders over ₹10,000"
    },
    {
        icon: Shield,
        title: "10-Year Warranty",
        description: "Quality guaranteed"
    },
    {
        icon: CreditCard,
        title: "Secure Payment",
        description: "100% safe transactions"
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Always here to help"
    }
];

export default function TrustStrip() {
    return (
        <section className="bg-gray-50 py-8 border-y border-gray-200">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {trustItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Icon className="text-primary" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                                    <p className="text-xs text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
