import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Checkout.css";
import axios from "axios";
const Checkout = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    road: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  const email =
  localStorage.getItem("userEmail");

const cart =
  JSON.parse(
    localStorage.getItem(`cart_${email}`)
  ) || [];
  const total = cart.reduce(
    (sum, item) =>
      sum +
      (
        item.price -
        (item.price * (item.discount || 0)) / 100
      ) *
        item.qty,
    0
  );

  const validateForm = () => {
  const newErrors = {};

  if (!address.name.trim()) {
    newErrors.name = "Full Name is required";
  }

  if (!/^[6-9]\d{9}$/.test(address.phone)) {
    newErrors.phone = "Enter valid 10 digit mobile number";
  }

  if (!address.house.trim()) {
    newErrors.house = "House No is required";
  }

  if (!address.road.trim()) {
    newErrors.road = "Road Name is required";
  }

  if (!address.city.trim()) {
    newErrors.city = "City is required";
  }

  if (!address.district.trim()) {
    newErrors.district = "District is required";
  }

  if (!address.state.trim()) {
    newErrors.state = "State is required";
  }

  if (!/^\d{6}$/.test(address.pincode)) {
    newErrors.pincode = "Pincode must be 6 digits";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
 

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );

        const data = res.data.address;

        setAddress((prev) => ({
          ...prev,
          city: data.city || data.town || data.village || "",
          district: data.county || "",
          state: data.state || "",
          pincode: data.postcode || "",
          road: data.road || "",
        }));

        alert("Location Loaded Successfully");
      } catch (err) {
        console.log(err);
        alert("Location Fetch Failed");
      }
    },
    () => {
      alert("Location Permission Denied");
    }
  );
};

const placeOrder = async () => {
  const email = localStorage.getItem("userEmail");
console.log(cart);
if (!email) {
  alert("Please Login First");
  navigate("/login");
  return;
}
  if (!validateForm()) return;

  try {
   await API.post("/orders/place", {
  customerName: address.name,
  email,
  phone: address.phone,
  address: `${address.house}, ${address.road}, ${address.city}, ${address.district}, ${address.state} - ${address.pincode}`,
  items: cart,
  total,
});
    alert("Order Placed Successfully");

    localStorage.removeItem(`cart_${email}`);
    setAddress({
      name: "",
      phone: "",
      house: "",
      road: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    });

    navigate("/orders");

  } catch (error) {
    console.log(error);
    alert("Order Failed");
  }
};  return (
    <div className="checkout-page">
      <div className="checkout-container">

        <h1 className="checkout-title">
          Checkout
        </h1>

        <div className="checkout-card">

        <button
  type="button"
  onClick={getLocation}
  className="location-btn"
>
  📍 Detect My Location
</button>

          <div className="checkout-grid">

        <input
  className="checkout-input"
  placeholder="Full Name"
  required
  value={address.name}
  onChange={(e) =>
    setAddress({
      ...address,
      name: e.target.value,
    })
  }
/>

{errors.name && (
  <p className="error-text">{errors.name}</p>
)}
<input
  type="tel"
  className="checkout-input"
  placeholder="Phone Number"
  maxLength="10"
  value={address.phone}
  onChange={(e) =>
    setAddress({
      ...address,
      phone: e.target.value.replace(/\D/g, ""),
    })
  }
/>

{errors.phone && (
  <p className="error-text">{errors.phone}</p>
)}

            <input
              className="checkout-input"
              placeholder="House No"
              value={address.house}
              onChange={(e) =>
                setAddress({
                  ...address,
                  house: e.target.value,
                })
              }
            />

            <input
              className="checkout-input"
              placeholder="Road Name"
              value={address.road}
              onChange={(e) =>
                setAddress({
                  ...address,
                  road: e.target.value,
                })
              }
            />

            <input
              className="checkout-input"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({
                  ...address,
                  city: e.target.value,
                })
              }
            />

            <input
              className="checkout-input"
              placeholder="District"
              value={address.district}
              onChange={(e) =>
                setAddress({
                  ...address,
                  district: e.target.value,
                })
              }
            />

            <input
              className="checkout-input"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({
                  ...address,
                  state: e.target.value,
                })
              }
            />

         <input
  type="text"
  className="checkout-input"
  placeholder="Pincode"
  maxLength="6"
  value={address.pincode}
  onChange={(e) =>
    setAddress({
      ...address,
      pincode: e.target.value.replace(/\D/g, ""),
    })
  }
/>

{errors.pincode && (
  <p className="error-text">{errors.pincode}</p>
)}
          </div>

          <div className="summary-box">

            <h3 className="summary-title">
              Order Summary
            </h3>

            {cart.map((item, index) => (
              <div
                key={index}
                className="summary-row"
              >
                <span>
                  {item.name} × {item.qty}
                </span>

                <span>
                  ₹
                  {(
                    item.price -
                    (item.price *
                      (item.discount || 0)) /
                      100
                  ) * item.qty}
                </span>
              </div>
            ))}

            <hr />

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>

         <button
  className="order-btn"
  onClick={placeOrder}
  disabled={
    !address.name ||
    !address.phone ||
    !address.house ||
    !address.road ||
    !address.city ||
    !address.district ||
    !address.state ||
    !address.pincode
  }
>
  Place Order
</button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;