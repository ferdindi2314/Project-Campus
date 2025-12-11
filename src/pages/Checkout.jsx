import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
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

  if (items.length === 0) {
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
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  const total = getTotalPrice();
  const tax = total * 0.1;
  const finalTotal = total + tax;

  if (isSuccess) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h1>Pesanan Berhasil!</h1>
            <p>Terima kasih atas pembelian Anda.</p>
            <p className="order-number">
              Nomor Pesanan: #{Math.floor(Math.random() * 1000000)}
            </p>
            <p className="redirect-message">
              Anda akan dialihkan ke beranda dalam 3 detik...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
