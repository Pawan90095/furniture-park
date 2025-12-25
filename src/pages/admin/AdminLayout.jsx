
import React, { useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Settings } from 'lucide-react';

const AdminLayout = () => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const logout = useStore((state) => state.logout);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/dashboard/products', icon: Package, label: 'Products' },
        { path: '/admin/dashboard/orders', icon: ShoppingCart, label: 'Orders' },
        { path: '/admin/dashboard/settings', icon: Settings, label: 'Site Settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md z-10 hidden md:block">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                </div>
                <nav className="mt-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-6 py-4 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center px-6 py-4 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-auto"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>
            </div>

            {/* Mobile Header (Placeholder for mobile responsiveness) */}

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="container mx-auto px-6 py-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
