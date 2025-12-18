import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export function AdminUsers() {
  const { users, register, updateProfile, deleteUser } = useAuth();
  const [localUsers, setLocalUsers] = useState(users);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) return;
    const result = register({ ...newUser }, { autoLogin: false });
    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("User berhasil ditambahkan");
      setLocalUsers([
        ...users,
        { ...newUser, role: "customer", id: result.user.id },
      ]);
      setNewUser({ name: "", email: "", password: "" });
    }
  };

  const handleSave = () => {
    if (!editData) return;
    const result = updateProfile({
      name: editData.name,
      targetId: editData.id,
    });
    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("User diperbarui");
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditData({ ...user });
  };

  return (
    <div>
      <div className="admin-header">
        <h1>👥 Kelola User</h1>
      </div>
      {message && (
        <div className="auth-alert" style={{ marginBottom: "1rem" }}>
          {message}
        </div>
      )}

      <div className="table-container">
        <h2>Daftar User</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {localUsers
              .filter((u) => u.role !== "admin")
              .map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  {editingId === u.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                          }}
                        />
                      </td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <button
                          className="btn-small"
                          style={{ background: "#28a745", color: "white" }}
                          onClick={handleSave}
                        >
                          ✅ Simpan
                        </button>
                        <button
                          className="btn-small"
                          style={{
                            background: "#6c757d",
                            color: "white",
                            marginLeft: "0.25rem",
                          }}
                          onClick={() => {
                            setEditingId(null);
                            setEditData(null);
                          }}
                        >
                          ❌ Batal
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        {u.role === "admin" ? (
                          <span className="status-badge status-completed">
                            Admin
                          </span>
                        ) : (
                          <div className="action-buttons">
                            <button
                              className="btn-edit"
                              onClick={() => handleEditClick(u)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => {
                                if (confirm("Hapus user ini?")) {
                                  const res = deleteUser(u.id);
                                  if (!res.success) {
                                    setMessage(res.message);
                                  }
                                }
                              }}
                            >
                              🗑️ Hapus
                            </button>
                          </div>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "2rem",
          background: "#f8f9fa",
          padding: "1.5rem",
          borderRadius: "8px",
        }}
      >
        <h3>Tambah User</h3>
        <form className="admin-form-grid-full" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Nama"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="auth-input"
          />
          <button
            type="submit"
            className="auth-button"
            style={{ gridColumn: "1 / -1" }}
          >
            Tambah User
          </button>
        </form>
      </div>
    </div>
  );
}
