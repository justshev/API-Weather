# 🔧 Installation & Setup Instructions

## Langkah-langkah Instalasi

### 1️⃣ Hapus Dependencies Lama (Optional tapi Disarankan)

Sebelum install dependencies baru, bersihkan dulu yang lama:

```powershell
# Hapus folder node_modules dan package-lock.json
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
```

Atau manual:
- Delete folder `node_modules`
- Delete file `package-lock.json`

### 2️⃣ Install Dependencies Baru

```powershell
npm install
```

Ini akan menginstall:
- ✅ `firebase` - Firebase SDK
- ✅ `firebase-admin` - Firebase Admin SDK
- ✅ `express` - Web framework
- ✅ `dotenv` - Environment variables
- ✅ `typescript` - TypeScript compiler
- ✅ `ts-node` - TypeScript execution
- ✅ `nodemon` - Auto-reload server
- ✅ Type definitions (@types/*)

### 3️⃣ Verifikasi Instalasi

Cek apakah semua dependencies terinstall:

```powershell
npm list --depth=0
```

Seharusnya muncul:
```
├── dotenv@17.2.3
├── express@5.2.1
├── firebase@11.1.0
├── firebase-admin@13.0.1
├── @types/express@5.0.6
├── @types/node@25.0.5
├── nodemon@3.1.11
├── ts-node@10.9.2
└── typescript@5.9.3
```

### 4️⃣ Setup Environment Variables

```powershell
# Copy .env.example menjadi .env
Copy-Item .env.example .env
```

Kemudian edit file `.env` dan isi dengan konfigurasi Firebase Anda.

### 5️⃣ Jalankan Server

```powershell
npm run dev
```

Server akan berjalan di `http://localhost:3000`

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'firebase'"

**Solusi:**
```powershell
npm install firebase firebase-admin
```

### Error: "Cannot find module 'dotenv'"

**Solusi:**
```powershell
npm install
```

### Error: "tsc: command not found" atau "ts-node: command not found"

**Solusi:**
```powershell
npm install -D typescript ts-node
```

### Error: Module resolution errors

**Solusi - Reset node_modules:**
```powershell
Remove-Item -Path "node_modules" -Recurse -Force
Remove-Item -Path "package-lock.json" -Force
npm cache clean --force
npm install
```

### Port 3000 sudah digunakan

**Solusi:**
Edit file `.env` dan ubah PORT:
```env
PORT=3001
```

Atau kill process yang menggunakan port 3000:
```powershell
# Cari process yang pakai port 3000
netstat -ano | findstr :3000

# Kill process (ganti <PID> dengan process ID)
taskkill /PID <PID> /F
```

---

## 📦 Package Versions

Versions yang digunakan (tested & working):

| Package | Version |
|---------|---------|
| firebase | ^11.1.0 |
| firebase-admin | ^13.0.1 |
| express | ^5.2.1 |
| dotenv | ^17.2.3 |
| typescript | ^5.9.3 |
| ts-node | ^10.9.2 |
| nodemon | ^3.1.11 |
| @types/express | ^5.0.6 |
| @types/node | ^25.0.5 |

---

## 🚀 NPM Scripts

```json
{
  "dev": "nodemon --watch src --exec ts-node src/server.ts"
}
```

### Available Commands:

```powershell
# Development mode (auto-reload)
npm run dev

# Manual start (tidak auto-reload)
npx ts-node src/server.ts
```

---

## 🗂️ File Structure After Installation

```
Innovillage-main/
├── node_modules/              # ✅ Installed dependencies
├── src/
│   ├── config/
│   │   └── firebase.ts        # ✅ Firebase config
│   ├── features/
│   │   └── marine/
│   │       ├── marine.controller.ts
│   │       ├── marine.service.ts
│   │       ├── marine.repository.ts
│   │       └── marine.route.ts
│   ├── model/
│   │   └── response.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── app.ts
│   └── server.ts
├── .env                       # ✅ Your Firebase config
├── .env.example               # Template
├── package.json               # ✅ Updated dependencies
├── package-lock.json          # ✅ Lock file
├── tsconfig.json              # TypeScript config
├── example-client.html        # Demo client
├── FIREBASE_SETUP.md          # Setup guide
├── QUICKSTART.md              # Quick guide
├── MIGRATION_SUMMARY.md       # What changed
└── README.md                  # Documentation
```

---

## ✅ Checklist Instalasi Berhasil

Centang jika sudah:

- [ ] Folder `node_modules` ada dan terisi
- [ ] File `package-lock.json` ada
- [ ] File `.env` sudah dibuat dan terisi
- [ ] Tidak ada error saat `npm install`
- [ ] Command `npm run dev` berhasil start server
- [ ] Server berjalan di `http://localhost:3000`
- [ ] Tidak ada error "Cannot find module"

---

## 🔄 Update Dependencies (Future)

Untuk update dependencies ke versi terbaru:

```powershell
# Cek dependencies yang bisa diupdate
npm outdated

# Update semua ke versi terbaru (hati-hati, bisa breaking)
npm update

# Update specific package
npm install firebase@latest
```

---

## 📌 Important Notes

1. **Node.js Version**: Minimal Node.js v16 atau lebih baru
   ```powershell
   node --version
   ```

2. **NPM Version**: Minimal NPM v8
   ```powershell
   npm --version
   ```

3. **Firebase Account**: Perlu akun Google untuk Firebase

4. **Internet Connection**: Diperlukan untuk:
   - Install dependencies
   - Connect ke Firebase
   - Real-time updates

---

## 🎯 Next Step After Installation

1. ✅ Dependencies terinstall
2. ➡️ Setup Firebase (lihat [QUICKSTART.md](QUICKSTART.md))
3. ➡️ Buat file `.env`
4. ➡️ Test API dengan Postman atau browser
5. ➡️ Integrasikan dengan ESP32

**Happy coding! 🚀**
