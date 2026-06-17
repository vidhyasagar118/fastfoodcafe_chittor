import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import  "./adminlogin.css"
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post(
  "/auth/admin-login",
  {
    username,
    password,
  }
);

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      localStorage.setItem(
        "adminAuth",
        "true"
      );

      navigate("/admin");

    } catch (err) {
      alert("Wrong Username or Password");
    }
  };

  return (
   <div className="admin-login-page">
  <div className="admin-login-card">
    <h1>Admin Login</h1>

    <input
      className="admin-input"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <br /><br />

    <input
      className="admin-input"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <br /><br />

    <button
      className="admin-btn"
      onClick={handleLogin}
    >
      Login
    </button>
  </div>
</div>
  );
}