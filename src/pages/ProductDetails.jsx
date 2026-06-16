import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import "./ProductDetails.css";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
  try {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);

    const all = await API.get("/products");

    let related = all.data
      .filter(
        (item) =>
          item.category === res.data.category &&
          item._id !== res.data._id
      );

    if (related.length < 6) {
      const extra = all.data.filter(
        (item) => item._id !== res.data._id
      );

      related = [
        ...related,
        ...extra.sort(() => 0.5 - Math.random()),
      ];
    }

    setRelatedProducts(related.slice(0, 6));
  } catch (err) {
    console.log(err);
  }
};

  const submitReview = async () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Please Login First");
      return;
    }

    try {
      await API.post(`/products/review/${id}`, {
        userName: localStorage.getItem("userName"),
        email,
        rating,
        comment,
      });

      alert("Review Added Successfully");

      setComment("");
      setRating(5);

      fetchProduct();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Review Failed"
      );
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const email = localStorage.getItem("userEmail");

  // User ne pehle review diya hai ya nahi
  const alreadyReviewed =
    email &&
    product?.reviews?.some(
      (review) => review.email === email
    );

  // Order delivered hone ke baad set hota hai
  const canReview =
    localStorage.getItem("canReview");

  const finalPrice =
    product.price -
    (product.price * (product.discount || 0)) / 100;

  return (
    <div className="product-details-page">
      <div className="product-details-card">
        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />

        <div className="details-content">
          <h1>{product.name}</h1>

          <p>{product.description}</p>

          {product.discount > 0 ? (
            <>
              <h3
                style={{
                  textDecoration: "line-through",
                  color: "gray",
                }}
              >
                ₹{product.price}
              </h3>

              <h2 style={{ color: "green" }}>
                ₹{Math.round(finalPrice)}
              </h2>

              <span>
                {product.discount}% OFF
              </span>
            </>
          ) : (
            <h2>₹{product.price}</h2>
          )}

          <h3>
            ⭐ {product.rating?.toFixed(1)}
          </h3>

          <p>
            Total Reviews : {product.numReviews}
          </p>
        </div>
      </div>

      {/* Review Form */}

      {canReview === id && !alreadyReviewed && (
        <div className="review-form">
          <h2>Write Review</h2>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <button onClick={submitReview}>
            Submit Review
          </button>
        </div>
      )}

      {/* Already Reviewed Message */}

      {canReview === id && alreadyReviewed && (
        <div className="review-form">
          <h3 style={{ color: "green" }}>
            ✅ You have already reviewed this product
          </h3>
        </div>
      )}

      {/* Reviews */}

      <div className="reviews-section">
        <h2>
          Reviews ({product.numReviews})
        </h2>

        {product.reviews?.length === 0 ? (
          <p>No Reviews Yet</p>
        ) : (
          product.reviews.map((review) => (
            <div
              key={review._id}
              className="review-card"
            >
              <h4>{review.userName}</h4>

              <p>
                ⭐ {review.rating}
              </p>

              <p>{review.comment}</p>

              <small>
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
      <div className="related-section">
  <h2>🔥 You May Also Like</h2>

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

export default ProductDetails;