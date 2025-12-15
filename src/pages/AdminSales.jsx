import { useState, useEffect } from "react";

export function AdminSales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Ambil data dari localStorage atau buat sample data
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setSales(JSON.parse(savedOrders));
    } else {
      // Sample data
      setSales([
        {
          id: 1,
          orderId: "ORD-001",
          customer: "Ferdi",
          total: 2500000,
          status: "completed",
          date: new Date().toLocaleDateString("id-ID"),
          items: 3,
        },
        {
          id: 2,
          orderId: "ORD-002",
          customer: "Budi",
          total: 1500000,
          status: "pending",
          date: new Date().toLocaleDateString("id-ID"),
          items: 2,
        },
        {
          id: 3,
          orderId: "ORD-003",
          customer: "Ani",
          total: 3200000,
          status: "completed",
          date: new Date().toLocaleDateString("id-ID"),
          items: 4,
        },
      ]);
    }
  }, []);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalOrders = sales.length;
  const completedOrders = sales.filter((s) => s.status === "completed").length;

  return (
    <div>
      <h1>📈 Halaman Penjualan</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Penjualan</h3>
          <div className="value">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </div>
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
        {sales.length > 0 ? (
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
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.orderId}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.items}</td>
                  <td>Rp {sale.total.toLocaleString("id-ID")}</td>
                  <td>
                    <span
                      className={`status-badge status-${sale.status}`}
                    >
                      {sale.status === "completed"
                        ? "Selesai"
                        : "Menunggu"}
                    </span>
                  </td>
                  <td>{sale.date}</td>
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
