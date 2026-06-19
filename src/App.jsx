import { Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import "./App.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedAdmin from "./components/ProtectedAdmin";
import AccessDenied from "./pages/AccessDenied";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import SelectProductInfo from "./pages/SelectProductInfo";
import FeaturedProducts from "./pages/FeaturedProducts";
import AdminLogin from "./pages/AdminLogin";

import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import Categories from "./admin/Categories";
import AdminOrders from "./admin/Orders";
import Usersinfo from "./admin/Usersinfo";

function App() {
  const navigate = useNavigate();
   useEffect(() => {
   const disableRightClick = (e) => {
  e.preventDefault();
  navigate("/access-denied");
};

const disableInspect = (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.shiftKey && e.key === "J") ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    navigate("/access-denied");
  }
};
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableInspect);
        return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableInspect);
    };
  }, []);
  return (
    <>
      <Navbar />

      <Routes>

        {/* User Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/orders" element={<Orders />} />

        <Route
          path="/allproducts"
          element={<AllProducts />}
        />

<Route
  path="/access-denied"
  element={<AccessDenied />}
/>
        <Route
          path="/featured"
          element={<FeaturedProducts />}
        />

        <Route
          path="/product/:id"
          element={<SelectProductInfo />}
        />

        <Route
          path="/productdetails/:id"
          element={<ProductDetails />}
        />

        {/* Admin Login */}

        <Route
          path="/adminlogin"
          element={<AdminLogin />}
        />

        {/* Protected Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Dashboard />
            </ProtectedAdmin>
          }
        />

     

        <Route
          path="/admin/orders"
          element={
            <ProtectedAdmin>
              <AdminOrders />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedAdmin>
              <Usersinfo />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedAdmin>
              <Products />
            </ProtectedAdmin>
          }
        />

<Route
  path="/admin/categories"
  element={
    <ProtectedAdmin>
      <Categories />
    </ProtectedAdmin>
  }
/>
        <Route
          path="/admin/products/:category"
          element={
            <ProtectedAdmin>
              <Products />
            </ProtectedAdmin>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;