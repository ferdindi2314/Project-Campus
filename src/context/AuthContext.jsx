import { createContext, useContext, useState, useEffect } from "react";
import { registeredUsers } from "../data/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user dari localStorage saat pertama kali mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (email, password) => {
    // Cari user di data users.js
    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role || "customer",
      };
      setUser(userData);
      // Simpan ke localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    // Hapus dari localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
