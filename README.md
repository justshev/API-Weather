# Marine Environment Data API - Real-time with Firebase

Program REST API untuk monitoring data lingkungan laut secara real-time menggunakan Firebase Firestore.

## Fitur
- ✅ REST API dengan Express.js + TypeScript
- ✅ Firebase Firestore untuk database real-time
- ✅ Server-Sent Events (SSE) untuk streaming data real-time
- ✅ CRUD operations (Create, Read)
- ✅ Auto timestamp untuk setiap data
- ✅ Scalable dan cloud-based

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Setup Firebase (lihat `FIREBASE_SETUP.md` untuk panduan lengkap)

3. Buat file `.env` dari `.env.example` dan isi dengan konfigurasi Firebase Anda

4. Jalankan server:
```bash
npm run dev
```

## API Endpoints

Base URL: `http://localhost:3000`

### Supabase Version  
- Base URL: `http://localhost:3000`
- Endpoints: GET, POST, PUT, DELETE (Full CRUD)

### 1. Home
```
GET http://localhost:3000/
```

### 2. Mendapatkan Semua Data Cuaca
```
GET http://localhost:3000/api/weather
```

### 3. Mendapatkan Data Cuaca Berdasarkan ID
```
GET http://localhost:3000/api/weather/:id
```

### 1. Get All Marine Data
```
GET http://localhost:3000/api/marine/get
```

Response:
```json
{
  "message": "Marine data fetched successfully",
  "status": "success",
  "data": [
    {
      "id": "abc123",
      "wave_height": 2.5,
      "wave_direction": 180,
      "wind_speed": 15.3,
      "wind_direction": 90,
      "timestamp": {
        "seconds": 1737891600,
        "nanoseconds": 0
      }
    }
  ]
}
```

### 2. Post New Marine Data
```
POST http://localhost:3000/api/marine/post
Content-Type: application/json

{
  "wave_height": 2.5,
  "wave_direction": 180,
  "wind_speed": 15.3,
  "wind_direction": 90
}
```

Response:
```json
{
  "message": "Marine data posted successfully",
  "status": "success",
  "data": {
    "id": "new_doc_id",
    "wave_height": 2.5,
    "wave_direction": 180,
    "wind_speed": 15.3,
    "wind_direction": 90
  }
}
```

### 3. Real-time Stream (Server-Sent Events)
```
GET http://localhost:3000/api/marine/stream
```

Endpoint ini akan streaming data secara real-time setiap ada perubahan di database.

## Struktur Data

```json
{
  "id": "document_id",
  "wave_height": 2.5,
  "wave_direction": 180,
  "wind_speed": 15.3,
  "wind_direction": 90,
  "timestamp": {
    "seconds": 1737891600,
    "nanoseconds": 0
  }
}
```

## Development

```bash
npm run dev
```

## Setup Firebase

Lihat panduan lengkap di [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

### Ringkasan Singkat:

1. **Buat Project di Firebase**
   - Kunjungi https://console.firebase.google.com/
   - Klik "Add Project"
   - Ikuti wizard setup

2. **Aktifkan Firestore Database**
   - Di Firebase Console, pilih "Firestore Database"
   - Klik "Create database"
   - Pilih mode "Start in test mode"

3. **Dapatkan Konfigurasi**
   - Project Settings > Your apps > Web app
   - Copy konfigurasi Firebase

4. **Update file `.env`**
   ```bash
   cp .env.example .env
   ```

   Isi dengan:
   ```env
   FIREBASE_API_KEY=your_api_key_here
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   PORT=3000
   ```

5. **Jalankan Server**
   ```bash
   npm run dev
   ```

## Real-time Features

### Cara Menggunakan Real-time Stream dari Frontend

```html
<!DOCTYPE html>
<html>
<head>
  <title>Marine Data Real-time</title>
</head>
<body>
  <h1>Marine Data Monitor</h1>
  <div id="data"></div>

  <script>
    const eventSource = new EventSource('http://localhost:3000/api/marine/stream');
    
    eventSource.onmessage = function(event) {
      const data = JSON.parse(event.data);
      console.log('Real-time data:', data);
      
      // Update UI
      document.getElementById('data').innerHTML = 
        '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    };

    eventSource.onerror = function(error) {
      console.error('Connection error:', error);
    };
  </script>
</body>
</html>
```

### Integrasi dengan ESP32

Lihat panduan lengkap di [FIREBASE_SETUP.md](FIREBASE_SETUP.md) untuk contoh kode ESP32.

## Testing API dengan Postman

### Setup Postman

1. **Download & Install Postman**
   - Download dari https://www.postman.com/downloads/
   - Install dan buka aplikasi

2. **Buat Collection Baru**
   - Klik "New" → "Collection"
   - Beri nama "Weather API"
   - Simpan

### Testing Endpoints

#### 1. GET - Semua Data Cuaca
```
Method: GET
URL: http://localhost:3000/api/weather
```
- Klik tab "Headers" (tidak perlu tambahan header)
- Klik "Send"
- Response akan muncul di bagian bawah

#### 2. GET - Data Cuaca by ID
```
Method: GET
URL: http://localhost:3000/api/weather/1
```
- Ganti angka `1` dengan ID yang diinginkan
- Klik "Send"

#### 3. GET - Data Cuaca by Kota
```
Method: GET
URL: http://localhost:3000/api/weather/city/Jakarta
```
- Nama: "Marine Environment API"

### Testing Endpoints

#### 1. GET - All Marine Data
```
Method: GET
URL: http://localhost:3000/api/marine/get
```

#### 2. POST - Tambah Data Baru
```
Method: POST
URL: http://localhost:3000/api/marine/post
```

**Setup di Postman:**
1. Pilih method "POST"
2. Masukkan URL
3. Klik tab "Headers"
   - Add: `Content-Type` : `application/json`
4. Klik tab "Body"
5. Pilih "raw" dan format "JSON"
6. Masukkan JSON data:
   ```json
   {
     "wave_height": 2.5,
     "wave_direction": 180,
     "wind_speed": 15.3,
     "wind_direction": 90
   }
   ```
7. Klik "Send"

#### 3. GET - Real-time Stream
```
Method: GET
URL: http://localhost:3000/api/marine/stream
```

**Note:** Untuk test real-time stream, lebih baik gunakan browser atau EventSource client.

### Contoh Response Sukses

**GET All Marine Data:**
```json
{
  "message": "Marine data fetched successfully",
  "status": "success",
  "data": [
    {
      "id": "abc123",
      "wave_height": 2.5,
      "wave_direction": 180,
      "wind_speed": 15.3,
      "wind_direction": 90,
      "timestamp": {
        "seconds": 1737891600,
        "nanoseconds": 0
      }
    }
  ]
}
```

**POST Create Marine Data:**
```json
{
  "message": "Marine data posted successfully",
  "status": "success",
  "data": {
    "id": "new_doc_id",
    "wave_height": 2.5,
    "wave_direction": 180,
    "wind_speed": 15.3,
    "wind_direction": 90
  }
}
```

## Teknologi yang Digunakan
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Firebase Firestore** - Real-time NoSQL database
- **Server-Sent Events (SSE)** - Real-time streaming
- **dotenv** - Environment variables management

## Struktur Project

```
Innovillage-main/
├── src/
│   ├── app.ts                          # Express app configuration
│   ├── server.ts                       # Server entry point
│   ├── config/
│   │   └── firebase.ts                 # Firebase configuration
│   ├── features/
│   │   └── marine/
│   │       ├── marine.controller.ts    # Request handlers
│   │       ├── marine.service.ts       # Business logic
│   │       ├── marine.repository.ts    # Database operations
│   │       └── marine.route.ts         # API routes
│   ├── model/
│   │   └── response.ts                 # Response types
│   └── middleware/
│       └── errorHandler.ts             # Error handling
├── .env.example                        # Template untuk env vars
├── .env                                # Environment variables (jangan di-commit!)
├── package.json                        # Dependencies & scripts
├── tsconfig.json                       # TypeScript configuration
├── README.md                           # Dokumentasi
└── FIREBASE_SETUP.md                   # Panduan setup Firebase
```

## NPM Scripts

```bash
npm run dev            # Development mode dengan auto-reload
```

## Migration dari Supabase/Prisma

✅ Semua kode Prisma dan Supabase sudah dihapus  
✅ Menggunakan Firebase Firestore untuk database  
✅ Real-time updates menggunakan Firestore listeners  
✅ API backward compatible (endpoint sama)  
✅ Struktur data tetap sama  

## Troubleshooting

**Error: Firebase config tidak ditemukan**
- Pastikan file `.env` sudah dibuat dan terisi
- Restart server setelah mengubah `.env`

**Error: Permission denied di Firestore**
- Cek Firestore Rules di Firebase Console
- Untuk testing, gunakan test mode

**Real-time stream tidak bekerja**
- Pastikan client support Server-Sent Events
- Cek firewall/proxy yang mungkin block connection
