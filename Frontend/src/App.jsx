// App.jsx
import Header from "./components/header"; // adjust path if needed
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import People from "./pages/People";
import LoginForm from "./pages/Loginuser";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/register";
import ProfilePage from "./pages/myProfile";
import AddProduct from "./components/addproduct";
const App = () => {
  return (
    <div>

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/people" element={<People />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/Addproduct" element={<AddProduct />} />
      </Routes>
    </Router>


      
    </div>
  )
}

export default App
