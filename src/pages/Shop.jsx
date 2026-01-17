import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/ui/EmptyState';
// Added ChevronDown for collapsible filters
import { Filter, Search, X, PackageOpen, ChevronDown, Check } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Dining', 'Office', 'Lighting', 'Decor', 'Outdoor'];
const COLORS = ['#000000', '#FFFFFF', '#808080', '#A52A2A', '#D2B48C', '#0000FF']; // Simple color mock
const SORT_OPTIONS = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
];

export default function Shop() {
    const products = useStore((state) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();

    // URL Params
    const categoryParam = searchParams.get('category') || 'All';
    const queryParam = searchParams.get('q') || '';

    // States
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    const [sortBy, setSortBy] = useState('recommended');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Sync state
    useEffect(() => {
        if (categoryParam) setSelectedCategory(categoryParam);
    }, [categoryParam]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat === 'All') setSearchParams({});
        else setSearchParams({ category: cat });
        setMobileFiltersOpen(false);
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchQuery = queryParam
            ? product.name.toLowerCase().includes(queryParam.toLowerCase()) ||
            (product.description || '').toLowerCase().includes(queryParam.toLowerCase())
            : true;
        return matchCategory && matchQuery;
    }).sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0; // recommended (default order)
    });

    return (
        <div className="pt-20 min-h-screen bg-background">
            {/* 1. Hero / Header (Editorial Style) */}
            <div className="bg-[#F9F8F6] pt-12 pb-16 px-6 border-b border-[#E6E1D6]">
                <div className="max-w-[1920px] mx-auto">
                    <div className="max-w-4xl">
                        <span className="text-xs font-bold tracking-[0.2em] text-[#556B2F] uppercase mb-4 block">Collections</span>
                        <h1 className="text-4xl md:text-6xl font-display font-medium text-primary mb-6">
                            {queryParam ? `Results for "${queryParam}"` : (selectedCategory === 'All' ? 'All Furniture' : selectedCategory)}
                        </h1>
                        {!queryParam && (
                            <p className="text-secondary text-lg max-w-2xl leading-relaxed">
                                Curated pieces for the modern home. Designed with purpose, crafted with care, and built to last a lifetime.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* 2. Sticky Sidebar (Desktop) */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-32 space-y-8">
                            {/* Categories */}
                            <div>
                                <h3 className="font-sans font-bold text-sm text-primary uppercase tracking-wider mb-4">Category</h3>
                                <div className="space-y-1">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => handleCategoryChange(cat)}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${selectedCategory === cat
                                                    ? 'font-bold text-primary bg-[#F9F8F6]'
                                                    : 'text-secondary hover:text-primary hover:bg-[#F9F8F6]/50'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <h3 className="font-sans font-bold text-sm text-primary uppercase tracking-wider mb-4">Sort By</h3>
                                <div className="space-y-1">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setSortBy(opt.value)}
                                            className="flex items-center w-full text-left px-3 py-2 text-sm text-secondary hover:text-primary transition-colors"
                                        >
                                            <div className={`w-4 h-4 rounded-full border border-gray-300 mr-3 flex items-center justify-center ${sortBy === opt.value ? 'border-primary' : ''}`}>
                                                {sortBy === opt.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                                            </div>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range (Mock) */}
                            <div>
                                <h3 className="font-sans font-bold text-sm text-primary uppercase tracking-wider mb-4">Price Range</h3>
                                <div className="px-3">
                                    <input type="range" className="w-full accent-[#2C2C2C]" />
                                    <div className="flex justify-between text-xs text-secondary mt-2">
                                        <span>₹0</span>
                                        <span>₹5,00,000+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-8 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <button
                                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                                className="flex items-center gap-2 font-medium text-primary"
                            >
                                <Filter size={20} />
                                <span>Filter & Sort</span>
                            </button>
                            <span className="text-sm text-secondary">{filteredProducts.length} Items</span>
                        </div>

                        {/* Mobile Filters Drawer */}
                        {mobileFiltersOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="lg:hidden bg-[#F9F8F6] p-6 rounded-xl mb-8 space-y-6 overflow-hidden"
                            >
                                <div>
                                    <h4 className="font-bold text-sm mb-3">Categories</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => handleCategoryChange(cat)}
                                                className={`px-4 py-2 text-sm rounded-full border transition-colors ${selectedCategory === cat
                                                        ? 'bg-primary text-white border-primary'
                                                        : 'bg-white text-secondary border-gray-200'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Results Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <EmptyState
                                icon={PackageOpen}
                                title="No matching pieces found"
                                description="Try adjusting your filters or search terms to find what you're looking for."
                                actionText="View All Furniture"
                                onAction={() => {
                                    setSearchParams({});
                                    setSelectedCategory('All');
                                }}
                            />
                        )}

                        {/* Pagination Mock */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-20 flex justify-center">
                                <button className="btn-outline px-12">Load More Products</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
