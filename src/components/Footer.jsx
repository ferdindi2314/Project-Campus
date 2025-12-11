import "./Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">🛍️ ITShop</div>
          <p className="footer-tagline">
            Belanja elektronik aman, cepat, dan terkurasi.
          </p>
        </div>

        <div className="footer-links">
          <h4>Menu</h4>
          <Link to="/">Beranda</Link>
          <Link to="/products">Produk</Link>
          <Link to="/cart">Keranjang</Link>
        </div>

        <div className="footer-links">
          <h4>Bantuan</h4>
          <a href="mailto:support@itshop.id">support@itshop.id</a>
          <a href="tel:+62123456789">+62 123-456-789</a>
          <span>Senin - Minggu, 08.00 - 21.00</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ITShop. All rights reserved.</span>
        <span className="footer-pill">Terpercaya & Bergaransi</span>
      </div>
    </footer>
  );
};
