import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "./ProductCard";

const TopRatedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
.then((res) => {
  const sorted = res.data.sort(
    (a,b) => b.rating - a.rating
  );

  setProducts(sorted.slice(0,6));
})
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>⭐ Top Rated</h2>

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

export default TopRatedProducts;