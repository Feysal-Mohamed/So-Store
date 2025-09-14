import React, { useState } from "react";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Iphone 16",
      category: "smart phone",
      price: 1600,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Macbook",
      category: "laptops",
      price: 180,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const increment = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item));
  };

  const decrement = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? {...item, quantity: Math.max(item.quantity - 1, 1)} : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow p-6 flex gap-6">
        
        {/* Product List */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-purple-600">{item.category}</p>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm">Remove</button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decrement(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increment(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <div className="text-right">
                  <p className="font-bold">${item.price}</p>
                  <p className="font-bold">${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-80 p-4 border-l border-gray-200">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <p className="flex justify-between"><span>Items</span> <span>{totalItems}</span></p>
          <div className="mt-4">
            <label className="block mb-1">Shipping</label>
            <select className="w-full border p-2 rounded">
              <option>Choose delivery option</option>
              <option>Standard - $10</option>
              <option>Express - $20</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block mb-1">Promo Code</label>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter your code" className="flex-1 border p-2 rounded"/>
              <button className="px-4 py-2 bg-red-400 text-white rounded">APPLY</button>
            </div>
          </div>
          <div className="mt-6 flex justify-between font-bold text-lg">
            <span>Total Cost</span>
            <span>${totalCost}</span>
          </div>
          <button className="mt-4 w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
