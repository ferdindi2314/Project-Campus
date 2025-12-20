# Online Shop - E-Commerce Application

Aplikasi e-commerce modern yang dibangun dengan React, menampilkan katalog produk, keranjang belanja, autentikasi pengguna, dan panel administrasi lengkap untuk mengelola produk, pengguna, dan pesanan.

## 🎯 Fitur Utama

### Untuk Customer

- 🏠 **Home Page** - Landing page dengan featured products
- 📦 **Katalog Produk** - Browse produk dengan search dan filter
- 🔍 **Detail Produk** - Informasi lengkap dan rekomendasi produk terkait
- 🛒 **Shopping Cart** - Keranjang belanja dengan update quantity
- 💳 **Checkout** - Form pengiriman dan pemilihan metode pembayaran
- 👤 **User Authentication** - Login dan Register untuk pelanggan
- 📋 **User Profile** - Edit data profil pengguna
- 📜 **Order History** - Riwayat pesanan dan tracking status

### Untuk Admin

- 📊 **Dashboard** - Statistik penjualan dan overview
- 📦 **Manajemen Produk** - CRUD produk (Add, Edit, Delete)
- 👥 **Manajemen Pengguna** - Kelola data pengguna dan role
- 📋 **Manajemen Pesanan** - Lihat dan update status pesanan
- 📈 **Laporan Penjualan** - Analisis dan statistik penjualan

## 🛠️ Teknologi yang Digunakan

| Teknologi            | Versi  | Fungsi                  |
| -------------------- | ------ | ----------------------- |
| **React**            | 19.2.0 | UI Library              |
| **React Router DOM** | 7.10.1 | Routing & Navigation    |
| **Vite**             | 7.2.5  | Build tool & Dev Server |
| **CSS**              | -      | Styling                 |
| **Context API**      | -      | State Management        |

## 📂 Struktur Folder

```
src/
├── components/          # Reusable components (Navbar, Footer, LoginModal)
├── context/            # Context API (Auth, Cart, Products, Orders)
├── data/               # Static data (products, users)
├── pages/              # Page components (Home, Products, Cart, Admin, etc)
├── styles/             # Global styles
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd UASFrontEnd

# Install dependencies
npm install

# Start development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📖 Penggunaan

### Development Server

```bash
npm run dev
```

Buka browser ke `http://localhost:5173`

### Production Build

```bash
npm run build
```

Output build akan tersimpan di folder `dist/`

### Linting

```bash
npm run lint
```

## 🔐 Test Credentials

### Admin Account

- Email: `admin@shop.com`
- Password: `admin123`

### Customer Account (Demo)

- Email: `user@example.com`
- Password: `user123`

## 📁 Deskripsi File Penting

### Components

- **Navbar.jsx** - Navigasi utama dengan shopping cart icon
- **Footer.jsx** - Footer dengan informasi kontak
- **LoginModal.jsx** - Modal login yang reusable
- **CustomAlert.jsx** - Alert notification yang custom

### Context

- **AuthContext.jsx** - Manajemen autentikasi user
- **CartContext.jsx** - Manajemen shopping cart
- **ProductsContext.jsx** - Manajemen data produk
- **OrdersContext.jsx** - Manajemen data pesanan

### Pages

- **Home.jsx** - Halaman utama
- **Products.jsx** - Katalog produk
- **ProductDetail.jsx** - Detail produk individual
- **Cart.jsx** - Halaman keranjang belanja
- **Checkout.jsx** - Proses checkout
- **Admin.jsx** - Dashboard admin
- **AdminProducts.jsx** - Manajemen produk admin
- **AdminUsers.jsx** - Manajemen pengguna admin
- **AdminSales.jsx** - Laporan penjualan admin
- **UserProfile.jsx** - Profil pengguna
- **UserOrders.jsx** - Riwayat pesanan user

## 🎨 Responsive Design

Aplikasi ini fully responsive dan bekerja optimal di:

- 📱 Mobile (320px - 767px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (1025px+)

## 🔄 State Management

Aplikasi menggunakan **React Context API** untuk global state management:

```jsx
// Mengakses auth context
const { user, login, logout } = useContext(AuthContext);

// Mengakses cart context
const { cart, addToCart, removeFromCart } = useContext(CartContext);

// Mengakses products context
const { products, getProductById } = useContext(ProductsContext);

// Mengakses orders context
const { orders, createOrder } = useContext(OrdersContext);
```

## 🔗 Routing

Aplikasi menggunakan React Router v7 dengan route struktur berikut:

```
/                   - Home page
/products           - Product catalog
/product/:id        - Product detail
/cart               - Shopping cart
/checkout           - Checkout page
/login              - User login
/register           - User registration
/profile            - User profile
/orders             - Order history
/admin/login        - Admin login
/admin              - Admin dashboard
```

## 📝 Data Structure

### Product

```javascript
{
  id: number,
  name: string,
  price: number,
  category: string,
  image: string,
  description: string,
  stock: number
}
```

### User

```javascript
{
  id: number,
  name: string,
  email: string,
  password: string,
  role: 'user' | 'admin'
}
```

### Order

```javascript
{
  id: number,
  userId: number,
  items: Array<OrderItem>,
  total: number,
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled',
  shippingAddress: string,
  paymentMethod: string,
  createdAt: date
}
```

## 🌐 Deployment

### Netlify

1. Connect repository ke Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Vercel

1. Import project ke Vercel
2. Vercel akan auto-detect React + Vite setup
3. Deploy

## 📚 Pembelajaran & Konsep

Proyek ini mengimplementasikan:

- ✅ Component-based architecture
- ✅ Props dan state management
- ✅ React Hooks (useState, useContext, useEffect)
- ✅ React Router navigation
- ✅ Context API untuk global state
- ✅ Form handling & validation
- ✅ Conditional rendering
- ✅ Event handling
- ✅ CSS styling & responsive design
- ✅ LocalStorage persistence

## 🐛 Troubleshooting

### Port 5173 sudah terpakai

```bash
npm run dev -- --port 3000
```

### Module not found error

```bash
npm install
```

### Build error

```bash
npm run build
```

## 📄 License

Project ini dibuat untuk keperluan UAS Mata Kuliah Pemrograman Front-End.

## 👨‍💻 Author

Nama: [Isi nama kamu]  
NIM: [Isi NIM kamu]  
Kelas: [Isi kelas kamu]
