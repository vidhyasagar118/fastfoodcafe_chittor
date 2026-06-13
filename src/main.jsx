import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <GoogleOAuthProvider clientId="425249806588-qid6puhrtisdtkjp66elihgb34u0mjks.apps.googleusercontent.com">
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);