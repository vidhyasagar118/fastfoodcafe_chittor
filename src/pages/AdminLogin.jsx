import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
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
    <div style={{ padding: "100px" }}>
      <h1>Admin Login</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}