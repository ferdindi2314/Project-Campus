import { useMemo } from "react";
import { useOrders } from "../context/OrdersContext";

export function AdminSales() {
  const { orders, stats } = useOrders();

  const totalRevenue = stats.totalRevenue;
  const totalOrders = stats.totalOrders;
  const completedOrders = stats.completedOrders;

  return (
    <div>
      <h1>📈 Halaman Penjualan</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Penjualan</h3>
          <div className="value">Rp {totalRevenue.toLocaleString("id-ID")}</div>
        </div>
        <div className="stat-card">
          <h3>Total Order</h3>
          <div className="value">{totalOrders}</div>
        </div>
        <div className="stat-card">
          <h3>Order Selesai</h3>
          <div className="value">{completedOrders}</div>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="value">{totalOrders - completedOrders}</div>
        </div>
      </div>

      <div className="table-container">
        <h2>Daftar Penjualan Terbaru</h2>
        {orders.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.orderId}</td>
                  <td>{sale.customer}</td>
                  <td>
                    {Array.isArray(sale.items) ? sale.items.length : sale.items}
                  </td>
                  <td>Rp {sale.total.toLocaleString("id-ID")}</td>
                  <td>
                    <span className={`status-badge status-${sale.status}`}>
                      {sale.status === "completed" ? "Selesai" : "Menunggu"}
                    </span>
                  </td>
                  <td>{new Date(sale.date).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div style={{ fontSize: "2rem" }}>📭</div>
            <p>Belum ada penjualan</p>
          </div>
        )}
      </div>
    </div>
  );
}
