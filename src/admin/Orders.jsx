import { useEffect, useState } from "react";
import "./AdminOrders.css";
import API from "../api";
const Orders = () => {

const [orders, setOrders] = useState([]);

useEffect(() => {
  fetchOrders();
}, []);

const fetchOrders = async () => {
  const res = await API.get("/orders");

  setOrders(res.data);
};

  const updateStatus = async (id) => {
  await API.put(
  `/orders/${id}`,
  {
    status: "Delivered",
  }
);
  fetchOrders();
};
const cancelOrder = async (id) => {
  await API.put(
  `/orders/${id}`,
  {
    status: "Cancelled",
  }
);

  fetchOrders();
};
  return (
    <div className="admin-orders-page">

      <div className="admin-orders-container">

        <h1 className="admin-orders-title">
          📦 Manage Orders
        </h1>

        <div className="orders-table-wrapper">

          <table className="orders-table">

            <thead>

              <tr>

                <th>Customer</th>
           <th>Items</th>
                <th>Amount</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order, index) => (
              
                <tr key={index}>
<td>{order.customerName}</td>
<td>
  {order.items?.map((item) => (
    <div key={item._id}>
      {item.name} × {item.qty}
    </div>
  ))}
</td>
<td>₹{order.total}</td>

                  <td>

                    <span
                      className={`status ${
                        order.status === "Delivered"
                          ? "delivered"
                          : order.status === "Pending"
                          ? "pending"
                          : "cancelled"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                 <td className="action-buttons">
  <button
    className="action-btn deliver-btn"
    onClick={() => updateStatus(order._id)}
  >
    Deliver
  </button>

  <button
    className="action-btn cancel-btn"
    onClick={() => cancelOrder(order._id)}
  >
    Cancel
  </button>
</td>
                  

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Orders;