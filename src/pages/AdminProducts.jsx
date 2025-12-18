import { useState } from "react";
import { useProducts } from "../context/ProductsContext";

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [productList, setProductList] = useState(products);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const categories = [...new Set(products.map((p) => p.category))];
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  const handleSaveEdit = () => {
    updateProduct(editingId, { ...editData, id: editingId });
    setEditingId(null);
    setEditData(null);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin hapus produk ini?")) {
      deleteProduct(id);
    }
  };

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.category &&
      newProduct.stock
    ) {
      const payload = {
        ...newProduct,
        price: parseInt(newProduct.price, 10),
        stock: parseInt(newProduct.stock, 10),
      };
      addProduct(payload);
      setNewProduct({
        name: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>📦 Manajemen Produk</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "❌ Batal" : "➕ Tambah Produk"}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: "#f8f9fa",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          <h3>Tambah Produk Baru</h3>
          <div className="admin-form-grid">
            <input
              type="text"
              placeholder="Nama Produk"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            <input
              type="number"
              placeholder="Harga"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
                background: "white",
              }}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            <input
              type="text"
              placeholder="URL Gambar"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
                gridColumn: "1 / -1",
              }}
            />
            <button
              onClick={handleAddProduct}
              style={{
                gridColumn: "1 / -1",
                padding: "0.75rem",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              ✅ Tambah Produk
            </button>
          </div>
        </div>
      )}

      <div className="table-container">
        <h2>Daftar Produk</h2>
        {products.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Kategori</th>
                <th>Stock</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  {editingId === product.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              name: e.target.value,
                            })
                          }
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editData.price}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              price: e.target.value,
                            })
                          }
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editData.category}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              category: e.target.value,
                            })
                          }
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editData.stock}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              stock: e.target.value,
                            })
                          }
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                          }}
                        />
                      </td>
                      <td>
                        <button
                          onClick={handleSaveEdit}
                          className="btn-small"
                          style={{
                            background: "#28a745",
                            color: "white",
                          }}
                        >
                          ✅ Simpan
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="btn-small"
                          style={{
                            background: "#6c757d",
                            color: "white",
                            marginLeft: "0.25rem",
                          }}
                        >
                          ❌ Batal
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{product.name}</td>
                      <td>Rp {product.price.toLocaleString("id-ID")}</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEdit(product)}
                            className="btn-edit"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="btn-delete"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div style={{ fontSize: "2rem" }}>📭</div>
            <p>Tidak ada produk</p>
          </div>
        )}
      </div>
    </div>
  );
}
