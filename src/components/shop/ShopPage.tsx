import { useState } from 'react';
import { ProductGrid } from '../products/ProductGrid';
import { Product } from '../../types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '../../constants';
import { SortOption } from '../../hooks/useProducts';

interface ShopPageProps {
    onProductClick: (product: Product) => void;
}

export function ShopPage({ onProductClick }: ShopPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
    const [sortOption, setSortOption] = useState<SortOption>('newest');

    const categories = CATEGORIES;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Hero Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Shop All Products
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Discover amazing deals on thousands of products
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <div className="flex items-center bg-white rounded-xl shadow-2xl overflow-hidden">
                                <Search className="w-5 h-5 text-gray-400 ml-4" />
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="p-2 hover:bg-gray-100 rounded-full mr-2 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                )}
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 font-semibold hover:shadow-lg transition-all">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                                <SlidersHorizontal className="w-5 h-5 text-gray-400" />
                            </div>

                            {/* Price Range */}
                            <div className="mt-8 space-y-4 mb-8">
                                <h4 className="text-sm font-semibold text-gray-700">Price Range (RM)</h4>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Categories</h4>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category.id
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            {/* Clear Filters */}
                            {(selectedCategory || searchQuery || priceRange.min || priceRange.max) && (
                                <button
                                    onClick={() => {
                                        setSelectedCategory('');
                                        setSearchQuery('');
                                        setPriceRange({ min: '', max: '' });
                                        setSortOption('newest');
                                    }}
                                    className="w-full mt-6 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all font-semibold"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Mobile Filter Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            <span className="font-semibold">Filters</span>
                        </button>

                        {/* Mobile Filters Modal */}
                        {showFilters && (
                            <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:hidden">
                                <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slideUp">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold">Filters</h3>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Categories</h4>
                                            {categories.map((category) => (
                                                <button
                                                    key={category.id}
                                                    onClick={() => {
                                                        setSelectedCategory(category.id);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg transition-all mb-2 ${selectedCategory === category.id
                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {category.name}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Mobile Price Range */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range (RM)</h4>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={priceRange.min}
                                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                                <span className="text-gray-400">-</span>
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={priceRange.max}
                                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Products Grid */}
                    <main className="flex-1">
                        {/* Sort Dropdown */}
                        <div className="flex justify-end mb-6">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="oldest">Oldest First</option>
                                <option value="price-asc">Price: Low - High</option>
                                <option value="price-desc">Price: High - Low</option>
                                <option value="name-asc">Alphabetical: A - Z</option>
                                <option value="name-desc">Alphabetical: Z - A</option>
                            </select>
                        </div>

                        <ProductGrid
                            searchQuery={searchQuery}
                            categoryId={selectedCategory}
                            onProductClick={onProductClick}
                            minPrice={priceRange.min ? Number(priceRange.min) : undefined}
                            maxPrice={priceRange.max ? Number(priceRange.max) : undefined}
                            sortOption={sortOption}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}
