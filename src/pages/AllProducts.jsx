import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import API from "../api";
import "./Allproduct.css";

const AllProducts = () => {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    setSearch(
      searchParams.get("search") || ""
    );
  }, [searchParams]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name
        .toLowerCase()
        .includes(search.toLowerCase())
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
          placeholder="🔍 Search Pizza, Burger, Drinks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {search &&
        filteredProducts.length === 0 && (
          <div className="no-product">
            😔 Product Not Available
          </div>
        )}

      {categories.map((cat) => {
        const categoryProducts =
          products.filter(
            (p) =>
              p.category === cat.name &&
              p.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          );

        if (
          categoryProducts.length === 0
        )
          return null;

        return (
          <div key={cat._id}>
            <h2>{cat.name}</h2>

            <div className="products-grid">
              {categoryProducts.map(
                (item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                  />
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;