import React from 'react';
import { useStore } from '../../store/useStore';
import { Package, MapPin, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Overview() {
    const { user, orders } = useStore();

    // Mock user orders if store doesn't have them yet (or logic to fetch)
    const recentOrders = orders?.slice(0, 2) || [];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F0EFEC]">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                            <Package size={24} />
                        </div>
                        <Link to="/account/orders" className="text-xs font-bold text-secondary hover:text-primary uppercase tracking-wider">View All</Link>
                    </div>
                    <div className="space-y-1">
                        <p className="text-secondary text-sm font-medium">Total Orders</p>
                        <p className="text-3xl font-display font-medium text-primary">{orders?.length || 0}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F0EFEC]">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-green-50 rounded-full text-green-600">
                            <MapPin size={24} />
                        </div>
                        <Link to="/account/addresses" className="text-xs font-bold text-secondary hover:text-primary uppercase tracking-wider">Manage</Link>
                    </div>
                    <div className="space-y-1">
                        <p className="text-secondary text-sm font-medium">Default Address</p>
                        <p className="text-sm font-medium text-primary truncate max-w-[200px]">
                            {user?.address || 'No default address set'}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F0EFEC]">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                            <User size={24} />
                        </div>
                        <Link to="/account/details" className="text-xs font-bold text-secondary hover:text-primary uppercase tracking-wider">Edit</Link>
                    </div>
                    <div className="space-y-1">
                        <p className="text-secondary text-sm font-medium">Profile Status</p>
                        <p className="text-sm font-medium text-primary">Active Member</p>
                    </div>
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#F0EFEC] p-8">
                <h2 className="text-xl font-display font-medium text-primary mb-6">Recent Orders</h2>
                {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                        {recentOrders.map(order => (
                            <div key={order.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                <div>
                                    <p className="font-bold text-primary">#{order.id.slice(-6).toUpperCase()}</p>
                                    <p className="text-sm text-secondary">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider">{order.status || 'Processing'}</span>
                                    <ChevronRight size={18} className="text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-secondary mb-4">You haven't placed any orders yet.</p>
                        <Link to="/shop" className="btn-primary inline-flex items-center gap-2">Start Shopping <ChevronRight size={16} /></Link>
                    </div>
                )}
            </div>
        </div>
    );
}
