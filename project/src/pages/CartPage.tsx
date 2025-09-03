// pages/CartPage.tsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, checkout } = useCart();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Giỏ hàng trống', 'error');
      return;
    }
    checkout();
    showToast('Thanh toán thành công', 'success');
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    showToast('Đã xóa món', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Giỏ hàng</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              🛒
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Giỏ hàng trống</h3>
            <p className="text-gray-600">Hãy thêm món bạn muốn vào giỏ nhé!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center bg-white shadow rounded-xl overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover flex-shrink-0"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <p className="text-sm text-gray-600 mt-1">Nhà hàng: {item.restaurant}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-800 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          className="text-red-500 hover:text-red-600 font-semibold"
                          onClick={() => handleRemove(item.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end items-center space-x-4">
              <span className="text-xl font-bold text-gray-800">
                Tổng: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </span>
              <button
                onClick={handleCheckout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Thanh toán
              </button>
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white transition-all
            ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default CartPage;
