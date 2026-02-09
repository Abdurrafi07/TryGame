# 🎮 Sampah-ku - Game Edukasi Pilah Sampah

Game edukasi 3D berbasis web untuk belajar memilah sampah dengan benar menggunakan Three.js.

## 🎯 Cara Bermain

- **Hijau** 🗑️ untuk Sampah Organik 🍎
- **Kuning** 🗑️ untuk Sampah Plastik 🧴
- **Biru** 🗑️ untuk Sampah Kertas 📄

## 🚀 Cara Deploy/Hosting

### Opsi 1: GitHub Pages (Recommended)

1. **Buat Repository di GitHub**
   - Buka [github.com](https://github.com) dan login
   - Klik tombol **New** untuk membuat repository baru
   - Beri nama repository (contoh: `sampah-ku-game`)
   - Pilih **Public**
   - Klik **Create repository**

2. **Upload File ke GitHub**
   
   Di folder `c:\TryGame`, jalankan perintah berikut di terminal:
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sampah-ku game"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
   git push -u origin main
   ```
   
   *Ganti `USERNAME` dengan username GitHub Anda dan `REPOSITORY-NAME` dengan nama repository yang Anda buat*

3. **Aktifkan GitHub Pages**
   - Buka repository Anda di GitHub
   - Klik **Settings** > **Pages**
   - Di bagian **Source**, pilih branch **main** dan folder **/ (root)**
   - Klik **Save**
   - Tunggu beberapa menit, game Anda akan tersedia di: `https://USERNAME.github.io/REPOSITORY-NAME/`

### Opsi 2: Netlify (Paling Mudah)

1. **Buka Netlify**
   - Kunjungi [netlify.com](https://www.netlify.com/)
   - Daftar/Login dengan GitHub atau email

2. **Deploy dengan Drag & Drop**
   - Di dashboard Netlify, cari area **"Want to deploy a new site without connecting to Git?"**
   - Drag & drop seluruh folder `TryGame` ke area tersebut
   - Tunggu proses upload selesai
   - Game Anda akan langsung live dengan URL seperti: `https://random-name.netlify.app`

3. **Custom Domain (Opsional)**
   - Di Netlify dashboard, klik **Site settings** > **Change site name**
   - Ganti dengan nama yang Anda inginkan (contoh: `sampah-ku-game`)
   - URL akan berubah menjadi: `https://sampah-ku-game.netlify.app`

### Opsi 3: Vercel

1. **Buka Vercel**
   - Kunjungi [vercel.com](https://vercel.com/)
   - Login dengan GitHub

2. **Deploy dari GitHub**
   - Klik **Add New** > **Project**
   - Import repository GitHub Anda
   - Klik **Deploy**
   - Game akan live di: `https://REPOSITORY-NAME.vercel.app`

## 📁 Struktur File

```
TryGame/
├── index.html      # Halaman utama
├── styles.css      # Styling game
├── game.js         # Logic game utama
├── ui.js           # UI management
├── sounds.js       # Sound effects
└── assets.js       # 3D assets & models
```

## 🛠️ Teknologi

- **Three.js** - 3D rendering
- **HTML5 Canvas** - Game display
- **JavaScript** - Game logic
- **CSS3** - Styling & animations

## 📝 Catatan

Game ini adalah static web application dan tidak memerlukan server backend. Semua file dapat di-hosting di platform static hosting secara gratis.

---

Dibuat dengan ❤️ untuk edukasi lingkungan
