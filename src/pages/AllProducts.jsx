import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api";
const AllProducts = () => {

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

  return (
    <div className="container">

      <h1>All Products</h1>

      {categories.map((cat) => (

        <div key={cat._id}>

          <h2>{cat.name}</h2>

          <div className="products-grid">

            {products
              .filter(
                (p) => p.category === cat.name
              )
              .map((item) => (

                <ProductCard
                  key={item._id}
                  item={item}
                />

              ))}

          </div>

        </div>

      ))}

    </div>
  );
};

export default AllProducts;