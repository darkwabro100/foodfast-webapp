// components/FoodCard.tsx
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast'; // Nếu muốn thông báo toast

export type FoodItemType = {
  id: number;
  name: string;
  image: string;
  price: number;
  restaurant: string;
  description: string;
  rating: number;
};

type Props = {
  item: FoodItemType;
};

const FoodCard: React.FC<Props> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 }); // luôn thêm quantity
    toast.success('Đã thêm món thành công!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex-1">{item.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-orange-500 font-bold">${item.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
