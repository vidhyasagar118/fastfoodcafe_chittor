import "./Orders.css";
import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";


import { useContext } from "react";
import { CartContext } from "../context/CartContext";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const email = localStorage.getItem("userEmail");
  const { setWholeCart } = useContext(CartContext);
  const navigate = useNavigate();
  const reorderItems = (items) => {
    setWholeCart(items);

    navigate("/cart");
  };
  useEffect(() => {
    if (!email) {
      window.location.href = "/login";
      return;
    }

    API
      .get(`/orders/user/${email}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="orders-title">🍔 My Orders</h1>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No Orders Yet 🍕</h2>
            <p>Start ordering your favorite food.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              {/* Header */}
              <div className="order-header">
                <div>
                  <h2>{order.customerName || "Customer"}</h2>

                  <p className="order-date">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`status ${order.status === "Delivered"
                      ? "delivered"
                      : order.status === "Preparing"
                        ? "preparing"
                        : order.status === "Cancelled"
                          ? "cancelled"
                          : "pending"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className={`progress-fill ${order.status === "Delivered"
                      ? "fill-100"
                      : order.status === "Preparing"
                        ? "fill-70"
                        : order.status === "Cancelled"
                          ? "fill-cancelled"
                          : "fill-30"
                    }`}
                ></div>
              </div>
              <h3 className="section-title">
                Items Ordered
              </h3>

              {/* Items */}
              {order.items?.map((item, index) => (
                <div
                  className="item-row"
                  key={index}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="food-img"
                  />

                  <div className="item-details">
                    <h4>{item.name}</h4>

                    <p>
                      Quantity : {item.qty}
                    </p>
                  </div>

                  <div className="item-price">
                    ₹
                    {(item.price || 0) *
                      item.qty}
                  </div>
                </div>
              ))}
                  {order.status === "Delivered" && (
  <button
    className="review-btn"
    onClick={() => {
      localStorage.setItem(
        "canReview",
        item._id
      );

      navigate(
        `/productdetails/${item._id}`
      );
    }}
  >
    Review Product
  </button>
)}

              {/* Address */}
              {/* Address */}
              <div className="address-box">
                <h4>📍 Delivery Address</h4>
                <p>{order.address}</p>
              </div>

              {/* Cancel Message */}
              {
                order.status === "Cancelled" && (
                  <div className="cancel-message">
                    ❌ Order Cancelled<br />
                    Due to unforeseen circumstances, we were unable to process your order. A full refund will be initiated automatically and should reflect in your account within 1–3 hours.
                  </div>
                )
              }



              {/* Footer */}
              <div className="order-footer">
                <div className="order-id">
                  Order ID : {order._id}
                </div>

                <div className="total-price">
                  ₹{order.total}
                </div>
              </div>
              {order.status !== "Cancelled" && (
                <button
                  className="reorder-btn"
                  onClick={() => reorderItems(order.items)}
                >
                  🔄 Reorder  / again order
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;