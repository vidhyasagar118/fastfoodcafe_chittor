import { useNavigate } from "react-router-dom";
import API from "../api";
import { useEffect, useState } from "react";
import CategorySection from "../components/CategorySection";
import "./Home.css";
import TrendingProducts from "../components/TrendingProducts";
import BestSellerProducts from "../components/BestSellerProducts";
import TopRatedProducts from "../components/TopRatedProducts";
const Home = () => {
    const navigate = useNavigate();

 const [categories, setCategories] = useState([]);
const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts();
  fetchCategories();
}, []);

const fetchCategories = async () => {
  const res = await API.get("/categories");
  setCategories(res.data);
};
const fetchProducts = async () => {
  try {
const res = await API.get("/products");

    setProducts(res.data);

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div>

<section className="hero-section ">
        <div className="hero-content">

          <h1>Chittorgharh FastFlash</h1>

          <p>
            Fresh Food Delivered Fast
          </p>

          <button className="hero-btn"  onClick={()=>{navigate("allproducts")}}>
            Order Now
          </button>
          

        </div>
        
      </section>

      <div className="offer-banner">
        <h2>🔥 Today's Special Offer</h2>

        <p>
          Get 20% OFF on all Pizza Orders
        </p>
      </div>

<TrendingProducts />

<BestSellerProducts />

<TopRatedProducts />

      <div className="max-w-7xl mx-auto px-5">

    {
 
  categories.map((cat) => (
    <CategorySection
      key={cat._id}
      title={cat.name}
      items={
        products
          .filter(
            (p) => p.category === cat.name
          )
          .slice(0, 4)
      }
    />
  ))

}

 <div className="view-more-wrap">
    <button
      className="view-more-btn"
      onClick={() => navigate("/allproducts")}
    >
      View More Products →
    </button>
  </div>
      </div>

    </div>
  );
};

export default Home;