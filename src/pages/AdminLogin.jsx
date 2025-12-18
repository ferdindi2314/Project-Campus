import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export function AdminLogin() {
  const { user, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@itshop.id");
  const [password, setPassword] = useState("admin123");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginAdmin(email, password);
    if (result.success) {
      navigate("/admin", { replace: true });
    } else {
      setMessage(result.message || "Login admin gagal");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login Admin</h1>
        <p className="auth-subtitle">Akses dashboard admin terpisah</p>
        {message && <div className="auth-alert">{message}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email admin"
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
            Masuk Admin
          </button>
        </form>
      </div>
    </div>
  );
}
