import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
    return (
        <section className="py-20 bg-stone-900">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                            Join the Furniture Park Family
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Sign up today and get exclusive access to member-only deals
                        </p>
                    </div>
                    <Link
                        to="/signup"
                        className="flex-shrink-0 bg-secondary text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-primary transition-all flex items-center group"
                    >
                        Get ₹5,000 Off Your First Order
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
