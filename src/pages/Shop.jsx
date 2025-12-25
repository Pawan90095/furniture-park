import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/ui/EmptyState';
import { Filter, Search, X, PackageOpen } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Dining', 'Office'];

export default function Shop() {
    const products = useStore((state) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();

    // Get params from URL
    const categoryParam = searchParams.get('category') || 'All';
    const queryParam = searchParams.get('q') || '';

    // Local state to sync with URL
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);

    // Update URL when local filter changes
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat === 'All') {
            setSearchParams({});
        } else {
            setSearchParams({ category: cat });
        }
    };

    // Sync state if URL changes (e.g. back button)
    useEffect(() => {
        if (categoryParam) setSelectedCategory(categoryParam);
    }, [categoryParam]);

    // Filtering Logic
    const filteredProducts = products.filter(product => {
        const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchQuery = queryParam
            ? product.name.toLowerCase().includes(queryParam.toLowerCase()) || product.description.toLowerCase().includes(queryParam.toLowerCase())
            : true;

        return matchCategory && matchQuery;
    });

    return (
        <div className="pt-32 min-h-screen bg-background pb-24">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                        {queryParam ? `Search Results: "${queryParam}"` : 'Shop Collection'}
                    </h1>
                    {!queryParam && (
                        <p className="text-gray-500 font-light max-w-2xl">
                            Explore our curated selection of premium furniture, designed to bring elegance and functionality to your modern home.
                        </p>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar (Filters) */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-32">
                            {/* Clear Search Button if active */}
                            {queryParam && (
                                <button
                                    onClick={() => setSearchParams({})}
                                    className="w-full flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg mb-6 transition-colors font-medium text-sm"
                                >
                                    <X size={16} />
                                    <span>Clear Search</span>
                                </button>
                            )}

                            <div className="flex items-center space-x-2 font-serif text-xl mb-6 pb-4 border-b border-gray-200">
                                <Filter size={20} />
                                <span>Filters</span>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-bold text-xs uppercase tracking-widest text-secondary mb-4">Category</h4>
                                {CATEGORIES.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'text-gray-600 hover:bg-white hover:shadow-soft'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-500 text-sm">Showing <span className="font-bold text-primary">{filteredProducts.length}</span> results</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <EmptyState
                                icon={PackageOpen}
                                title="No products found"
                                description={`We couldn't find any matches for "${queryParam || selectedCategory}".`}
                                actionText="View All Products"
                                onAction={() => {
                                    setSearchParams({});
                                    setSelectedCategory('All');
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
