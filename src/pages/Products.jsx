import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import "./Products.css";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const categories = ["", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchSearch && matchCategory;
    });

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="products-page">
      <div className="products-container">
        <aside className="sidebar">
          <h2>Filter</h2>

          <div className="filter-group">
            <label>Pencarian</label>
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category || "Semua Kategori"}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Urutkan</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Nama (A-Z)</option>
              <option value="price-asc">Harga (Terendah)</option>
              <option value="price-desc">Harga (Tertinggi)</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setSortBy("name");
            }}
            className="reset-btn"
          >
            Reset Filter
          </button>
        </aside>

        <main className="products-main">
          <h1>Produk Kami ({filteredProducts.length})</h1>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>Tidak ada produk yang sesuai dengan pencarian Anda</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-card"
                >
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    {product.stock === 0 && (
                      <div className="out-of-stock">Stok Habis</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <p className="category">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
