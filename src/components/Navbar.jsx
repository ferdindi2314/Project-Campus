import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { LoginModal } from "./LoginModal";
import { CustomConfirm } from "./CustomAlert";
import { useState, useRef, useEffect } from "react";

export const Navbar = () => {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const cartCount = items.length;

  const handleToggle = () => setIsMenuOpen((prev) => !prev);
  const handleClose = () => setIsMenuOpen(false);
  const handleAccountClick = () => setIsAccountOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target)
      ) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ ITShop
        </Link>
        <button
          className={`navbar-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={handleToggle}
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`navbar-menu ${isMenuOpen ? "menu-open" : ""}`}>
          <li>
            <Link to="/" className="nav-link" onClick={handleClose}>
              Beranda
            </Link>
          </li>
          <li>
            <Link to="/products" className="nav-link" onClick={handleClose}>
              Produk
            </Link>
          </li>
          {user && user.role === "admin" && (
            <li>
              <Link to="/admin" className="nav-link" onClick={handleClose}>
                📊 Admin
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/cart"
              className="nav-link cart-link"
              onClick={handleClose}
            >
              🛒 Keranjang ({cartCount})
            </Link>
          </li>
        </ul>

        <div className="navbar-account" ref={accountMenuRef}>
          <button
            className="account-btn"
            onClick={handleAccountClick}
            title={user ? `Akun: ${user.email}` : "Login"}
          >
            {user ? (
              <>
                <span className="account-icon">👤</span>
                <span className="account-name">{user.name}</span>
              </>
            ) : (
              <>
                <span className="account-icon">👤</span>
                <span className="account-name">Akun</span>
              </>
            )}
          </button>

          {isAccountOpen && (
            <div className="account-dropdown">
              {user ? (
                <>
                  <div className="account-info">
                    <p className="account-email">{user.email}</p>
                  </div>
                  <button
                    className="dropdown-btn logout-btn"
                    onClick={() => {
                      setIsLogoutConfirmOpen(true);
                      setIsAccountOpen(false);
                    }}
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <button
                  className="dropdown-btn login-btn"
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsAccountOpen(false);
                  }}
                >
                  Masuk
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <CustomConfirm
        isOpen={isLogoutConfirmOpen}
        onConfirm={() => {
          logout();
          setIsLogoutConfirmOpen(false);
        }}
        onCancel={() => setIsLogoutConfirmOpen(false)}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari akun?"
      />
    </nav>
  );
};
