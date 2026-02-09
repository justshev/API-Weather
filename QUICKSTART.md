# Quick Start Guide - Firebase Real-time Marine API

## 🚀 Setup Cepat (5 Menit)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Firebase

1. Buka https://console.firebase.google.com/
2. Klik "Add project" / "Tambah project"
3. Nama project: `marine-monitor` (atau nama lain)
4. Disable Google Analytics (optional)
5. Klik "Create project"

### Step 3: Aktifkan Firestore

1. Di sidebar, klik "Firestore Database"
2. Klik "Create database"
3. Pilih **"Start in test mode"** (untuk development)
4. Pilih lokasi: **asia-southeast1 (Singapore)** atau terdekat
5. Klik "Enable"

### Step 4: Dapatkan Konfigurasi

1. Klik icon ⚙️ (Settings) > "Project settings"
2. Scroll ke bawah, klik icon Web `</>`
3. App nickname: `marine-web`
4. Jangan centang "Firebase Hosting"
5. Klik "Register app"
6. **COPY semua konfigurasi** yang muncul

### Step 5: Setup Environment

1. Copy file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```

2. Buka file `.env` dan isi dengan konfigurasi Firebase:
   ```env
   FIREBASE_API_KEY=AIzaSy...
   FIREBASE_AUTH_DOMAIN=marine-monitor.firebaseapp.com
   FIREBASE_PROJECT_ID=marine-monitor
   FIREBASE_STORAGE_BUCKET=marine-monitor.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=123456789
   FIREBASE_APP_ID=1:123456789:web:abc123
   PORT=3000
   ```

### Step 6: Jalankan Server

```bash
npm run dev
```

Server akan berjalan di: `http://localhost:3000`

### Step 7: Test API

#### Option 1: Gunakan Browser
Buka file `example-client.html` di browser untuk melihat real-time dashboard.

#### Option 2: Gunakan curl/Postman

**Test POST (Tambah Data):**
```bash
curl -X POST http://localhost:3000/api/marine/post \
  -H "Content-Type: application/json" \
  -d '{
    "wave_height": 2.5,
    "wave_direction": 180,
    "wind_speed": 15.3,
    "wind_direction": 90
  }'
```

**Test GET (Ambil Semua Data):**
```bash
curl http://localhost:3000/api/marine/get
```

**Test Real-time Stream:**
```bash
curl http://localhost:3000/api/marine/stream
```

---

## 🎯 Testing Real-time

### Cara 1: Buka example-client.html
1. Double-click file `example-client.html`
2. Buka di browser (Chrome/Firefox/Edge)
3. Form akan terhubung ke server secara real-time
4. Setiap data baru akan otomatis muncul

### Cara 2: Buka 2 Tab Browser
1. Tab 1: Buka `example-client.html`
2. Tab 2: Buka `example-client.html` lagi
3. Kirim data dari Tab 1
4. Lihat data otomatis muncul di Tab 2 (real-time!)

---

## 📱 Integrasi dengan ESP32

### Upload Code Ini ke ESP32:

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "WIFI_NAME";
const char* password = "WIFI_PASSWORD";
const char* serverUrl = "http://YOUR_SERVER_IP:3000/api/marine/post";

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    // Baca sensor (contoh nilai dummy)
    float waveHeight = random(10, 50) / 10.0;  // 1.0 - 5.0
    int waveDirection = random(0, 360);
    float windSpeed = random(50, 200) / 10.0;  // 5.0 - 20.0
    int windDirection = random(0, 360);
    
    String jsonData = "{";
    jsonData += "\"wave_height\":" + String(waveHeight) + ",";
    jsonData += "\"wave_direction\":" + String(waveDirection) + ",";
    jsonData += "\"wind_speed\":" + String(windSpeed) + ",";
    jsonData += "\"wind_direction\":" + String(windDirection);
    jsonData += "}";
    
    int httpResponseCode = http.POST(jsonData);
    
    if (httpResponseCode > 0) {
      Serial.println("Data sent successfully!");
    } else {
      Serial.println("Error sending data");
    }
    
    http.end();
  }
  
  delay(5000);  // Kirim setiap 5 detik
}
```

**Ganti:**
- `WIFI_NAME` dengan nama WiFi Anda
- `WIFI_PASSWORD` dengan password WiFi
- `YOUR_SERVER_IP` dengan IP server Anda (cek dengan `ipconfig` di Windows)

---

## 🔧 Troubleshooting

### Error: "Cannot find module 'firebase'"
```bash
npm install
```

### Error: "Firebase config is undefined"
- Pastikan file `.env` sudah dibuat
- Cek apakah semua variable sudah diisi
- Restart server: `npm run dev`

### Error: "Permission denied" di Firestore
1. Buka Firebase Console
2. Firestore Database > Rules
3. Ubah menjadi (untuk testing):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
4. Klik "Publish"

### Real-time tidak bekerja
- Pastikan browser support Server-Sent Events (Chrome, Firefox, Edge OK)
- Cek di Console browser apakah ada error
- Pastikan server sedang berjalan
- Test dengan: `curl http://localhost:3000/api/marine/stream`

### ESP32 tidak bisa kirim data
- Pastikan ESP32 terhubung ke WiFi yang sama dengan server
- Ganti `localhost` dengan IP address server (misal: `192.168.1.100`)
- Cek firewall Windows, pastikan port 3000 tidak diblock

---

## 📚 Next Steps

1. ✅ Setup Firebase - DONE
2. ✅ Test API - DONE
3. 🔄 Integrasikan dengan sensor real (ESP32)
4. 🔄 Customize dashboard (edit `example-client.html`)
5. 🔄 Deploy ke cloud (Firebase Hosting/Heroku/Vercel)

## 📖 Dokumentasi Lengkap

- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Panduan detail Firebase
- [README.md](README.md) - Dokumentasi API lengkap
- [CLEANUP.md](CLEANUP.md) - Cara hapus file Prisma lama

## 🆘 Butuh Bantuan?

Jika ada error:
1. Cek console/terminal untuk error message
2. Pastikan semua step sudah diikuti
3. Restart server dan browser
4. Cek file `.env` sudah benar

---

**Selamat! API Real-time Marine Anda sudah siap! 🎉**
