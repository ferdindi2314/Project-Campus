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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#667eea",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 style={{ margin: 0 }}>Profil</h1>
            <p className="auth-subtitle" style={{ margin: 0 }}>
              Kelola akun Anda
            </p>
          </div>
        </div>
        {message && (
          <div className={`auth-alert ${success ? "auth-success" : ""}`}>
            {message}
          </div>
        )}
        <div className="profile-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
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
