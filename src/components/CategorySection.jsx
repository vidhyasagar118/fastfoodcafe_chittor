import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./CategorySection.css";

const CategorySection = ({ title, items }) => {

  const navigate = useNavigate();

  return (
    <section className="category-section">

      <div className="category-header">

        <h2 className="category-title">
          {title}
        </h2>

        <button
          onClick={() =>
            navigate("/allproducts")
          }
        >
          View All
        </button>

      </div>

      <div className="products-grid">

        {items.map((item) => (
          <ProductCard
            key={item._id}
            item={item}
          />
        ))}

      </div>

    </section>
  );
};

export default CategorySection;