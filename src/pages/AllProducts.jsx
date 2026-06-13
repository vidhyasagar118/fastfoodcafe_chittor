import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api";
import "./Allproduct.css"
const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="container">

      <h1 className="headingallproduct">
        {search
          ? `Search Results for "${search}"`
          : "All Products"}
      </h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="🍕 Search Pizza | 🍔 Burger | 🥤 Drinks  and others"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>
      {
  search && filteredProducts.length === 0 && (
    <div className="no-product">
      😔 Product Not Available
    </div>
  )
}
{categories.map((cat) => {
  const filteredCategoryProducts = products.filter(
    (p) =>
      p.category === cat.name &&
      p.name.toLowerCase().includes(
        search.toLowerCase()
      )
  );

  if (filteredCategoryProducts.length === 0)
    return null;

  return (
    <div key={cat._id}>
      <h2>{cat.name}</h2>

      <div className="products-grid">
        {filteredCategoryProducts.map((item) => (
          <ProductCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
})}
    </div>
  );
};

export default AllProducts;