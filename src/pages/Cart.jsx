import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Keranjang Belanja</h1>
          <div className="empty-cart">
            <p>Keranjang Anda kosong</p>
            <Link to="/products" className="continue-shopping-btn">
              Lanjutkan Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Keranjang Belanja</h1>

        <div className="cart-container">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Subtotal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.product.id}>
                    <td className="product-info">
                      <img src={item.product.image} alt={item.product.name} />
                      <div>
                        <h4>{item.product.name}</h4>
                        <p>{item.product.category}</p>
                      </div>
                    </td>
                    <td className="price">
                      Rp {item.product.price.toLocaleString("id-ID")}
                    </td>
                    <td className="quantity">
                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="subtotal">
                      Rp{" "}
                      {(item.product.price * item.quantity).toLocaleString(
                        "id-ID"
                      )}
                    </td>
                    <td className="action">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="cart-summary">
            <h2>Ringkasan Belanja</h2>
            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal ({items.length} item):</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
              <div className="summary-row">
                <span>Ongkir:</span>
                <span className="free">Gratis</span>
              </div>
              <div className="summary-row">
                <span>Pajak:</span>
                <span>Rp {(total * 0.1).toLocaleString("id-ID")}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>Rp {(total * 1.1).toLocaleString("id-ID")}</span>
              </div>
              <Link to="/checkout" className="checkout-btn">
                Lanjut ke Pembayaran
              </Link>
              <Link to="/products" className="continue-shopping-btn">
                Lanjutkan Belanja
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
