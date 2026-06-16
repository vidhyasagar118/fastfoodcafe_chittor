import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "./ProductCard";
import "./ProductsSection.css";
import { useNavigate } from "react-router-dom";
const TrendingProducts = ({ limit = true }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/stats/trending")
      .then((res) => {
        setProducts(
          limit ? res.data.slice(0, 4) : res.data
        );
      })
      .catch(console.log);
  }, []);

  return (
    <div className="products-section">
      <div className="section-header">
          <div className="category-header">
        <h2>🔥 Trending Products</h2>

        {limit && (
          <button  className="viewbtn"  onClick={() => navigate("/featured")}>
            View All
          </button>
        )}
        </div>
      </div>

      <div className="products-grid">
        {products.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;