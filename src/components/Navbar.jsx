import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaUserShield,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="navbar">

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className="logo-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="logo"
        />
        <h1>Chittorgharh FastFlash</h1>
      </div>

      <div className="nav-icons">

        <div
          className="mobile-search"
          onClick={() => navigate("/allproducts")}
        >
          <FaSearch />
        </div>

        <Link to="/login">
          <FaUser size={20} />
        </Link>

        <Link to="/cart" className="cart-link">
          <FaShoppingCart size={22} />
          <span>{totalItems}</span>
        </Link>

      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link
          to="/allproducts"
          onClick={() => setMenuOpen(false)}
        >
          Products
        </Link>

        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>

        <Link
          to="/orders"
          onClick={() => setMenuOpen(false)}
        >
          Orders
        </Link>

        <Link
          to="/adminlogin"
          onClick={() => setMenuOpen(false)}
        >
          <FaUserShield />
        </Link>
      </div>

      <button
        className="desktop-search-btn"
        onClick={() => navigate("/allproducts")}
      >
        Search Now
      </button>

    </nav>
  );
};

export default Navbar;