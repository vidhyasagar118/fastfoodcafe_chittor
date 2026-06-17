import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaUserShield,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(console.log);
  }, []);

  const suggestions =
    search.trim() === ""
      ? []
      : products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <nav className="navbar">

      {/* Mobile Menu */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Logo */}
      <div className="logo-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="logo"
        />
        <h1>Chittorgharh FastFlash</h1>
      </div>

      {/* Search */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search Pizza, Burger..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FaSearch className="search-icon" />

        {suggestions.length > 0 && (
          <div className="search-suggestions">

            {suggestions.slice(0, 8).map((item) => (
              <div
                key={item._id}
                className="suggestion-item"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  setSearch("");
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Icons */}
      <div className="nav-icons">

        <Link to="/login">
          <FaUser size={20} />
        </Link>

        <Link to="/cart" className="cart-link">
          <FaShoppingCart size={22} />
          <span>{totalItems}</span>
        </Link>

      </div>

      {/* Mobile Menu Links */}
      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
        >
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

    </nav>
  );
};

export default Navbar;