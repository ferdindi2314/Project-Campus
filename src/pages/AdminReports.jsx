import { useMemo } from "react";

export function AdminReports() {
  const stats = useMemo(() => {
    // Data simulasi dari localStorage atau hardcode
    const savedOrders = localStorage.getItem("orders");
    const orders = savedOrders ? JSON.parse(savedOrders) : [];

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrder = orders.length > 0 ? totalRevenue / orders.length : 0;
    const monthlyData = {
      January: 5200000,
      February: 4800000,
      March: 6100000,
      April: 5500000,
      May: 7200000,
      June: 6800000,
    };

    const categoryData = {
      Laptop: 12,
      Desktop: 8,
      Monitor: 15,
      Keyboard: 20,
      Mouse: 18,
    };

    return {
      totalRevenue,
      averageOrder,
      monthlyData,
      categoryData,
      totalOrders: orders.length,
    };
  }, []);

  return (
    <div>
      <h1>📋 Laporan & Analitik</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="value">
            Rp {stats.totalRevenue.toLocaleString("id-ID")}
          </div>
        </div>
        <div className="stat-card">
          <h3>Average Order Value</h3>
          <div className="value">
            Rp {Math.round(stats.averageOrder).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <div className="value">{stats.totalOrders}</div>
        </div>
        <div className="stat-card">
          <h3>Growth</h3>
          <div className="value">↑ 12.5%</div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Penjualan Bulanan</h2>
        <div className="chart-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Bulan</th>
                <th>Total Penjualan</th>
                <th>Visualisasi</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.monthlyData).map(([month, value]) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>Rp {value.toLocaleString("id-ID")}</td>
                  <td>
                    <div
                      style={{
                        background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                        height: "30px",
                        borderRadius: "4px",
                        width: `${(value / 7200000) * 300}px`,
                        minWidth: "5px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Penjualan per Kategori</h2>
        <div className="chart-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Jumlah Terjual</th>
                <th>Visualisasi</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.categoryData).map(([category, count]) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{count} unit</td>
                  <td>
                    <div
                      style={{
                        background: "linear-gradient(90deg, #17a2b8 0%, #138496 100%)",
                        height: "30px",
                        borderRadius: "4px",
                        width: `${(count / 20) * 300}px`,
                        minWidth: "5px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Ringkasan Performa</h2>
        <div className="chart-container">
          <ul style={{ lineHeight: "1.8" }}>
            <li>
              ✅ <strong>Total Penjualan:</strong> Rp{" "}
              {stats.totalRevenue.toLocaleString("id-ID")}
            </li>
            <li>
              ✅ <strong>Rata-rata Order:</strong> Rp{" "}
              {Math.round(stats.averageOrder).toLocaleString("id-ID")}
            </li>
            <li>
              ✅ <strong>Kategori Terlaris:</strong> Keyboard (20 unit)
            </li>
            <li>
              ✅ <strong>Bulan Terbaik:</strong> May (Rp 7.200.000)
            </li>
            <li>
              ✅ <strong>Growth Rate:</strong> 12.5% (YoY)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
