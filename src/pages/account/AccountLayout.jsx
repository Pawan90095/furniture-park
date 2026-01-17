import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Package, MapPin, User, Heart, LogOut,
    Settings, CreditCard, ChevronRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useToast } from '../../context/ToastContext';

export default function AccountLayout() {
    const { logoutUser, user } = useStore();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        toast.success("Logged out successfully");
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/account', end: true },
        { icon: Package, label: 'My Orders', path: '/account/orders' },
        { icon: MapPin, label: 'Addresses', path: '/account/addresses' },
        { icon: User, label: 'Account Details', path: '/account/details' },
        // Wishlist is usually a top-level page, but can be here too. 
        // We'll keep it external or link to it.
    ];

    return (
        <div className="pt-24 min-h-screen bg-[#F9F8F6] pb-24">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">

                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E6E1D6] pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-medium text-primary mb-2">My Account</h1>
                        <p className="text-secondary text-lg">Welcome back, <span className="font-medium text-primary">{user?.name}</span></p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <nav className="bg-white rounded-2xl shadow-sm border border-[#F0EFEC] overflow-hidden sticky top-32">
                            <ul className="divide-y divide-gray-100">
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            end={item.end}
                                            className={({ isActive }) => `
                                                w-full flex items-center justify-between p-5 transition-all
                                                ${isActive
                                                    ? 'bg-[#2C2C2C] text-white'
                                                    : 'text-secondary hover:bg-gray-50 hover:text-primary'}
                                            `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <item.icon size={20} className={({ isActive }) => isActive ? 'text-white' : 'text-gray-400'} />
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <ChevronRight size={16} className="opacity-50" />
                                        </NavLink>
                                    </li>
                                ))}
                                <li>
                                    <NavLink
                                        to="/wishlist"
                                        className="w-full flex items-center justify-between p-5 text-secondary hover:bg-gray-50 hover:text-primary transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Heart size={20} className="text-gray-400" />
                                            <span className="font-medium">Wishlist</span>
                                        </div>
                                        <ChevronRight size={16} className="opacity-50" />
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Outlet />
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
