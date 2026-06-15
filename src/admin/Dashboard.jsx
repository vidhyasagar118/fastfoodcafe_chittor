import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    ordersToday: 0,
    revenue: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    API.get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <h1 className="dashboard-title">
          🍔 FastFlash Admin Dashboard
        </h1>

        <div className="stats-box">

          <div className="stat-card">
            <h3>Total Products</h3>
            <h2>{stats.totalProducts}</h2>
          </div>

          <div className="stat-card">
            <h3>Orders Today</h3>
            <h2>{stats.ordersToday}</h2>
          </div>

          <div className="stat-card">
            <h3>Revenue</h3>
            <h2>₹{stats.revenue}</h2>
          </div>

          <div className="stat-card">
            <h3>Customers</h3>
            <h2>{stats.totalCustomers}</h2>
          </div>

        </div>

        <div className="dashboard-grid">

          <Link
            to="/admin/categories"
            className="dashboard-card categories-card"
          >
            <h2>📂 Categories</h2>
            <p>Manage Food Categories</p>
          </Link>

          <Link
            to="/admin/orders"
            className="dashboard-card orders-card"
          >
            <h2>📦 Orders</h2>
            <p>View & Manage Customer Orders</p>
          </Link>

          <Link
            to="/admin/users"
            className="dashboard-card users-card"
          >
            <h2>👥 Users</h2>
            <p>Manage Registered Users</p>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;