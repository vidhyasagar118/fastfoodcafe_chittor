import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./FoodCard.css";

export default function FoodCard({ item }) {

  const {
    cart,
    addItem,
    increase,
    decrease
  } = useContext(CartContext);

  const exist = cart.find(
    (i) => i._id === item._id
  );

  return (
    <div className="card">

      <h3>{item.name}</h3>

      <p>₹{item.price}</p>

      {!exist ? (

        <button
          onClick={() => addItem(item)}
        >
          Add To Cart
        </button>

      ) : (

        <div className="qty-box">

          <button
            onClick={() =>
              decrease(item._id)
            }
          >
            -
          </button>

          <span className="qty-value">
            {exist.qty}
          </span>

<img
  src={item.image}
  alt={item.name}
  className="food-image"
/>
          <button
            onClick={() =>
              increase(item._id)
            }
          >
            +
          </button>

        </div>

      )}

    </div>
  );
}