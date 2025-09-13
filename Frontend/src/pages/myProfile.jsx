import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    if (storedUser) {
      setUser(storedUser);
      fetchUserProducts(storedUser.userId);
    }
  }, []);

  const fetchUserProducts = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${userId}`);
      setProducts(res.data); // assuming your API returns an array of products
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <div className="min-h-screen bg-gray-100 px-20 pb-10">
      {/* Cover Image */}
      <div className="w-full relative">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413"
          alt="Cover"
          className="w-full h-60 object-cover rounded-lg"
        />
        {/* Profile Avatar */}
        <div className="absolute -bottom-16 ml-20 w-32 h-32 flex items-center justify-center rounded-full border-4 border-white shadow-lg bg-blue-500 text-white text-4xl font-bold">
          {getInitial(user?.name)}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 flex flex-col items-start ml-20">
        <h1 className="text-2xl font-bold text-gray-800">{user?.name || "User"}</h1>
        <div className="mt-4 flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            onClick={() => navigate("/Addproduct")}
          >
            Add Product
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300">
            Message
          </button>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-xl shadow ml-20">
        <h2 className="text-lg font-semibold text-gray-800">About</h2>
        <p className="mt-2 text-gray-600">
          Passionate developer with experience in building scalable web apps and
          modern UI/UX design. I enjoy learning new technologies and
          collaborating on exciting projects.
        </p>
      </div>

      {/* User Products */}
      <div className="mt-10 ml-20">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow">
                  <img
                  src={`http://localhost:5000/allImages/${product.images[0]}`}
                  alt={product.name}
                  className="mt-2 w-full h-60 object-cover rounded"
                />
                <div>

                </div>
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-700 font-bold mt-2">${product.price}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => navigate(`/update-product/${product._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={async () => {
                      try {
                        await axios.delete(`http://localhost:5000/products/delete/${product._id}`);
                        setProducts(products.filter((p) => p._id !== product._id));
                      } catch (err) {
                        console.error("Delete failed", err);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
