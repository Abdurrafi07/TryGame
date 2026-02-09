# 🚀 Langkah Deploy Game Sampah-ku

## ✅ Yang Sudah Dilakukan
- ✅ Git repository sudah diinisialisasi
- ✅ Semua file sudah di-commit
- ✅ README.md dan .gitignore sudah dibuat

---

## 📝 Opsi 1: GitHub Pages (Recommended)

### Langkah 1: Buat Repository di GitHub

1. Buka [github.com](https://github.com) dan login (atau daftar jika belum punya akun)
2. Klik tombol **"+"** di pojok kanan atas, pilih **"New repository"**
3. Isi detail repository:
   - **Repository name**: `sampah-ku-game` (atau nama lain yang Anda suka)
   - **Description**: "Game edukasi pilah sampah 3D"
   - Pilih **Public**
   - **JANGAN** centang "Add a README file" (sudah ada)
4. Klik **"Create repository"**

### Langkah 2: Push ke GitHub

Setelah repository dibuat, GitHub akan menampilkan instruksi. Jalankan perintah berikut di terminal (PowerShell) di folder `c:\TryGame`:

```powershell
git branch -M main
git remote add origin https://github.com/USERNAME/sampah-ku-game.git
git push -u origin main
```

**Ganti `USERNAME`** dengan username GitHub Anda!

**Contoh**: Jika username Anda adalah `johndoe`, maka:
```powershell
git remote add origin https://github.com/johndoe/sampah-ku-game.git
```

> **Catatan**: Anda mungkin diminta login GitHub. Gunakan **Personal Access Token** sebagai password (bukan password akun).

### Langkah 3: Aktifkan GitHub Pages

1. Buka repository Anda di GitHub
2. Klik tab **"Settings"**
3. Di sidebar kiri, klik **"Pages"** (di bagian Code and automation)
4. Di bagian **"Source"**:
   - Pilih branch: **main**
   - Pilih folder: **/ (root)**
5. Klik **"Save"**

### Langkah 4: Akses Game Anda! 🎉

Tunggu 1-3 menit, lalu game Anda akan tersedia di:
```
https://USERNAME.github.io/sampah-ku-game/
```

**Ganti `USERNAME`** dengan username GitHub Anda!

---

## ⚡ Opsi 2: Netlify (Paling Cepat - 2 Menit!)

Jika Anda ingin cara yang PALING MUDAH dan CEPAT:

### Langkah 1: Buka Netlify

1. Buka [netlify.com](https://www.netlify.com/)
2. Klik **"Sign up"** (bisa dengan email atau GitHub)

### Langkah 2: Deploy dengan Drag & Drop

1. Setelah login, Anda akan melihat dashboard
2. Cari area yang bertulisan **"Want to deploy a new site without connecting to Git?"**
3. **Drag & drop** seluruh folder `c:\TryGame` ke area tersebut
4. Tunggu upload selesai (biasanya < 1 menit)
5. **DONE!** Game langsung live! 🎉

URL akan seperti: `https://random-name-12345.netlify.app`

### Langkah 3: Custom URL (Opsional)

1. Di dashboard Netlify, klik site yang baru dibuat
2. Klik **"Site settings"**
3. Klik **"Change site name"**
4. Ganti dengan nama yang Anda inginkan, misalnya: `sampah-ku-game`
5. URL akan berubah menjadi: `https://sampah-ku-game.netlify.app`

---

## 🔄 Update Game di Masa Depan

### Jika pakai GitHub Pages:
```powershell
# Setelah edit file
git add .
git commit -m "Update game"
git push
# Tunggu 1-2 menit, perubahan akan live
```

### Jika pakai Netlify:
1. Drag & drop folder `TryGame` lagi ke Netlify
2. Pilih site yang sama
3. Netlify akan update otomatis

---

## ❓ Troubleshooting

### Tidak bisa push ke GitHub
- **Error: "remote origin already exists"**
  ```powershell
  git remote remove origin
  git remote add origin https://github.com/USERNAME/REPO-NAME.git
  ```

- **Diminta password tapi tidak bisa login**
  - GitHub tidak lagi menerima password biasa
  - Harus pakai **Personal Access Token**:
    1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
    2. Generate new token → Centang "repo"
    3. Copy token dan paste sebagai password saat push

### Game tidak muncul di GitHub Pages
- Tunggu 3-5 menit setelah activate Pages
- Pastikan branch yang dipilih adalah **main**
- Pastikan file `index.html` ada di root folder (bukan di subfolder)

---

## 📞 Butuh Bantuan?

Jika ada error atau kesulitan, screenshot error messagenya dan tanyakan ke saya!
