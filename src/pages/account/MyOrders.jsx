
import React, { useState } from 'react';
import { Check, Clock, X, Eye } from 'lucide-react';

export default function MyOrders() {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const mockOrders = [
        {
            id: '#ORD-7782',
            date: '12th Oct 2025',
            status: 'Delivered',
            total: 45999,
            items: [
                { name: 'Haven Modular Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
                { name: 'Velvet Cushion', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }
            ]
        },
        {
            id: '#ORD-7781',
            date: '28th Sep 2025',
            status: 'Processing',
            total: 12499,
            items: [
                { name: 'Oslo Armchair', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }
            ]
        },
        {
            id: '#ORD-7780',
            date: '15th Aug 2025',
            status: 'Delivered',
            total: 8999,
            items: [
                { name: 'Modern Table Lamp', image: 'https://images.unsplash.com/photo-1507473888900-52e1adad5481?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }
            ]
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-serif font-bold">Order History</h3>
            </div>

            <div className="divide-y divide-gray-100">
                {mockOrders.map((order) => (
                    <div key={order.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-bold text-primary">{order.id}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">{order.date}</p>
                            <div className="flex -space-x-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm relative z-0 hover:z-10 transition-all">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                            <span className="font-bold font-serif text-lg">₹{order.total.toLocaleString()}</span>
                            <button
                                onClick={() => setSelectedOrder(order)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Eye size={16} /> View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-serif font-bold">Order Details {selectedOrder.id}</h3>
                            <button onClick={() => setSelectedOrder(null)} className="hover:text-red-500">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Status */}
                            <div className="flex items-center gap-2">
                                {selectedOrder.status === 'Delivered' ? (
                                    <Check className="text-green-500" />
                                ) : (
                                    <Clock className="text-yellow-500" />
                                )}
                                <span className="font-bold">{selectedOrder.status}</span>
                                <span className="text-gray-400 mx-2">•</span>
                                <span className="text-gray-500">{selectedOrder.date}</span>
                            </div>

                            {/* Items */}
                            <div className="space-y-4">
                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: 1</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-gray-100" />

                            {/* Address Mock */}
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 mb-2">Shipping Address</h4>
                                <p className="text-gray-600 text-sm">
                                    Alex Johnson<br />
                                    123 Luxury Lane, Apartment 4B<br />
                                    Mumbai, Maharashtra, 400001
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                <span className="font-bold text-gray-700">Total Paid</span>
                                <span className="font-serif font-bold text-xl text-primary">₹{selectedOrder.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
