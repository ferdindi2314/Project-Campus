import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export function UserLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      const redirectTo = location.state?.from || "/profile";
      navigate(redirectTo, { replace: true });
    } else {
      setMessage(result.message || "Login gagal");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Masuk</h1>
        <p className="auth-subtitle">Akses akun pelanggan Anda</p>
        {message && <div className="auth-alert">{message}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            Masuk
          </button>
        </form>
        <div className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </div>
      </div>
    </div>
  );
}
