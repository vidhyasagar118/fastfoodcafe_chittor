import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import API from "../api";
const Login = () => {

  const userName =
    localStorage.getItem("userName");

  const userEmail =
    localStorage.getItem("userEmail");

  const logout = () => {

    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhoto");

    window.location.reload();
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {!userName ? (

          <>
            <h1 className="login-title">
              Login
            </h1>

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
      alert("Database Save Failed");
    }

  }}
  onError={() => {
    alert("Login Failed");
  }}
/>
          </>

        ) : (

          <>
            <img
              src={localStorage.getItem("userPhoto")}
              alt="Profile"
              style={{
                width: "100px",
                borderRadius: "50%",
              }}
            />

            <h2>
              Welcome {userName}
            </h2>

            <p>
              {userEmail}
            </p>

            <button
              onClick={logout}
              className="logout-btn"
            >
              Logout
            </button>
          </>

        )}

      </div>
    </div>
  );
};

export default Login;