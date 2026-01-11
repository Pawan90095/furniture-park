import React from 'react';
import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

const trustItems = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "On orders over ₹10,000"
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
        <section className="bg-[#F5F1E8] py-12 border-y border-[#2C2C2C]/10">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {trustItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex flex-col items-center text-center space-y-3">
                                <div className="w-14 h-14 bg-[#D4816E] rounded-full flex items-center justify-center">
                                    <Icon className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-[#2C2C2C] mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-[#4A4A4A]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
