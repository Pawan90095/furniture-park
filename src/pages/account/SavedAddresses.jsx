import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SavedAddresses() {
    const { user } = useStore();
    // Assuming store might eventually support multiple addresses, for now using user profile address + mocks
    const [addresses] = useState([
        { id: 1, type: 'Default', name: user?.name, street: user?.address || '123 Luxury Lane', city: 'Mumbai', zip: '400001', phone: user?.phone || '9876543210' },
        { id: 2, type: 'Work', name: user?.name, street: 'Corporate Park, Tower A', city: 'Mumbai', zip: '400050', phone: user?.phone }
    ]);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-medium text-primary">Saved Addresses</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2C2C2C] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#556B2F] transition-colors">
                    <Plus size={16} />
                    <span>Add New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <motion.div
                        key={addr.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-2xl border border-[#F0EFEC] shadow-sm relative group"
                    >
                        {addr.type === 'Default' && (
                            <span className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Default</span>
                        )}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-[#F9F8F6] rounded-full text-secondary">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-primary">{addr.type} Address</h4>
                                <p className="text-secondary text-sm">{addr.name}</p>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 mb-6 pl-14">
                            <p>{addr.street}</p>
                            <p>{addr.city}, {addr.zip}</p>
                            <p>Phone: {addr.phone}</p>
                        </div>
                        <div className="flex gap-3 pl-14 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button className="text-xs font-bold text-primary hover:text-[#556B2F] flex items-center gap-1">
                                <Edit2 size={12} /> Edit
                            </button>
                            <span className="text-gray-300">|</span>
                            <button className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1">
                                <Trash2 size={12} /> Remove
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
