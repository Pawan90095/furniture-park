
import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

export default function AccountDetails() {
    const { user } = useStore();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    return (
        <div className="bg-white p-8 rounded-xl shadow-soft max-w-2xl">
            <h3 className="text-xl font-serif font-bold mb-8">Account Details</h3>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-4 mt-4">Change Password</h4>
                    <div className="space-y-4">
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-secondary transition-colors">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
