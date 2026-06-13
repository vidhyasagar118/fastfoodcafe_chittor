import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
const Navbar = () => {
  const navigate=useNavigate();
  const { totalItems } =
useContext(CartContext);
  return (
    <nav className="navbar">

      <div className="logo-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="logo"
        />

        <h1>Chittorgharh FastFlash</h1>
      </div>

      <div className="nav-links">
        
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/orders">Orders</Link>
        
<Link to="/adminlogin">
  <FaUserShield size={24} />
</Link>
      </div>
                <button className="hero-btn"  onClick={()=>{navigate("allproducts")}}> search now </button>


      <div className="nav-icons">
        <Link to="/login">
          <FaUser size={22} />
        </Link>

      <Link to="/cart">
  <FaShoppingCart size={24} />
  <span>{totalItems}</span>
</Link>
      </div>

    </nav>
  );
};

export default Navbar;