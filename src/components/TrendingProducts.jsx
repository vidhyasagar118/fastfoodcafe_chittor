import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "./ProductCard";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/stats/bestseller")
      .then((res) =>
        setProducts(res.data.slice(0, 4))
      )
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>🔥 Trending Products</h2>

      <div className="products-grid">
        {products.map((item) => (
          <ProductCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;