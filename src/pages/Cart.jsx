import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";
const Cart = () => {
  const navigate = useNavigate();
  const {
  cart,
  increase,
  decrease,
  removeItem
} = useContext(CartContext);
 const email =
    localStorage.getItem("userEmail");
  // Load cart from localStorage


  

  // Total Price
  const total =
cart.reduce(
  (sum, item) =>
    sum +
    (
      item.price -
      (item.price *
        item.discount) /
        100
    ) *
      item.qty,
  0
);

  return (
    <div className="cart-container">

      <h1 className="cart-title">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (

        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some delicious food to get started.</p>
        </div>

      ) : (

        <>
          {cart.map((item, index) => (

            <div
              key={index}
              className="cart-item"
            >

              <div className="item-info">

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                  />
                )}

                <div>

                  <h2>
                    {item.name}
                  </h2>

                  <p className="item-price">
                    ₹{item.price} × {item.qty}
                  </p>

                  <p className="item-total">
                    Total: ₹
                    {item.price * item.qty}
                  </p>

                </div>

              </div>

              <div className="qty-controls">
<button
  className="qty-btn"
  onClick={() => decrease(item._id)}
>
  -
</button>

                <span className="qty-number">
                  {item.qty}
                </span>

<button
  className="qty-btn"
  onClick={() => increase(item._id)}
>
  +
</button><button
  className="remove-btn"
  onClick={() => removeItem(item._id)}
>
  Remove
</button>
              </div>

            </div>

          ))}

          <div className="total-box">

            <h2 className="total-price">
              Grand Total: ₹{total}
            </h2>

            <p className="delivery-text">
              🚚 Free Delivery Above ₹499
            </p>

          </div>

          <button
            className="checkout-btn"
            onClick={() =>
              navigate("/checkout")
            }
          >
            Proceed To Checkout
          </button>

        </>

      )}

    </div>
  );
};

export default Cart;