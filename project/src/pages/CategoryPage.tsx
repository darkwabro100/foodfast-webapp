import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Star } from 'lucide-react';
import FoodCard from '../components/FoodCard';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');
  const [rating, setRating] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  // Mock data
  const getCategoryData = (category: string) => {
    const allItems = {
      pizza: [
        { id: 1, name: 'Margherita Pizza', image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400', price: 18.99, restaurant: 'Pizza Palace', rating: 4.8, description: 'Fresh mozzarella, tomato sauce, basil' },
        { id: 2, name: 'Pepperoni Pizza', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', price: 21.99, restaurant: 'Pizza Palace', rating: 4.7, description: 'Pepperoni, mozzarella, tomato sauce' },
        { id: 3, name: 'Quattro Stagioni', image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400', price: 24.99, restaurant: 'Italian Corner', rating: 4.9, description: 'Ham, mushrooms, artichokes, olives' },
        { id: 4, name: 'Hawaiian Pizza', image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400', price: 19.99, restaurant: 'Pizza Palace', rating: 4.5, description: 'Ham, pineapple, mozzarella' }
      ],
      burgers: [
        { id: 5, name: 'Classic Cheeseburger', image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=400', price: 12.99, restaurant: 'Burger Street', rating: 4.7, description: 'Beef patty, cheese, lettuce, tomato' },
        { id: 6, name: 'BBQ Bacon Burger', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', price: 15.99, restaurant: 'Burger Street', rating: 4.8, description: 'BBQ sauce, bacon, onion rings' },
        { id: 7, name: 'Veggie Burger', image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400', price: 11.99, restaurant: 'Green Bites', rating: 4.4, description: 'Plant-based patty, avocado, sprouts' }
      ],
      sushi: [
        { id: 8, name: 'Salmon Sashimi', image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400', price: 24.99, restaurant: 'Sushi Master', rating: 4.9, description: 'Fresh salmon, wasabi, soy sauce' },
        { id: 9, name: 'California Roll', image: 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=400', price: 16.99, restaurant: 'Sushi Master', rating: 4.6, description: 'Crab, avocado, cucumber' }
      ]
    };
    return allItems[category as keyof typeof allItems] || [];
  };

  const rawItems = getCategoryData(categoryName || '');
  const restaurants = Array.from(new Set(rawItems.map(item => item.restaurant)));

  // Filter
  const filteredItems = rawItems.filter(item => {
    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'under-15' && item.price < 15) ||
      (priceRange === '15-25' && item.price >= 15 && item.price <= 25) ||
      (priceRange === 'over-25' && item.price > 25);

    const matchesRating = rating === 'all' || item.rating >= parseFloat(rating);
    const matchesRestaurant = selectedRestaurant === 'all' || item.restaurant === selectedRestaurant;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesPrice && matchesRating && matchesRestaurant && matchesSearch;
  });

  // Sort
  const sortedItems = [...filteredItems];
  if (sortBy === 'rating') sortedItems.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'price-low') sortedItems.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') sortedItems.sort((a, b) => b.price - a.price);

  const visibleItems = sortedItems.slice(0, visibleCount);

  // Scroll lên đầu khi filter/sort/search thay đổi
  useEffect(() => {
    setVisibleCount(8);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortBy, priceRange, rating, selectedRestaurant, searchTerm]);

  const categoryTitle = categoryName
    ? categoryName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{categoryTitle}</h1>
          <p className="text-gray-600">Discover the best {categoryName} in your area</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="delivery">Fastest Delivery</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Prices</option>
                <option value="under-15">Under $15</option>
                <option value="15-25">$15 - $25</option>
                <option value="over-25">Over $25</option>
              </select>
            </div>

            {/* Restaurant */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant</label>
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Restaurants</option>
                {restaurants.map(rest => (
                  <option key={rest} value={rest}>{rest}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {visibleItems.length} of {sortedItems.length} results for "{categoryTitle}"
          </p>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Filtered by: {sortBy}</span>
          </div>
        </div>

        {/* Food Items Grid */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleItems.map(item => (
              <div key={item.id}>
                <FoodCard item={item} />
                {/* Star display */}
                <div className="flex items-center mt-1">
                  {Array.from({ length: Math.floor(item.rating) }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters or browse other categories</p>
          </div>
        )}

        {/* Load More */}
        {visibleCount < sortedItems.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Load More Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
