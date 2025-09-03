import React from 'react';
import { Link } from 'react-router-dom';

const FoodCategories: React.FC = () => {
  const categories = [
    {
      id: 1,
      name: 'Pizza',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=200',
      color: 'bg-red-100'
    },
    {
      id: 2,
      name: 'Burgers',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=200',
      color: 'bg-yellow-100'
    },
    {
      id: 3,
      name: 'Sushi',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=200',
      color: 'bg-green-100'
    },
    {
      id: 4,
      name: 'Mexican',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=200',
      color: 'bg-orange-100'
    },
    {
      id: 5,
      name: 'Chinese',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=200',
      color: 'bg-purple-100'
    },
    {
      id: 6,
      name: 'Desserts',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=200',
      color: 'bg-pink-100'
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map(category => (
          <Link
            to={`/category/${category.name.toLowerCase()}`}
            key={category.id}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-200"
          >
            <div className={`${category.color} rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-200`}>
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FoodCategories;