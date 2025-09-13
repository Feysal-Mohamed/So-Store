import React, { useEffect, useState } from "react";
import axios from "axios";

const People = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/read/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.userId} className="bg-white shadow-md rounded-lg p-4 text-center">
              <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-2xl font-bold">{user.name[0]}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600 mt-2">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default People;
