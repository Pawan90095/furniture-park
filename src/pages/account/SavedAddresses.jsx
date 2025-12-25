
import React from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function SavedAddresses() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-soft">
                <h3 className="text-xl font-serif font-bold">Saved Addresses</h3>
                <button className="flex items-center gap-2 text-primary font-bold hover:text-secondary text-sm">
                    <Plus size={18} /> Add New Address
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Default Address */}
                <div className="bg-white p-6 rounded-xl border-2 border-primary shadow-sm relative">
                    <span className="absolute top-4 right-4 bg-primary text-white text-[10px] uppercase font-bold px-2 py-1 rounded">Default</span>
                    <h4 className="font-bold text-lg mb-2">Home</h4>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        Alex Johnson<br />
                        123 Luxury Lane, Apartment 4B<br />
                        Mumbai, Maharashtra, 400001
                    </p>
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                        <button className="hover:text-primary flex items-center gap-1"><Edit size={14} /> Edit</button>
                        <button className="hover:text-red-500 flex items-center gap-1"><Trash2 size={14} /> Delete</button>
                    </div>
                </div>

                {/* Office Address */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-lg mb-2">Office</h4>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        Alex Johnson<br />
                        Tech Park, Building C, Floor 5<br />
                        Bangalore, Karnataka, 560001
                    </p>
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                        <button className="hover:text-primary flex items-center gap-1"><Edit size={14} /> Edit</button>
                        <button className="hover:text-red-500 flex items-center gap-1"><Trash2 size={14} /> Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
