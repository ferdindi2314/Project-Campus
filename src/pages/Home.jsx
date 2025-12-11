import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { products } from "../data/products";

export const Home = () => {
  const [showBanner] = useState(true);

  return (
    <div className="home">
      {showBanner && (
        <div className="banner">
          <div className="banner-content">
            <h1>Selamat Datang di ITShop</h1>
            <p>
              Toko online terpercaya untuk elektronik dan aksesori berkualitas
            </p>
            <Link to="/products" className="banner-btn">
              Belanja Sekarang
            </Link>
          </div>
        </div>
      )}

      <section className="featured-section">
        <div className="container">
          <h2>Produk Pilihan</h2>
          <div className="featured-grid">
            {products.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card featured-card"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p className="price">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <p className="category">{product.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🚚</div>
              <h3>Pengiriman Cepat</h3>
              <p>Gratis ongkos kirim untuk pembelian di atas Rp 500.000</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🛡️</div>
              <h3>Terjamin Aman</h3>
              <p>Produk original dengan garansi resmi</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💳</div>
              <h3>Pembayaran Mudah</h3>
              <p>Berbagai metode pembayaran tersedia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
