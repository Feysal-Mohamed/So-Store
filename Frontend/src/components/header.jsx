import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check localStorage for logged-in user on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("LoggedInUser");
    setUser(null);
    navigate("/login"); // redirect to login page
  };

  const navClass = ({ isActive }) =>
    isActive ? "text-blue-500 font-bold" : "text-gray-700 hover:text-blue-500";

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="So-Store Logo" className="h-10 w-10" />
          <span className="font-bold text-xl text-gray-800">So-Store</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 font-medium">
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/" className={navClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={navClass}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navClass}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navClass}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/people" className={navClass}>
                People
              </NavLink>
            </li>
             <li>
              <NavLink to="/Cart" className={navClass}>
               <i class="fas fa-shopping-cart mr-2"></i>
              </NavLink>
            </li>
          </ul>

          {/* Right side: Cart + Auth/User */}
          <div className="flex items-center space-x-4 ml-6">
            {/* Cart Icon */}
            <NavLink to="/cart" className="text-gray-700 hover:text-blue-500 text-xl">
              {/* <i className="fas fa-shopping-cart"></i> */}
            </NavLink>

            {/* If user is logged in */}
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Show first letter of user's name */}
                <NavLink to="/ProfilePage">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                   {user?.name ? user.name[0].toUpperCase() : "?"}
                </div>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              // If no user, show Login/Register
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
