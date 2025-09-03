import React, { useState } from 'react';
import { Search, Star, Clock, Truck } from 'lucide-react';
import FoodCategories from '../components/FoodCategories';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredRestaurants = [
    { id: 1, name: "Pizza Palace", image: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.8, deliveryTime: "25-35 min", deliveryFee: "Free", cuisine: "Italian" },
    { id: 2, name: "Burger Street", image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.6, deliveryTime: "20-30 min", deliveryFee: "$2.99", cuisine: "American" },
    { id: 3, name: "Sushi Master", image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.9, deliveryTime: "30-45 min", deliveryFee: "$3.99", cuisine: "Japanese" }
  ];

  const popularItems = [
    { id: 1, name: "Margherita Pizza", image: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400", price: 18.99, restaurant: "Pizza Palace", rating: 4.8, description: "Fresh mozzarella, tomato sauce, basil" },
    { id: 2, name: "Classic Cheeseburger", image: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=400", price: 12.99, restaurant: "Burger Street", rating: 4.7, description: "Beef patty, cheese, lettuce, tomato" },
    { id: 3, name: "Salmon Sashimi", image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400", price: 24.99, restaurant: "Sushi Master", rating: 4.9, description: "Fresh salmon, wasabi, soy sauce" },
    { id: 4, name: "Caesar Salad", image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400", price: 9.99, restaurant: "Green Garden", rating: 4.5, description: "Romaine lettuce, parmesan, croutons" }
  ];

  // --- Lọc theo searchQuery ---
  const filteredRestaurants = featuredRestaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredItems = popularItems.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Delicious Food, Delivered Fast</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Order from your favorite restaurants and get it delivered in minutes
            </p>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FoodCategories />

        {/* Featured Restaurants */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Restaurants</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
        </section>

        {/* Popular Items */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Popular Near You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map(i => <FoodCard key={i.id} item={i} />)}
          </div>
        </section>

        {/* Delivery Info */}
        <section className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="opacity-90">Average delivery time: 30 minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Orders</h3>
              <p className="opacity-90">Real-time tracking for all orders</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="opacity-90">Only the best restaurants</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
