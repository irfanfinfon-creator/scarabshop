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
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="bg-gray-950 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                            Shop All Products
                        </h1>
                        <p className="text-xl text-white/80 mb-8 font-body">
                            Discover amazing deals on thousands of products
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <div className="flex items-center bg-white rounded-xl shadow-xl overflow-hidden">
                                <Search className="w-5 h-5 text-gray-400 ml-4" />
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 px-4 py-4 text-gray-950 placeholder-gray-400 focus:outline-none font-body"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="p-2 hover:bg-gray-100 rounded-full mr-2 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                )}
                                <button className="bg-red-400 text-white px-6 py-4 font-semibold hover:bg-red-500 transition-all font-body">
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
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-heading font-bold text-gray-950">Filters</h3>
                                <SlidersHorizontal className="w-5 h-5 text-gray-500" />
                            </div>

                            {/* Price Range */}
                            <div className="mt-8 space-y-4 mb-8">
                                <h4 className="text-sm font-semibold text-gray-950 font-body">Price Range (RM)</h4>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none font-body"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none font-body"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-gray-950 mb-3 font-body">Categories</h4>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-all font-body ${selectedCategory === category.id
                                            ? 'bg-red-400 text-white font-semibold'
                                            : 'text-gray-500 hover:bg-gray-100'
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
                                    className="w-full mt-6 px-4 py-2 border-2 border-gray-300 text-gray-500 rounded-lg hover:border-red-400 hover:text-red-400 transition-all font-semibold font-body"
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
                                <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-heading font-bold">Filters</h3>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-950 mb-3 font-body">Categories</h4>
                                            {categories.map((category) => (
                                                <button
                                                    key={category.id}
                                                    onClick={() => {
                                                        setSelectedCategory(category.id);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg transition-all mb-2 font-body ${selectedCategory === category.id
                                                        ? 'bg-red-400 text-white font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {category.name}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Mobile Price Range */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-950 mb-3 font-body">Price Range (RM)</h4>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={priceRange.min}
                                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none font-body"
                                                />
                                                <span className="text-gray-400">-</span>
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={priceRange.max}
                                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none font-body"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="w-full bg-red-400 text-white py-3 rounded-xl font-semibold hover:bg-red-500 font-body"
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
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white font-body"
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