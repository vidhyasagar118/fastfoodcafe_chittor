import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "./ProductCard";
import "./ProductsSection.css";
import { useNavigate } from "react-router-dom";
const TopRatedProducts = ({ limit = true }) => {
  const [products, setProducts] = useState([]);
   const navigate=useNavigate();

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => b.rating - a.rating
        );

        setProducts(
          limit ? sorted.slice(0, 4) : sorted
        );
      })
      .catch(console.log);
  }, []);

  return (
    <div className="products-section">
        <div className="category-header">
      <h2>⭐ Top Rated</h2>
  {limit && (
          <button  className="viewbtn"  onClick={() => navigate("/featured")}>
            View All
          </button>
        )}
        </div>
      <div className="products-grid">
        {products.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedProducts;