import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import "./Checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "credit-card",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Jika checkout sudah berhasil, tampilkan success page dulu
  if (isSuccess && successData) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#28a745",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                ✓
              </div>
              <h1 style={{ margin: 0 }}>Barang Berhasil di Checkout!</h1>
            </div>
            <p style={{ color: "#666", marginBottom: "1.5rem" }}>
              Terima kasih atas pembelian Anda. Pesanan Anda telah kami terima.
            </p>

            <div
              style={{
                background: "#f8f9fa",
                padding: "1.5rem",
                borderRadius: "8px",
                marginBottom: "2rem",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Nomor Pesanan</h3>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "#667eea",
                  margin: 0,
                }}
              >
                {successData.orderId}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <div>
                <h3>Data Pengiriman</h3>
                <p>
                  <strong>Nama:</strong> {successData.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {successData.email}
                </p>
                <p>
                  <strong>Telepon:</strong> {successData.phone}
                </p>
                <p>
                  <strong>Alamat:</strong> {successData.address}
                </p>
                <p>
                  <strong>Kota:</strong> {successData.city}
                </p>
                <p>
                  <strong>Kode Pos:</strong> {successData.zipCode}
                </p>
              </div>
              <div>
                <h3>Pembayaran</h3>
                <p>
                  <strong>Metode:</strong>
                  {successData.paymentMethod === "credit-card"
                    ? " Kartu Kredit"
                    : successData.paymentMethod === "bank-transfer"
                    ? " Transfer Bank"
                    : " E-Wallet"}
                </p>
                <p>
                  <strong>Total Harga:</strong> Rp{" "}
                  {successData.total.toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Jumlah Item:</strong> {successData.itemCount}
                </p>
              </div>
            </div>

            <div
              style={{
                background: "#f8f9fa",
                padding: "1.5rem",
                borderRadius: "8px",
                marginBottom: "2rem",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Item yang Dipesan</h3>
              {successData.items.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <div>
                    <p style={{ margin: "0.25rem 0", fontWeight: 600 }}>
                      {item.product.name}
                    </p>
                    <p
                      style={{
                        margin: "0.25rem 0",
                        color: "#666",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.product.category} x{item.quantity}
                    </p>
                  </div>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    Rp{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button
                onClick={() => navigate("/orders")}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Lihat Pesanan Saya
              </button>
              <button
                onClick={() => navigate("/")}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  background: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cek apakah keranjang kosong (hanya saat belum checkout)
  if (items.length === 0 && !isSuccess) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <p>Keranjang Anda kosong</p>
            <button
              onClick={() => navigate("/products")}
              className="continue-btn"
            >
              Kembali ke Produk
            </button>
          </div>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Nomor telepon harus minimal 10 digit";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Alamat harus diisi";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Kota harus diisi";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Kode pos harus diisi";
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Kode pos harus 5 digit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const total = getTotalPrice();
      const orderId = `ORD-${String(Date.now()).slice(-6)}`;
      const orderPayload = {
        customer: formData.fullName,
        email: formData.email,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          qty: i.quantity,
          category: i.product.category,
        })),
        total: total * 1.1,
        paymentMethod: formData.paymentMethod,
      };
      addOrder(orderPayload);
      setIsSubmitting(false);
      const displayItems = items.map((i) => ({
        product: {
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          category: i.product.category,
        },
        quantity: i.quantity,
      }));
      setSuccessData({
        ...formData,
        items: displayItems,
        total: total * 1.1,
        orderId,
        itemCount: items.length,
      });
      setIsSuccess(true);
      clearCart();
    }, 1200);
  };

  const total = getTotalPrice();
  const tax = total * 0.1;
  const finalTotal = total + tax;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <div className="checkout-container">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <fieldset>
                <legend>Data Pengiriman</legend>

                <div className="form-group">
                  <label>Nama Lengkap *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? "error" : ""}`}
                    placeholder="Masukkan nama lengkap"
                  />
                  {errors.fullName && (
                    <span className="error-message">{errors.fullName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="Masukkan email"
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Nomor Telepon *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    placeholder="Masukkan nomor telepon"
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Alamat Lengkap *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-input ${errors.address ? "error" : ""}`}
                    placeholder="Masukkan alamat lengkap"
                    rows={4}
                  />
                  {errors.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kota *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`form-input ${errors.city ? "error" : ""}`}
                      placeholder="Masukkan kota"
                    />
                    {errors.city && (
                      <span className="error-message">{errors.city}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Kode Pos *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`form-input ${errors.zipCode ? "error" : ""}`}
                      placeholder="00000"
                    />
                    {errors.zipCode && (
                      <span className="error-message">{errors.zipCode}</span>
                    )}
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Metode Pembayaran</legend>

                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleChange}
                    />
                    <span>Kartu Kredit</span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === "bank-transfer"}
                      onChange={handleChange}
                    />
                    <span>Transfer Bank</span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ewallet"
                      checked={formData.paymentMethod === "ewallet"}
                      onChange={handleChange}
                    />
                    <span>E-Wallet</span>
                  </label>
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? "Memproses..." : "Selesaikan Pesanan"}
              </button>
            </form>
          </div>

          <aside className="order-summary">
            <h2>Ringkasan Pesanan</h2>

            <div className="order-items">
              {items.map((item) => (
                <div key={item.product.id} className="order-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="item-details">
                    <h4>{item.product.name}</h4>
                    <p>
                      {item.quantity}x Rp{" "}
                      {item.product.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="item-total">
                    Rp{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
              <div className="total-row">
                <span>Pajak (10%):</span>
                <span>Rp {tax.toLocaleString("id-ID")}</span>
              </div>
              <div className="total-row">
                <span>Ongkir:</span>
                <span className="free">Gratis</span>
              </div>
              <div className="total-row final">
                <span>Total Pembayaran:</span>
                <span>Rp {finalTotal.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
