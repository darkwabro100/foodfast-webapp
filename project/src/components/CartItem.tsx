import React from 'react';
import { CartItemType, useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

type Props = {
  item: CartItemType;
};

const CartItem: React.FC<Props> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-500 text-sm">{item.restaurant}</p>
        <p className="text-orange-500 font-semibold">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="p-1 border rounded"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 border rounded"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1 text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
