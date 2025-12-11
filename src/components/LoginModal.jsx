import { useState } from "react";
import "./LoginModal.css";
import { useAuth } from "../context/AuthContext";
import { CustomAlert } from "./CustomAlert";
import { registeredUsers } from "../data/users";

export const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  const showAlert = (title, message, type = "error") => {
    setAlert({ isOpen: true, title, message, type });
  };

  const closeAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form kosong
    if (!email.trim() || !password.trim()) {
      showAlert(
        "Form Belum Lengkap",
        "Silakan isi email dan password terlebih dahulu."
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Cek apakah email terdaftar
      const userExists = registeredUsers.find((u) => u.email === email);

      if (!userExists) {
        showAlert(
          "Email Tidak Terdaftar",
          "Email yang Anda masukkan tidak terdaftar dalam sistem."
        );
        setLoading(false);
        return;
      }

      // Cek password
      if (userExists.password !== password) {
        showAlert(
          "Password Salah",
          "Password yang Anda masukkan salah. Silakan coba lagi."
        );
        setLoading(false);
        return;
      }

      // Login berhasil
      if (login(email, password)) {
        setLoading(false);
        showAlert(
          "Login Berhasil",
          "Selamat datang! Anda berhasil masuk ke akun.",
          "success"
        );
        setTimeout(() => {
          setEmail("");
          setPassword("");
          closeAlert();
          onClose();
        }, 2000);
      }
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>Masuk ke Akun</h2>
        <p>Silakan masukkan email dan password Anda</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Sedang Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="form-footer">
          Belum punya akun?{" "}
          <a href="#signup" onClick={(e) => e.preventDefault()}>
            Daftar di sini
          </a>
        </p>
      </div>

      <CustomAlert
        isOpen={alert.isOpen}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </div>
  );
};
