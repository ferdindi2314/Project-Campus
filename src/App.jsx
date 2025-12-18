import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Admin } from "./pages/Admin";
import { AdminLogin } from "./pages/AdminLogin";
import { UserLogin } from "./pages/UserLogin";
import { UserRegister } from "./pages/UserRegister";
import { UserProfile } from "./pages/UserProfile";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <div className="app-shell">
            <Navbar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />
                <Route
                  path="*"
                  element={
                    <div style={{ textAlign: "center", padding: "4rem" }}>
                      <h1>404 - Halaman Tidak Ditemukan</h1>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
