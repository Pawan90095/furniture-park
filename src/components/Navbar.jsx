import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';
import CartDrawer from './CartDrawer';
// Removed AnimatePresence import as it was unused in the provided efficient code or was causing issues, staying minimal.

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
            <nav className="fixed top-0 w-full bg-[#FFFFFF]/95 backdrop-blur-md z-50 border-b border-[#E6E1D6] transition-all duration-300">
                <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Left: Mobile Menu Trigger */}
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 -ml-2 text-primary hover:bg-[#F9F8F6] rounded-full transition-colors md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Open menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <Link to="/" className="text-2xl font-display font-medium text-primary tracking-tight">
                            Furniture Park.
                        </Link>
                    </div>

                    {/* Center: Desktop Nav (Mega Menu Style) */}
                    <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide text-primary">
                        <Link to="/shop" className="hover:text-[#556B2F] transition-colors relative group py-2">
                            Collections
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#556B2F] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/shop?category=Living Room" className="hover:text-[#556B2F] transition-colors relative group py-2">
                            Living
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#556B2F] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/shop?category=Dining" className="hover:text-[#556B2F] transition-colors relative group py-2">
                            Dining
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#556B2F] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/shop?category=Bedroom" className="hover:text-[#556B2F] transition-colors relative group py-2">
                            Bedroom
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#556B2F] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/about" className="hover:text-[#556B2F] transition-colors relative group py-2">
                            Our Story
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#556B2F] transition-all group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-6 text-primary">
                        <form onSubmit={handleSearch} className="hidden lg:flex items-center relative group" role="search">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-0 group-hover:w-48 focus:w-48 border-b border-transparent group-hover:border-[#E6E1D6] focus:border-[#E6E1D6] py-1 text-sm bg-transparent focus:outline-none transition-all duration-300 placeholder-transparent group-hover:placeholder-gray-400"
                                aria-label="Search products"
                            />
                            <button type="submit" aria-label="Submit search">
                                <Search size={20} className="hover:text-[#556B2F] transition-colors" />
                            </button>
                        </form>

                        <button
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Search"
                        >
                            <Search size={22} />
                        </button>

                        <Link to="/account" className="hover:text-[#556B2F] transition-colors" aria-label="Account">
                            <User size={22} />
                        </Link>

                        <Link to="/wishlist" className="hidden md:block hover:text-[#556B2F] transition-colors" aria-label="Wishlist">
                            <Heart size={22} />
                        </Link>

                        <button
                            onClick={toggleCart}
                            className="flex items-center gap-1 hover:text-[#556B2F] transition-colors relative"
                            aria-label={`Cart with ${cartCount} items`}
                        >
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#556B2F] rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-[#F9F8F6] z-50 flex flex-col p-8 animate-fade-in md:hidden overflow-y-auto">
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-2xl font-display font-medium text-primary">Menu</span>
                            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-2 -mr-2 hover:bg-[#E6E1D6] rounded-full"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSearch} className="mb-10 relative" role="search">
                            <input
                                type="text"
                                placeholder="Search collections..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-[#E6E1D6] rounded-full p-4 pl-12 text-base focus:outline-none focus:border-[#556B2F] transition-colors shadow-sm"
                                aria-label="Search products mobile"
                            />
                            <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Submit search">
                                <Search size={20} />
                            </button>
                        </form>

                        <nav className="flex flex-col space-y-6 text-2xl font-display text-primary">
                            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block">Shop All</Link>
                            <Link to="/shop?category=Living Room" onClick={() => setIsMenuOpen(false)} className="block">Living Room</Link>
                            <Link to="/shop?category=Dining" onClick={() => setIsMenuOpen(false)} className="block">Dining Room</Link>
                            <Link to="/shop?category=Bedroom" onClick={() => setIsMenuOpen(false)} className="block">Bedroom</Link>
                            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block text-[#556B2F]">Our Story</Link>
                            <Link to="/account" onClick={() => setIsMenuOpen(false)} className="text-lg font-sans text-secondary mt-8">My Account</Link>
                        </nav>
                    </div>
                )}
            </nav>
            <div className="h-20"></div>
        </>
    );
}
