import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import "./Auth.css";

export function UserOrders() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login", { replace: true, state: { from: "/orders" } });
    return null;
  }

  const userOrders = orders.filter((o) => o.email === user.email);

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#f8f9fa" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h1>Pesanan Saya</h1>
          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Lanjut Belanja
          </button>
        </div>

        {userOrders.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "3rem 2rem",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ fontSize: "1.2rem", color: "#666" }}>
              Belum ada pesanan
            </p>
            <button
              onClick={() => navigate("/products")}
              style={{
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {userOrders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <p style={{ color: "#999", fontSize: "0.9rem", margin: 0 }}>
                      Nomor Pesanan
                    </p>
                    <p style={{ margin: 0, fontWeight: 800, color: "#667eea" }}>
                      {order.orderId}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#999", fontSize: "0.9rem", margin: 0 }}>
                      Tanggal
                    </p>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      {new Date(order.date).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#999", fontSize: "0.9rem", margin: 0 }}>
                      Total
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        color: "#28a745",
                      }}
                    >
                      Rp {order.total.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#999", fontSize: "0.9rem", margin: 0 }}>
                      Status
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#e6fffa",
                        color: "#047857",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {order.status === "completed" ? "Selesai" : "Menunggu"}
                    </span>
                  </div>
                </div>

                <div
                  style={{ borderTop: "1px solid #eee", paddingTop: "1rem" }}
                >
                  <p
                    style={{
                      color: "#999",
                      fontSize: "0.9rem",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    Item ({Array.isArray(order.items) ? order.items.length : 0})
                  </p>
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                      {order.items.map((item, idx) => (
                        <p
                          key={idx}
                          style={{
                            margin: 0,
                            color: "#666",
                            fontSize: "0.95rem",
                          }}
                        >
                          • {item.name} x{item.qty} - Rp{" "}
                          {(item.price * item.qty).toLocaleString("id-ID")}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#999" }}>Tidak ada item</p>
                  )}
                </div>

                <div
                  style={{
                    borderTop: "1px solid #eee",
                    paddingTop: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <p
                    style={{
                      color: "#999",
                      fontSize: "0.9rem",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    Metode Pembayaran
                  </p>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    {order.paymentMethod === "credit-card"
                      ? "Kartu Kredit"
                      : order.paymentMethod === "bank-transfer"
                      ? "Transfer Bank"
                      : "E-Wallet"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
