import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          🍔 FastFlash Admin Dashboard
        </h1>

        {/* Stats */}

        <div className="stats-box">

          <div className="stat-card">
            <h3>Total Products</h3>
            <h2>120</h2>
          </div>

          <div className="stat-card">
            <h3>Orders Today</h3>
            <h2>56</h2>
          </div>

          <div className="stat-card">
            <h3>Revenue</h3>
            <h2>₹25K</h2>
          </div>

          <div className="stat-card">
            <h3>Customers</h3>
            <h2>340</h2>
          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="dashboard-grid">

        

          <Link
            to="/admin/categories"
            className="dashboard-card categories-card"
          >
            <h2>📂 Categories</h2>
            <p>
              Manage Food Categories
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="dashboard-card orders-card"
          >
            <h2>📦 Orders</h2>
            <p>
              View & Manage Customer Orders
            </p>
          </Link>

          <Link
            to="/admin/users"
            className="dashboard-card users-card"
          >
            <h2>👥 Users</h2>
            <p>
              Manage Registered Users
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;