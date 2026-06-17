import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName");

  const userEmail =
    localStorage.getItem("userEmail");

  const userPhoto =
    localStorage.getItem("userPhoto");

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhoto");

    window.location.reload();
  };

  return (
    <div className="login-page">
      {!userName ? (
        <div className="login-card">

          <h1 className="login-title">
            Welcome Back 👋
          </h1>

          <p className="login-subtitle">
            Login to continue ordering food
          </p>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const user = jwtDecode(
                credentialResponse.credential
              );

              try {
                await API.post(
                  "/auth/google-login",
                  {
                    name: user.name,
                    email: user.email,
                    picture: user.picture,
                  }
                );

                localStorage.setItem(
                  "userName",
                  user.name
                );

                localStorage.setItem(
                  "userEmail",
                  user.email
                );

                localStorage.setItem(
                  "userPhoto",
                  user.picture
                );

                window.location.reload();
              } catch (err) {
                console.log(err);
                alert("Login Failed");
              }
            }}
          />

        </div>
      ) : (
        <div className="profile-card">

          <div className="profile-header">

            <img
              src={userPhoto}
              alt="profile"
              className="profile-img"
            />

            <div className="status-badge">
              🟢 Active
            </div>

          </div>

          <h2>{userName}</h2>

          <p className="email-text">
            {userEmail}
          </p>

          <div className="profile-buttons">

            <button
              onClick={() =>
                navigate("/orders")
              }
            >
              📦 My Orders
            </button>

            <button
              onClick={() =>
                navigate("/cart")
              }
            >
              🛒 My Cart
            </button>

          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default Login;