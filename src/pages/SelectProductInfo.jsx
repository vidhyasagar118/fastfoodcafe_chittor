import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import "./SelectProductInfo.css";
import ProductCard from "../components/ProductCard";

const SelectProductInfo = () => {
  const { id } = useParams();
const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
  API.get(`/products/${id}`)
    .then((res) => {
      setProduct(res.data);

      API.get("/products")
        .then((p) => {
          const related = p.data
  .filter((item) => item._id !== res.data._id)
  .sort(() => 0.5 - Math.random())
  .slice(0, 6);

          setRelatedProducts(related);
        });
    })
    .catch(console.log);
}, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-info-page">

      <div className="product-info-container">

        <img
          src={product.image}
          alt={product.name}
          className="product-info-image"
        />

        <div className="product-info-content">

          <h1>{product.name}</h1>

          <p>{product.description}</p>

          <h2>₹{product.price}</h2>

          {product.discount > 0 && (
            <p>
              🔥 {product.discount}% OFF
            </p>
          )}

          <p>
            ⭐ {product.rating} ({product.numReviews} Reviews)
          </p>

          <p>
            📦 Stock: {product.stock}
          </p>

        </div>

      </div>

      <div className="reviews-section">

        <h2>Customer Reviews</h2>

        {product.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review-card">

              <h4>{review.userName}</h4>

              <p>⭐ {review.rating}</p>

              <p>{review.comment}</p>

              <small>
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </small>

            </div>
          ))
        ) : (
          <p>No Reviews Yet</p>
        )}

      </div>
      <div className="related-products">
  <h2>🛍️ You May Also Like</h2>

  <div className="related-grid">
    {relatedProducts.map((item) => (
      <ProductCard
        key={item._id}
        item={item}
      />
    ))}
  </div>
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

export default SelectProductInfo;