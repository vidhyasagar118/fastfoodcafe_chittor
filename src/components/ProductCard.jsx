import { useState } from "react";
import "./ProductCard.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
const navigate = useNavigate();

  const [qty, setQty] = useState(1);
const { addToCart } = useContext(CartContext);
  return (
<div className="product-card">
      <span className="offer-badge">
        Bestseller
      </span>

      <img
        src={item.image}
        alt={item.name}
        className="product-image"
      />

      <div className="product-content">

        <h2 className="product-name">
          {item.name}
        </h2>

        <p className="product-description">
          {item.description}
        </p>

{
item.discount > 0 ? (
  <>
    <p
      style={{
        textDecoration:
          "line-through",
      }}
    >
      ₹{item.price}
    </p>

    <p>
      ₹
      {Math.round(
        item.price -
        (item.price *
          item.discount) /
          100
      )}
    </p>

    <span>
      {item.discount}% OFF
    </span>
  </>
) : (
  <p>₹{item.price}</p>
)

}
{item.stock > 0 ? (
  <p style={{ color: "green" }}>
    ✅ In Stock ({item.stock})
  </p>
) : (
  <p style={{ color: "red" }}>
    ❌ Out Of Stock
  </p>
)}
        <div className="qty-container">

          <button
            className="qty-btn"
            onClick={() =>
              qty > 1 &&
              setQty(qty - 1)
            }
          >
            -
          </button>

          <span className="qty-value">
            {qty}
          </span>

          <button
            className="qty-btn"
            onClick={() =>
              setQty(qty + 1)
            }
          >
            +
          </button>

        </div>

     <button
  className="cart-btn"
  disabled={item.stock <= 0}
  onClick={(e) => {
    e.stopPropagation();

    for (let i = 0; i < qty; i++) {
      addToCart(item);
    }

    alert(`${item.name} Added To Cart`);
  }}
>
  {item.stock > 0
    ? "Add To Cart"
    : "Out Of Stock"}
</button>
      </div>

    </div>
  );
};

export default ProductCard;