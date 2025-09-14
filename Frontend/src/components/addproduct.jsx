import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: 1,
    category: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState("");

  // Get userId from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("LoggedInUser"));
    if (user?.userId) setUserId(user.userId);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Generate image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        setMessage("User not logged in");
        return;
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("category", formData.category);
      data.append("userId", Number(userId));

      formData.images.forEach((file) => {
        data.append("images", file);
      });

      const res = await axios.post(
        "http://localhost:5000/create/add-product",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(res.data.message || "Product added successfully");

      // Clear form and previews
      setFormData({ name: "", description: "", price: "", quantity: 1, category: "", images: [] });
      setImagePreviews([]);

      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to add product");
    }
  };

  

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-20">
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 w-full max-w-md transform hover:scale-[1.02] animate-fadeInUp">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            className="w-full text-gray-700"
          />
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap mt-3 gap-3">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx}`}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-300"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition duration-200 font-semibold"
        >
          Add Product
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-6 text-center font-medium ${
            message.includes("Failed") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  </div>
);
};

export default AddProduct;
