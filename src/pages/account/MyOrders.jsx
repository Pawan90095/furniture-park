import { useStore } from '../../store/useStore';
import { Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Check, Clock, X, Eye } from 'lucide-react';

export default function MyOrders() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { orders, fetchMyOrders, loading } = useStore();

    useEffect(() => {
        fetchMyOrders();
    }, []);

    if (loading && orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-soft">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-serif font-bold">Order History</h3>
            </div>

            <div className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No orders found.
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-bold text-primary">#{order._id.slice(-6).toUpperCase()}</span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{new Date(order.createdAt).toLocaleDateString()}</p>
                                <div className="flex -space-x-4">
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm relative z-0 hover:z-10 transition-all">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                <span className="font-bold font-serif text-lg">₹{order.totalPrice.toLocaleString()}</span>
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <Eye size={16} /> View Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-serif font-bold">Order Details #{selectedOrder._id.slice(-6).toUpperCase()}</h3>
                            <button onClick={() => setSelectedOrder(null)} className="hover:text-red-500">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Status */}
                            <div className="flex items-center gap-2">
                                {selectedOrder.isDelivered ? (
                                    <Check className="text-green-500" />
                                ) : (
                                    <Clock className="text-yellow-500" />
                                )}
                                <span className="font-bold">{selectedOrder.isDelivered ? 'Delivered' : 'Processing'}</span>
                                <span className="text-gray-400 mx-2">•</span>
                                <span className="text-gray-500">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                            </div>

                            {/* Items */}
                            <div className="space-y-4">
                                {selectedOrder.orderItems.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-gray-100" />

                            {/* Address Mock */}
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 mb-2">Shipping Address</h4>
                                <p className="text-gray-600 text-sm">
                                    {selectedOrder.shippingAddress.address}<br />
                                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}<br />
                                    {selectedOrder.shippingAddress.country}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                <span className="font-bold text-gray-700">Total Paid</span>
                                <span className="font-serif font-bold text-xl text-primary">₹{selectedOrder.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
