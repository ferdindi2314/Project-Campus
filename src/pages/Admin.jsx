import { useState, useEffect } from "react";
import "./Admin.css";
import { AdminSales } from "./AdminSales";
import { AdminProducts } from "./AdminProducts";
import { AdminReports } from "./AdminReports";
import { AdminUsers } from "./AdminUsers";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sales");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        <aside className="admin-sidebar">
          <h2>📊 Admin Panel</h2>
          <ul className="admin-menu">
            <li>
              <button
                className={`admin-menu-link ${
                  activeTab === "sales" ? "active" : ""
                }`}
                onClick={() => setActiveTab("sales")}
              >
                📈 Penjualan
              </button>
            </li>
            <li>
              <button
                className={`admin-menu-link ${
                  activeTab === "users" ? "active" : ""
                }`}
                onClick={() => setActiveTab("users")}
              >
                👥 Users
              </button>
            </li>
            <li>
              <button
                className={`admin-menu-link ${
                  activeTab === "products" ? "active" : ""
                }`}
                onClick={() => setActiveTab("products")}
              >
                📦 Produk
              </button>
            </li>
            <li>
              <button
                className={`admin-menu-link ${
                  activeTab === "reports" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reports")}
              >
                📋 Laporan
              </button>
            </li>
          </ul>
        </aside>

        <div className="admin-content">
          {activeTab === "sales" && <AdminSales />}
          {activeTab === "users" && <AdminUsers />}
          {activeTab === "products" && <AdminProducts />}
          {activeTab === "reports" && <AdminReports />}
        </div>
      </div>
    </div>
  );
}
