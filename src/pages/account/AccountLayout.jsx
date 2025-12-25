
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { LayoutDashboard, ShoppingBag, MapPin, User, LogOut } from 'lucide-react';

export default function AccountLayout() {
    const { user, logoutUser } = useStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    if (!user) return null; // Should be handled by ProtectedRoute but extra safety

    const navItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/account', end: true },
        { name: 'My Orders', icon: ShoppingBag, path: '/account/orders' },
        { name: 'Saved Addresses', icon: MapPin, path: '/account/addresses' },
        { name: 'Account Details', icon: User, path: '/account/details' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-serif font-bold italic text-primary">My Account</h1>
                    <p className="text-gray-500 mt-2">Welcome back, {user.name}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                            <nav className="flex flex-col">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        end={item.end}
                                        className={({ isActive }) =>
                                            `flex items-center space-x-3 px-6 py-4 transition-colors ${isActive
                                                ? 'bg-primary text-white border-l-4 border-secondary'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                            }`
                                        }
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.name}</span>
                                    </NavLink>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 px-6 py-4 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors border-t border-gray-100 text-left w-full"
                                >
                                    <LogOut size={20} />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
