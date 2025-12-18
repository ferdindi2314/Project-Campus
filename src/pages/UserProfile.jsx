import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export function UserProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true, state: { from: "/profile" } });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = updateProfile({ name, password: password || undefined });
    if (result.success) {
      setSuccess(true);
      setMessage("Profil berhasil diperbarui");
      setPassword("");
    } else {
      setSuccess(false);
      setMessage(result.message || "Gagal memperbarui profil");
    }
  };

  if (!user) return null;

  return (
    <div className="auth-page">
      <div className="auth-card profile-card">
        <h1>Profil</h1>
        <p className="auth-subtitle">Kelola akun Anda</p>
        {message && (
          <div className={`auth-alert ${success ? "auth-success" : ""}`}>
            {message}
          </div>
        )}
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
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
            type="password"
            placeholder="Password baru (opsional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-button">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
