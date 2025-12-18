import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found">
            <h1>Produk Tidak Ditemukan</h1>
            <Link to="/products" className="back-link">
              ← Kembali ke Produk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/products" className="back-link">
          ← Kembali ke Produk
        </Link>

        <div className="product-detail-container">
          <div className="product-image-section">
            <img
              src={product.image}
              alt={product.name}
              className="detail-image"
            />
          </div>

          <div className="product-info-section">
            <h1>{product.name}</h1>
            <p className="category-badge">{product.category}</p>
            <p className="description">{product.description}</p>

            <div className="price-section">
              <span className="price">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
              <span
                className={`stock ${
                  product.stock > 0 ? "in-stock" : "out-of-stock"
                }`}
              >
                {product.stock > 0 ? `${product.stock} Tersedia` : "Stok Habis"}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="quantity-section">
                <label>Jumlah:</label>
                <div className="quantity-control">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input type="number" value={quantity} readOnly />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <span className="quantity-info">
                  Total: Rp {(product.price * quantity).toLocaleString("id-ID")}
                </span>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`add-to-cart-btn ${addedToCart ? "added" : ""}`}
            >
              {addedToCart
                ? "✓ Ditambahkan ke Keranjang"
                : "🛒 Tambah ke Keranjang"}
            </button>

            {addedToCart && (
              <p className="added-message">
                {quantity}x {product.name} telah ditambahkan ke keranjang
              </p>
            )}

            {addedToCart && (
              <button
                onClick={() => navigate("/cart")}
                className="checkout-btn"
              >
                Lanjut ke Keranjang
              </button>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>Produk Serupa</h2>
            <div className="products-grid">
              {relatedProducts.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="product-card"
                >
                  <img src={p.image} alt={p.name} className="product-image" />
                  <h3>{p.name}</h3>
                  <p className="price">Rp {p.price.toLocaleString("id-ID")}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
