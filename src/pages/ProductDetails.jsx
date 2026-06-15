import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
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

  const finalPrice =
    product.price -
    (product.price * (product.discount || 0)) / 100;

  const canReview =
    localStorage.getItem("canReview");

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

      {canReview === id && (
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
    </div>
  );
};

export default ProductDetails;