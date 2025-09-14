import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    if (storedUser) {
      fetchUserProducts(storedUser.userId);
    }
  }, []);

  const fetchUserProducts = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${userId}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white w-96 rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center transform hover:scale-105 animate-fadeInUp"
            >
              <img
                src={
                  product.images && product.images.length > 0
                    ? `http://localhost:5000/allImages/${product.images[0]}`
                    : "https://via.placeholder.com/200"
                }
                alt={product.name}
                className="w-40 h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.description}</p>
              <span className="text-indigo-600 font-bold text-lg mb-4">${product.price}</span>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
