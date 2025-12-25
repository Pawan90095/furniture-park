
import React from 'react';
import { useStore } from '../../store/useStore';
import { ShoppingBag, Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Overview() {
    const { user, wishlist } = useStore();

    const stats = [
        { label: 'Total Orders', value: '5', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
        { label: 'Wishlist Items', value: wishlist.length, icon: Heart, color: 'bg-red-100 text-red-600' },
        { label: 'Saved Addresses', value: '2', icon: MapPin, color: 'bg-green-100 text-green-600' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-soft flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-serif font-bold text-primary">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft">
                <h3 className="text-xl font-serif font-bold mb-4">Recent Activity</h3>
                <p className="text-gray-500">You haven't placed any recent orders.</p>
                <Link to="/shop" className="inline-block mt-4 text-secondary font-bold hover:underline">Start Shopping</Link>
            </div>
        </div>
    );
}
