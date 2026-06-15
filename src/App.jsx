import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllProducts from "./pages/AllProducts";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import Categories from "./admin/Categories";
import AdminOrders from "./admin/Orders";
import AdminLogin from "./pages/AdminLogin";
import ProtectedAdmin from "./components/ProtectedAdmin";
import Usersinfo from "./admin/Usersinfo";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Orders />} />
                
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/users" element={<Usersinfo />} />
       <Route
 path="/product/:id"
 element={<ProductDetails />}
/>
        <Route
  path="/adminlogin"
  element={<AdminLogin />}
  
/>
<Route
  path="/admin/products/:category"
  element={
    <ProtectedAdmin>
      <Products />
    </ProtectedAdmin>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedAdmin>
      <Dashboard />
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
  path="/admin/orders"
  element={
    <ProtectedAdmin>
      <Orders />
    </ProtectedAdmin>
  }
/>

<Route
  path="/allproducts"
  element={<AllProducts />}
/>
        
      </Routes>


      <Footer />
      </>
  );
}

export default App;