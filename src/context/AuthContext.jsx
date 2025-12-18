import { createContext, useContext, useState, useEffect } from "react";
import { registeredUsers } from "../data/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load user dan data pengguna dari localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error("Error loading users from localStorage:", error);
        localStorage.removeItem("users");
        setUsers(registeredUsers);
        localStorage.setItem("users", JSON.stringify(registeredUsers));
      }
    } else {
      // Seed initial users ke localStorage
      setUsers(registeredUsers);
      localStorage.setItem("users", JSON.stringify(registeredUsers));
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const persistUsers = (nextUsers) => {
    setUsers(nextUsers);
    localStorage.setItem("users", JSON.stringify(nextUsers));
  };

  const login = (email, password) => {
    const source = users.length ? users : registeredUsers;
    const foundUser = source.find(
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
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: "Email atau password salah" };
  };

  const loginAdmin = (email, password) => {
    const source = users.length ? users : registeredUsers;
    const foundUser = source.find(
      (u) => u.email === email && u.password === password && u.role === "admin"
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: "Akses admin ditolak" };
  };

  const register = ({ name, email, password }, { autoLogin = true } = {}) => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      return { success: false, message: "Email sudah terdaftar" };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "customer",
    };
    const nextUsers = [...users, newUser];
    persistUsers(nextUsers);
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
    if (autoLogin) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return { success: true, user: userData };
  };

  const updateProfile = ({ name, password, targetId }) => {
    const targetUserId = targetId || user?.id;
    if (!targetUserId) return { success: false, message: "Tidak ada sesi" };
    const nextUsers = users.map((u) =>
      u.id === targetUserId
        ? { ...u, name: name || u.name, password: password || u.password }
        : u
    );
    persistUsers(nextUsers);
    if (user && user.id === targetUserId) {
      const updatedUser = {
        ...user,
        name: name || user.name,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    }
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    // Hapus dari localStorage
    localStorage.removeItem("user");
  };

  const deleteUser = (id) => {
    const target = users.find((u) => u.id === id);
    if (!target) return { success: false, message: "User tidak ditemukan" };
    if (target.role === "admin")
      return { success: false, message: "Tidak bisa hapus admin" };
    if (user && user.id === id)
      return {
        success: false,
        message: "Tidak bisa hapus diri sendiri saat login",
      };
    const next = users.filter((u) => u.id !== id);
    persistUsers(next);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        loginAdmin,
        register,
        updateProfile,
        deleteUser,
        logout,
      }}
    >
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
