import { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ item }) => {

  const [qty, setQty] = useState(1);

  const addToCart = () => {

const email =
localStorage.getItem("userEmail");

const cart =
JSON.parse(
  localStorage.getItem(`cart_${email}`)
) || [];

const exist = cart.find(
 p => p._id === item._id
);

    if(exist){

      exist.qty += qty;

    }else{

      cart.push({
        ...item,
        qty
      });

    }

   localStorage.setItem(
  `cart_${email}`,
  JSON.stringify(cart)
);

    alert(
      `${item.name} Added To Cart`
    );
  };

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
          onClick={addToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;