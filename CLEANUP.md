# Cleanup Instructions - Hapus File Prisma/Supabase

## File dan Folder yang Perlu Dihapus

Setelah migrasi ke Firebase selesai, Anda dapat menghapus file-file berikut yang tidak lagi digunakan:

### 1. Folder Database Prisma
```
src/database/
```
Folder ini berisi konfigurasi Prisma yang sudah tidak digunakan lagi.

### 2. Folder Generated Prisma
```
generated/
```
Folder ini berisi generated code dari Prisma Client.

### 3. Folder Prisma Schema
```
prisma/
```
Folder ini berisi schema Prisma untuk database.

### 4. File Konfigurasi Prisma
```
prisma.config.ts
```
File konfigurasi Prisma yang tidak lagi diperlukan.

## Cara Menghapus (Opsional)

### Melalui File Explorer:
1. Navigasi ke folder project
2. Hapus folder/file yang disebutkan di atas

### Melalui Terminal/PowerShell:

```powershell
# Pindah ke direktori project
cd "C:\Users\User\Documents\PlatformIO\Projects\ESP_Provisioning\src\Innovillage-main\Innovillage-main"

# Hapus folder database
Remove-Item -Path "src\database" -Recurse -Force

# Hapus folder generated
Remove-Item -Path "generated" -Recurse -Force

# Hapus folder prisma
Remove-Item -Path "prisma" -Recurse -Force

# Hapus file prisma.config.ts
Remove-Item -Path "prisma.config.ts" -Force
```

## File Baru yang Ditambahkan

### 1. Konfigurasi Firebase
- `src/config/firebase.ts` - Konfigurasi Firebase & Firestore

### 2. Environment Template
- `.env.example` - Template untuk Firebase credentials

### 3. Dokumentasi
- `FIREBASE_SETUP.md` - Panduan lengkap setup Firebase
- `example-client.html` - Contoh client real-time

### 4. Updated Files
- `package.json` - Dependencies Firebase
- `src/features/marine/marine.repository.ts` - Firestore operations
- `src/features/marine/marine.service.ts` - Real-time support
- `src/features/marine/marine.controller.ts` - SSE endpoint
- `src/features/marine/marine.route.ts` - Real-time route
- `README.md` - Updated documentation
- `.gitignore` - Firebase rules

## Verifikasi Migrasi Berhasil

Checklist:
- ✅ File `src/config/firebase.ts` ada
- ✅ File `.env.example` ada
- ✅ `package.json` tidak ada dependencies Prisma
- ✅ `marine.repository.ts` menggunakan Firestore
- ✅ Real-time endpoint `/api/marine/stream` tersedia
- ✅ File dokumentasi `FIREBASE_SETUP.md` ada

## Next Steps

1. Install dependencies baru:
   ```bash
   npm install
   ```

2. Setup Firebase (ikuti FIREBASE_SETUP.md)

3. Buat file `.env` dari `.env.example`

4. Jalankan server:
   ```bash
   npm run dev
   ```

5. Test real-time dengan membuka `example-client.html` di browser

## Rollback (Jika Diperlukan)

Jika Anda perlu rollback ke Prisma/Supabase:
1. Gunakan Git untuk revert changes: `git checkout HEAD -- .`
2. Atau restore dari backup jika ada

## Catatan Penting

⚠️ **JANGAN hapus file-file ini jika Anda masih dalam tahap testing!**

Tunggu sampai Firebase sudah benar-benar berjalan dengan baik sebelum menghapus file Prisma.

Disarankan untuk commit perubahan ke Git terlebih dahulu sebelum menghapus file lama:

```bash
git add .
git commit -m "Migrate from Prisma/Supabase to Firebase"
```
