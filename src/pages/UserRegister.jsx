import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export function UserRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password tidak sama");
      return;
    }
    const result = register({ name, email, password }, { autoLogin: false });
    if (result.success) {
      setSuccess(true);
      setMessage("Registrasi berhasil, silakan login.");
      setTimeout(() => navigate("/login", { replace: true }), 800);
    } else {
      setSuccess(false);
      setMessage(result.message || "Registrasi gagal");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Daftar</h1>
        <p className="auth-subtitle">Buat akun pelanggan baru</p>
        {message && (
          <div className={`auth-alert ${success ? "auth-success" : ""}`}>
            {message}
          </div>
        )}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            className="auth-input"
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            Daftar
          </button>
        </form>
        <div className="auth-footer">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </div>
      </div>
    </div>
  );
}
