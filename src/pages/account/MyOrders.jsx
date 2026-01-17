import React from 'react';
import { useStore } from '../../store/useStore';
import { Search, Filter, ArrowRight, Package } from 'lucide-react';

export default function MyOrders() {
    const { orders } = useStore();

    // Mock orders if empty for visualization
    const displayOrders = orders?.length ? orders : [
        { id: 'FP-839210', createdAt: '2025-01-15', total: 69999, status: 'Processing', items: [{ name: 'Nordic Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200' }] },
        { id: 'FP-129384', createdAt: '2024-12-10', total: 12500, status: 'Delivered', items: [{ name: 'Ceramic Vase', image: 'https://images.unsplash.com/photo-1581783342308-f792ca11df53?w=200' }] }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-display font-medium text-primary">Order History</h2>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <input type="text" placeholder="Search orders..." className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#556B2F]" />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <button className="bg-white border border-gray-200 p-2 rounded-lg text-gray-500 hover:text-primary hover:border-gray-300">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {displayOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl p-6 border border-[#F0EFEC] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-gray-100 pb-6 mb-6">
                            <div className="flex gap-4">
                                <div className="p-3 bg-[#F9F8F6] rounded-xl self-start">
                                    <Package size={24} className="text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary">Order #{order.id.includes('FP') ? order.id : `FP-${order.id.slice(-6).toUpperCase()}`}</h3>
                                    <p className="text-secondary text-sm">Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-1">Total Amount</p>
                                    <p className="text-lg font-bold text-primary">₹{order.total.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-1">Status</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Processing' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}
                                    `}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide w-full sm:w-auto">
                                {order.items?.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 min-w-max">
                                        <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-[#F0EFEC]" />
                                        <div>
                                            <p className="text-sm font-medium text-primary">{item.name}</p>
                                            <p className="text-xs text-secondary">Qty: {item.qty || 1}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold text-primary hover:text-[#556B2F] transition-colors whitespace-nowrap">
                                View Details <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
