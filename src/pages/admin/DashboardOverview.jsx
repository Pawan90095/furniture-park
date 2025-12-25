
import React from 'react';
import { useStore } from '../../store/useStore';
import { Tag, ShoppingBag, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-start justify-between border border-gray-100">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </div>
);

const DashboardOverview = () => {
    const products = useStore((state) => state.products);
    const orders = useStore((state) => state.orders) || [];

    // Calculate Stats
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const stats = [
        {
            title: 'Total Sales',
            value: `₹${totalSales.toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-green-500',
        },
        {
            title: 'Total Orders',
            value: totalOrders,
            icon: ShoppingBag,
            color: 'bg-indigo-500',
        },
        {
            title: 'Total Products',
            value: totalProducts,
            icon: Tag,
            color: 'bg-orange-500',
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* Placeholder for Recent Activity possibly */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Welcome Back, Admin</h3>
                <p className="text-gray-600">
                    Use the sidebar navigation to manage products and view customer orders.
                </p>
            </div>
        </div>
    );
};

export default DashboardOverview;
