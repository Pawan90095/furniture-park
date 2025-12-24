import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, ChevronDown, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';
import CartDrawer from './CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShopHovered, setIsShopHovered] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { cart, toggleCart } = useCart();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const wishlist = useStore((state) => state.wishlist);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsMenuOpen(false); // Close mobile menu if open
        }
    };

    return (
        <>
            <CartDrawer />
            <nav className="fixed top-0 w-full bg-white z-40 border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                    <div className="flex justify-between items-center h-20 gap-8">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <h1 className="text-2xl font-bold font-serif text-primary tracking-tight">Furniture Park</h1>
                        </Link>

                        {/* Search Bar - Centered & Logic Connected */}
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="What are you looking for?"
                                className="w-full bg-gray-100 border-none rounded-full py-3 pl-12 pr-12 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium text-primary placeholder-gray-500"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            {searchQuery && (
                                <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondary text-white p-1 rounded-full hover:bg-primary transition-colors">
                                    <ArrowRight size={14} />
                                </button>
                            )}
                        </form>

                        {/* Desktop Links & Icons */}
                        <div className="hidden md:flex items-center space-x-8">
                            <div
                                className="relative h-20 flex items-center"
                                onMouseEnter={() => setIsShopHovered(true)}
                                onMouseLeave={() => setIsShopHovered(false)}
                            >
                                <Link to="/shop" className="text-sm font-sans font-medium tracking-wide text-primary hover:text-secondary transition-colors flex items-center gap-1 py-2 lowercase">
                                    shop <ChevronDown size={14} />
                                </Link>

                                {/* Mega Menu Dropdown */}
                                <AnimatePresence>
                                    {isShopHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-16 -left-20 w-[600px] bg-white shadow-luxury rounded-2xl p-8 grid grid-cols-3 gap-8 z-50 border border-gray-100"
                                        >
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 border-b pb-2">By Room</h4>
                                                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                                    <li><Link to="/shop?category=Living Room" className="hover:text-secondary block px-2 py-1 -ml-2 rounded-md hover:bg-gray-50 transition-colors">living room</Link></li>
                                                    <li><Link to="/shop?category=Bedroom" className="hover:text-secondary block px-2 py-1 -ml-2 rounded-md hover:bg-gray-50 transition-colors">bedroom</Link></li>
                                                    <li><Link to="/shop?category=Dining" className="hover:text-secondary block px-2 py-1 -ml-2 rounded-md hover:bg-gray-50 transition-colors">dining room</Link></li>
                                                    <li><Link to="/shop?category=Office" className="hover:text-secondary block px-2 py-1 -ml-2 rounded-md hover:bg-gray-50 transition-colors">home office</Link></li>
                                                </ul>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 border-b pb-2">By Category</h4>
                                                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                                    <li><Link to="/shop?q=sofa" className="hover:text-secondary block px-2 py-1 -ml-2 rounded-md hover:bg-gray-50 transition-colors">sofas</Link></li>
                                                    <li><Link to="/shop?q=bed" className="hover:text-secondary block px-2 py-1 -ml-2 rounded-md hover:bg-gray-50 transition-colors">beds</Link></li>
                                                    <li><Link to="/shop?q=chair" className="hover:text-secondary block px-2 py-1 -ml-2 rounded-md hover:bg-gray-50 transition-colors">chairs</Link></li>
                                                    <li><Link to="/shop?q=lighting" className="hover:text-secondary block px-2 py-1 -ml-2 rounded-md hover:bg-gray-50 transition-colors">lighting</Link></li>
                                                </ul>
                                            </div>
                                            <div className="bg-gray-50 -m-8 p-8 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-bold text-xs uppercase tracking-widest text-secondary mb-4">New Season</h4>
                                                    <p className="text-sm text-gray-500 mb-4">Check out the latest arrivals for 2024.</p>
                                                </div>
                                                <Link to="/shop" className="text-sm font-bold underline decoration-secondary text-primary lowercase">shop all</Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link to="/about" className="text-sm font-sans font-medium tracking-wide text-gray-600 hover:text-primary transition-colors lowercase">about</Link>
                            <Link to="/contact" className="text-sm font-sans font-medium tracking-wide text-gray-600 hover:text-primary transition-colors lowercase">contact</Link>

                            <div className="h-4 w-[1px] bg-gray-300"></div>

                            <div className="flex items-center space-x-6">
                                <Link to="/account" className="text-gray-600 hover:text-primary transition-colors">
                                    <User size={20} />
                                </Link>

                                <Link to="/wishlist" className="relative text-gray-600 hover:text-primary transition-colors">
                                    <Heart size={20} className={wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''} />
                                    {wishlist.length > 0 && (
                                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </Link>

                                <button
                                    onClick={toggleCart}
                                    className="relative text-gray-600 hover:text-primary transition-colors focus:outline-none"
                                >
                                    <ShoppingBag size={20} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-secondary rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-primary"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: '100vh' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white fixed inset-0 z-40 pt-24 px-4 overflow-y-auto"
                        >
                            <div className="flex flex-col space-y-8">
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search products..."
                                        className="w-full bg-gray-100 border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-secondary"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </form>

                                <div className="space-y-6">
                                    <Link to="/" className="text-2xl font-serif text-primary block border-b border-gray-100 pb-2" onClick={() => setIsMenuOpen(false)}>Home</Link>

                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Shop By Category</span>
                                        <div className="space-y-3 pl-4">
                                            <Link to="/shop?category=Living Room" className="block text-lg text-gray-600" onClick={() => setIsMenuOpen(false)}>Living Room</Link>
                                            <Link to="/shop?category=Bedroom" className="block text-lg text-gray-600" onClick={() => setIsMenuOpen(false)}>Bedroom</Link>
                                            <Link to="/shop?category=Dining" className="block text-lg text-gray-600" onClick={() => setIsMenuOpen(false)}>Dining</Link>
                                            <Link to="/shop?category=Office" className="block text-lg text-gray-600" onClick={() => setIsMenuOpen(false)}>Office</Link>
                                        </div>
                                    </div>

                                    <Link to="/about" className="text-2xl font-serif text-primary block border-b border-gray-100 pb-2" onClick={() => setIsMenuOpen(false)}>About</Link>
                                    <Link to="/contact" className="text-2xl font-serif text-primary block border-b border-gray-100 pb-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
