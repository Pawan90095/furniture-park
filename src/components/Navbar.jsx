import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';
import CartDrawer from './CartDrawer';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cart, toggleCart } = useCart();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <CartDrawer />
            <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-200">
                <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center gap-4">
                        <button
                            className="md:hidden text-black"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu size={24} />
                        </button>
                        <Link to="/" className="text-xl font-bold tracking-tight text-black flex items-center gap-2">
                            ALLMODERN
                        </Link>
                    </div>

                    {/* Center: Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-900">
                        <Link to="/shop" className="hover:text-gray-500 transition-colors">Furniture</Link>
                        <Link to="/shop?category=Outdoor" className="hover:text-gray-500 transition-colors">Outdoor</Link>
                        <Link to="/shop?category=Lighting" className="hover:text-gray-500 transition-colors">Lighting</Link>
                        <Link to="/shop?category=Rugs" className="hover:text-gray-500 transition-colors">Rugs</Link>
                        <Link to="/shop?sort=newest" className="hover:text-gray-500 transition-colors text-red-600">New</Link>
                        <Link to="/shop?sort=sale" className="hover:text-gray-500 transition-colors text-red-600">Sale</Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-6">
                        {/* Search Desktop */}
                        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-48 border-b border-gray-300 py-1 text-sm focus:outline-none focus:border-black placeholder-gray-500 transition-all font-light"
                            />
                            <Search size={16} className="absolute right-0 text-gray-500" />
                        </form>

                        <Link to="/account" className="text-gray-900 hover:text-gray-500 transition-colors">
                            <span className="hidden md:inline text-xs font-medium">Account</span>
                            <User size={20} className="md:hidden" />
                        </Link>

                        <button onClick={toggleCart} className="text-gray-900 hover:text-gray-500 transition-colors flex items-center gap-1">
                            <ShoppingBag size={20} />
                            <span className="text-xs font-bold">{cartCount}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Search & Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 animate-fade-in md:hidden">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-bold">Menu</span>
                            <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSearch} className="mb-8 relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                            />
                            <Search size={18} className="absolute right-3 top-3 text-gray-400" />
                        </form>

                        <nav className="flex flex-col space-y-4 text-lg font-medium">
                            <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Furniture</Link>
                            <Link to="/shop?category=Outdoor" onClick={() => setIsMenuOpen(false)}>Outdoor</Link>
                            <Link to="/shop?category=Lighting" onClick={() => setIsMenuOpen(false)}>Lighting</Link>
                            <Link to="/shop?category=Rugs" onClick={() => setIsMenuOpen(false)}>Rugs</Link>
                            <Link to="/account" onClick={() => setIsMenuOpen(false)}>Account</Link>
                        </nav>
                    </div>
                )}
            </nav>
            {/* Spacer for fixed navbar */}
            <div className="h-16"></div>
        </>
    );
}
