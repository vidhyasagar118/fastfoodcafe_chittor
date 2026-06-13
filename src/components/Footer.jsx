import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-top">

          {/* About */}

          <div>

            <h2 className="footer-logo">
              🍔 Chittorgharh FastFlash
            </h2>

            <p className="footer-desc">
              Experience the fastest food delivery
              service in your city. Fresh food,
              quick delivery and delicious taste
              at your doorstep.
            </p>

            <div className="social-icons">

              <div className="social-icon">
                <FaFacebook />
              </div>

              <div className="social-icon">
                <FaInstagram />
              </div>

              <div className="social-icon">
                <FaTwitter />
              </div>

              <div className="social-icon">
                <FaWhatsapp />
              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="footer-title">
              Quick Links
            </h3>

            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/contact">Contact</a>
              <a href="/orders">Orders</a>
              <a href="/cart">Cart</a>
            </div>

          </div>

          {/* Contact */}

          <div className="footer-contact">

            <h3 className="footer-title">
              Contact Us
            </h3>

            <p>📍 Chittorgarh, Rajasthan</p>

            <p>📞 +91 63676797913</p>

            <p>✉ support@fastflash.com</p>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © 2026 Chittorgharh FastFlash.
            All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;