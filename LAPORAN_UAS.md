# LAPORAN UAS PEMROGRAMAN FRONT-END
## APLIKASI E-COMMERCE ONLINE SHOP

---

## 1. TUJUAN

Tujuan dari pembuatan aplikasi ini adalah:

1. **Memenuhi Tugas Akhir Semester (UAS)** mata kuliah Pemrograman Front-End
2. **Mengimplementasikan konsep React.js** dalam pengembangan aplikasi web modern yang interaktif dan responsif
3. **Membangun aplikasi e-commerce lengkap** dengan fitur-fitur seperti:
   - Katalog produk dengan sistem pencarian dan filtering
   - Keranjang belanja (shopping cart)
   - Proses checkout dan pembayaran
   - Sistem autentikasi pengguna (login/register)
   - Panel administrasi untuk mengelola produk, pengguna, dan transaksi
4. **Menerapkan best practices** dalam pengembangan aplikasi React seperti:
   - Component-based architecture
   - State management dengan Context API
   - React Router untuk navigasi
   - Responsive design untuk berbagai ukuran layar
5. **Mengembangkan pemahaman** tentang full-stack development dengan fokus pada bagian front-end

---

## 2. TEKNOLOGI YANG DIGUNAKAN

### Core Technologies

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React** | 19.2.0 | Library JavaScript untuk membangun user interface |
| **Vite** | 7.2.5 | Build tool dan development server yang cepat |
| **React Router DOM** | 7.10.1 | Routing dan navigasi antar halaman |

### Development Tools

| Tool | Versi | Fungsi |
|------|-------|--------|
| **ESLint** | 9.39.1 | Linting dan code quality checker |
| **TypeScript** | 5.9.3 | Type checking untuk JavaScript |
| **Node.js** | - | Runtime environment |

### State Management & Context

- **React Context API** - Untuk global state management:
  - `AuthContext` - Manajemen autentikasi pengguna
  - `CartContext` - Manajemen keranjang belanja
  - `ProductsContext` - Manajemen data produk
  - `OrdersContext` - Manajemen data pesanan

### Styling

- **CSS Modules** - Untuk styling komponen
- **Custom CSS** - Styling kustom untuk setiap komponen

---

## 3. STRUKTUR FOLDER

```
UASFrontEnd/
│
├── public/                      # Static assets
│   └── _redirects              # Netlify redirects config
│
├── src/                        # Source code
│   ├── assets/                 # Gambar, ikon, dll
│   │
│   ├── components/             # Reusable components
│   │   ├── Navbar.jsx         # Komponen navigasi
│   │   ├── Navbar.css
│   │   ├── Footer.jsx         # Komponen footer
│   │   ├── Footer.css
│   │   ├── LoginModal.jsx     # Modal login
│   │   ├── LoginModal.css
│   │   ├── CustomAlert.jsx    # Komponen alert kustom
│   │   └── CustomAlert.css
│   │
│   ├── context/               # Context API providers
│   │   ├── AuthContext.jsx    # Context autentikasi
│   │   ├── CartContext.jsx    # Context keranjang
│   │   ├── ProductsContext.jsx # Context produk
│   │   └── OrdersContext.jsx  # Context pesanan
│   │
│   ├── data/                  # Data statis
│   │   ├── products.js        # Data produk
│   │   └── users.js           # Data pengguna
│   │
│   ├── pages/                 # Halaman aplikasi
│   │   ├── Home.jsx           # Halaman utama
│   │   ├── Home.css
│   │   ├── Products.jsx       # Katalog produk
│   │   ├── Products.css
│   │   ├── ProductDetail.jsx  # Detail produk
│   │   ├── ProductDetail.css
│   │   ├── Cart.jsx           # Keranjang belanja
│   │   ├── Cart.css
│   │   ├── Checkout.jsx       # Halaman checkout
│   │   ├── Checkout.css
│   │   ├── UserLogin.jsx      # Login pengguna
│   │   ├── UserRegister.jsx   # Registrasi pengguna
│   │   ├── UserProfile.jsx    # Profil pengguna
│   │   ├── UserOrders.jsx     # Riwayat pesanan
│   │   ├── AdminLogin.jsx     # Login admin
│   │   ├── Admin.jsx          # Dashboard admin
│   │   ├── Admin.css
│   │   ├── AdminProducts.jsx  # Manajemen produk
│   │   ├── AdminUsers.jsx     # Manajemen pengguna
│   │   ├── AdminSales.jsx     # Laporan penjualan
│   │   ├── AdminReports.jsx   # Laporan lengkap
│   │   └── Auth.css
│   │
│   ├── styles/                # Global styles
│   │
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styling
│   ├── main.jsx               # Entry point
│   └── index.css              # Global CSS
│
├── eslint.config.js           # ESLint configuration
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies & scripts
├── index.html                 # HTML template
├── README.md                  # Project documentation
└── TODO.md                    # Task list

```

---

## 4. SCREENSHOT APLIKASI

### Halaman Utama (Home)
```
[Screenshot: Tampilan landing page dengan banner, featured products, dan navigasi]
- Hero section dengan tagline
- Featured products section
- Kategori produk
- Call-to-action buttons
```

### Halaman Katalog Produk
```
[Screenshot: Grid produk dengan filter dan search]
- Grid layout produk
- Search bar untuk pencarian produk
- Filter berdasarkan kategori dan harga
- Tombol "Add to Cart" pada setiap produk
```

### Halaman Detail Produk
```
[Screenshot: Detail produk dengan gambar, deskripsi, dan tombol beli]
- Gambar produk besar
- Informasi detail (nama, harga, deskripsi, stok)
- Tombol tambah ke keranjang dengan quantity selector
- Produk terkait
```

### Keranjang Belanja
```
[Screenshot: Daftar produk di keranjang dengan total harga]
- Daftar item di keranjang
- Quantity adjustment (+/-)
- Remove item button
- Subtotal per item
- Total harga keseluruhan
- Tombol proceed to checkout
```

### Halaman Checkout
```
[Screenshot: Form checkout dengan ringkasan pesanan]
- Form data pengiriman (nama, alamat, telepon)
- Metode pembayaran
- Ringkasan pesanan
- Total pembayaran
- Tombol konfirmasi pesanan
```

### Login & Register
```
[Screenshot: Form login dan registrasi]
- Form input email/username dan password
- Validasi form
- Link ke halaman register/login
- Tombol submit
```

### Profil Pengguna
```
[Screenshot: Halaman profil dengan data user]
- Informasi pengguna (nama, email, alamat)
- Riwayat pembelian
- Tombol edit profil
```

### Riwayat Pesanan
```
[Screenshot: Daftar pesanan pengguna]
- List semua pesanan
- Status pesanan (pending, processing, completed)
- Detail per pesanan
- Invoice/detail button
```

### Dashboard Admin
```
[Screenshot: Dashboard admin dengan statistik]
- Statistik penjualan (total revenue, orders, customers)
- Grafik penjualan
- Recent orders table
- Quick actions menu
```

### Admin - Manajemen Produk
```
[Screenshot: CRUD produk]
- Tabel daftar produk
- Tombol tambah produk baru
- Edit dan delete button per produk
- Form add/edit produk
```

### Admin - Manajemen Pengguna
```
[Screenshot: Daftar pengguna]
- Tabel data pengguna
- Informasi role (user/admin)
- Action buttons (edit, delete, change role)
```

### Admin - Laporan Penjualan
```
[Screenshot: Laporan dan statistik]
- Grafik penjualan per periode
- Top selling products
- Revenue summary
- Export to PDF/Excel button
```

---

## 5. PENJELASAN FITUR

### A. Fitur Pengguna (Customer)

#### 1. Autentikasi Pengguna
- **Register**: Pengguna baru dapat mendaftar dengan mengisi form (nama, email, password)
- **Login**: Pengguna terdaftar dapat login untuk mengakses fitur-fitur pribadi
- **Logout**: Pengguna dapat keluar dari akun mereka
- **Protected Routes**: Halaman tertentu hanya dapat diakses setelah login

#### 2. Katalog Produk
- **Browse Products**: Menampilkan semua produk dalam grid layout
- **Search**: Pencarian produk berdasarkan nama
- **Filter**: Filter produk berdasarkan:
  - Kategori (Elektronik, Fashion, Rumah Tangga, dll)
  - Range harga (min-max)
- **Sort**: Urutkan produk berdasarkan harga (rendah-tinggi, tinggi-rendah)

#### 3. Detail Produk
- Menampilkan informasi lengkap produk:
  - Gambar produk
  - Nama dan harga
  - Deskripsi detail
  - Stok tersedia
  - Rating dan review (jika ada)
- Tombol "Add to Cart" dengan quantity selector
- Produk rekomendasi/terkait

#### 4. Keranjang Belanja (Shopping Cart)
- **Add to Cart**: Menambahkan produk ke keranjang
- **Update Quantity**: Mengubah jumlah item (+/-)
- **Remove Item**: Menghapus item dari keranjang
- **Cart Summary**: Menampilkan:
  - Subtotal per item
  - Total item
  - Grand total
- **Persist Cart**: Keranjang tersimpan menggunakan localStorage

#### 5. Checkout & Payment
- **Form Pengiriman**: Input data pengiriman (nama, alamat, kota, kode pos, telepon)
- **Pilih Metode Pembayaran**: 
  - Transfer Bank
  - E-wallet (GoPay, OVO, Dana)
  - COD (Cash on Delivery)
- **Order Summary**: Ringkasan pesanan sebelum konfirmasi
- **Place Order**: Konfirmasi dan buat pesanan
- **Order Confirmation**: Halaman konfirmasi setelah order berhasil

#### 6. Profil Pengguna
- Menampilkan informasi profil pengguna
- Edit data profil (nama, alamat, telepon)
- Ganti password
- View account info

#### 7. Riwayat Pesanan
- Daftar semua pesanan pengguna
- Status tracking:
  - **Pending**: Menunggu konfirmasi
  - **Processing**: Sedang diproses
  - **Shipped**: Dalam pengiriman
  - **Completed**: Selesai
  - **Cancelled**: Dibatalkan
- Detail per pesanan (items, total, tanggal)
- Download invoice/receipt

### B. Fitur Admin

#### 1. Dashboard Admin
- **Overview Statistics**:
  - Total Revenue
  - Total Orders
  - Total Customers
  - Total Products
- **Charts & Graphs**: Visualisasi data penjualan
- **Recent Orders**: Daftar pesanan terbaru
- **Quick Actions**: Shortcut ke fitur-fitur admin

#### 2. Manajemen Produk
- **View All Products**: Tabel daftar semua produk
- **Add Product**: Tambah produk baru dengan form:
  - Nama produk
  - Kategori
  - Harga
  - Stok
  - Deskripsi
  - Upload gambar
- **Edit Product**: Update informasi produk
- **Delete Product**: Hapus produk (dengan konfirmasi)
- **Search & Filter**: Cari dan filter produk dalam admin panel

#### 3. Manajemen Pengguna
- **View All Users**: Tabel daftar pengguna
- **User Details**: Informasi lengkap pengguna
- **Change Role**: Ubah role user (User ↔ Admin)
- **Delete User**: Hapus pengguna
- **Search Users**: Cari pengguna berdasarkan nama/email

#### 4. Manajemen Pesanan
- **View All Orders**: Daftar semua pesanan
- **Order Details**: Detail lengkap pesanan
- **Update Status**: Ubah status pesanan
- **Filter Orders**: Filter berdasarkan status, tanggal
- **Search Orders**: Cari pesanan berdasarkan ID/customer

#### 5. Laporan Penjualan
- **Sales Report**: Laporan penjualan per periode
- **Revenue Analytics**: Analisis pendapatan
- **Top Products**: Produk terlaris
- **Customer Analytics**: Analisis pelanggan
- **Export Reports**: Export laporan ke PDF/Excel

### C. Fitur Umum

#### 1. Responsive Design
- Tampilan optimal di berbagai ukuran layar:
  - Desktop (1920px+)
  - Laptop (1366px - 1920px)
  - Tablet (768px - 1365px)
  - Mobile (320px - 767px)

#### 2. Navigation
- **Navbar**: Menu navigasi utama
  - Logo/Brand
  - Menu links (Home, Products, Cart)
  - User menu (Login/Profile)
  - Cart icon dengan badge counter
- **Footer**: Informasi kontak, sosial media, copyright

#### 3. Notifications & Alerts
- **Success alerts**: Konfirmasi aksi berhasil
- **Error alerts**: Pesan error
- **Warning alerts**: Peringatan
- **Info alerts**: Informasi umum

#### 4. Loading States
- Loading spinner saat fetch data
- Skeleton loading untuk UX yang lebih baik
- Disabled state pada button saat proses

#### 5. Form Validation
- Validasi input di semua form
- Error messages yang jelas
- Required field indicators
- Format validation (email, phone, etc)

---

## 6. LINK DEPLOY

### Production URL
```
https://[your-app-name].netlify.app
```
atau
```
https://[your-app-name].vercel.app
```

### Deployment Information
- **Platform**: Netlify / Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x atau lebih tinggi

### Cara Mengakses

#### Login sebagai Admin:
- Email: `admin@shop.com`
- Password: `admin123`

#### Login sebagai User (Demo):
- Email: `user@example.com`
- Password: `user123`

---

## 7. KESIMPULAN

### Pencapaian

Aplikasi e-commerce Online Shop ini telah berhasil dikembangkan dengan mengimplementasikan berbagai fitur yang dibutuhkan dalam sebuah aplikasi toko online modern. Beberapa pencapaian utama meliputi:

1. **Implementasi React yang Solid**
   - Berhasil menerapkan component-based architecture
   - Penggunaan React Hooks untuk state management
   - Implementasi Context API untuk global state

2. **Fitur Lengkap**
   - Sistem autentikasi untuk user dan admin
   - CRUD operations untuk produk, user, dan orders
   - Shopping cart yang fungsional dengan persistence
   - Checkout flow yang lengkap
   - Admin panel yang comprehensive

3. **User Experience yang Baik**
   - Responsive design untuk semua device
   - Navigasi yang intuitif
   - Loading states dan error handling
   - Form validation yang proper

4. **Clean Code & Best Practices**
   - Struktur folder yang terorganisir
   - Reusable components
   - Separation of concerns
   - Code yang mudah di-maintain

### Pembelajaran

Melalui proyek ini, telah dipelajari dan dipraktikkan:

1. **React Fundamentals**
   - Component lifecycle
   - Props dan state management
   - Event handling
   - Conditional rendering

2. **Advanced React Concepts**
   - Context API untuk state management
   - React Router untuk routing
   - Custom hooks
   - Performance optimization

3. **Web Development Best Practices**
   - Responsive web design
   - Form handling dan validation
   - Error handling
   - Data persistence dengan localStorage

4. **Project Management**
   - Planning dan struktur project
   - Version control dengan Git
   - Deployment ke production

### Tantangan yang Dihadapi

1. **State Management**: Mengelola state yang kompleks di berbagai komponen memerlukan perencanaan yang matang
2. **Routing**: Mengimplementasikan protected routes dan nested routes
3. **Data Persistence**: Menyimpan dan sinkronisasi data antara localStorage dan state
4. **Responsive Design**: Memastikan tampilan optimal di semua ukuran layar

### Pengembangan Selanjutnya

Beberapa fitur yang dapat dikembangkan di masa mendatang:

1. **Backend Integration**
   - Koneksi ke REST API atau GraphQL
   - Database untuk persistent storage
   - Real-time updates dengan WebSocket

2. **Payment Gateway**
   - Integrasi dengan payment provider (Midtrans, Stripe, dll)
   - Real payment processing

3. **Advanced Features**
   - Wishlist functionality
   - Product reviews dan ratings
   - Live chat support
   - Email notifications
   - Multi-language support

4. **Performance Optimization**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Caching strategies

5. **Security Enhancements**
   - JWT authentication
   - HTTPS enforcement
   - XSS protection
   - CSRF tokens

### Penutup

Proyek UAS Pemrograman Front-End ini memberikan pengalaman praktis yang berharga dalam mengembangkan aplikasi web modern menggunakan React. Aplikasi yang dihasilkan tidak hanya memenuhi requirements teknis, tetapi juga mengimplementasikan best practices dalam web development.

Pengalaman ini memperkuat pemahaman tentang bagaimana membangun aplikasi yang scalable, maintainable, dan user-friendly. Ke depannya, pengetahuan dan skill yang didapat dari proyek ini akan sangat berguna untuk pengembangan aplikasi web yang lebih kompleks dan profesional.

---

**Disusun oleh:**  
[Nama Anda]  
[NIM]  
[Kelas]  

**Mata Kuliah:**  
Pemrograman Front-End  

**Dosen Pengampu:**  
[Nama Dosen]  

**Tanggal:**  
20 Desember 2025

---

