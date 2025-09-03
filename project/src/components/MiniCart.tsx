// src/components/MiniCart.tsx
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="p-4 text-gray-600">Your cart is empty</p>
      ) : (
        <div className="p-4 flex flex-col space-y-4 overflow-y-auto h-full">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 mt-1 px-2 py-1 border rounded"
                />
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-900">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}

          <div className="mt-auto border-t pt-4">
            <p className="font-bold text-lg mb-2">Total: ${total.toFixed(2)}</p>
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
