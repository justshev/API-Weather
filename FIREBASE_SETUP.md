# Firebase Real-time Marine Data API

## Setup Firebase

1. **Buat Project Firebase**
   - Buka https://console.firebase.google.com/
   - Klik "Add project" atau "Tambah project"
   - Ikuti wizard untuk membuat project baru

2. **Aktifkan Firestore Database**
   - Di Firebase Console, pilih "Firestore Database"
   - Klik "Create database"
   - Pilih mode "Start in test mode" untuk development
   - Pilih lokasi server (pilih yang terdekat dengan lokasi Anda)

3. **Dapatkan Konfigurasi Firebase**
   - Di Firebase Console, klik icon gear (⚙️) > Project settings
   - Scroll ke bawah, pilih "Your apps" dan klik icon Web (</>)
   - Copy semua nilai konfigurasi Firebase

4. **Setup Environment Variables**
   - Copy file `.env.example` menjadi `.env`
   - Isi nilai-nilai dari konfigurasi Firebase yang sudah di-copy

## Install Dependencies

```bash
npm install
```

## Konfigurasi .env

Buat file `.env` di root project dan isi dengan:

```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

PORT=3000
NODE_ENV=development
```

## Jalankan Server

```bash
npm run dev
```

## API Endpoints

### 1. Get All Marine Data
```http
GET http://localhost:3000/api/marine/get
```

Response:
```json
{
  "message": "Marine data fetched successfully",
  "status": "success",
  "data": [
    {
      "id": "doc_id",
      "wave_height": 2.5,
      "wave_direction": 180,
      "wind_speed": 15.3,
      "wind_direction": 90,
      "timestamp": "2026-01-26T10:30:00.000Z"
    }
  ]
}
```

### 2. Post New Marine Data
```http
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
```http
GET http://localhost:3000/api/marine/stream
```

Endpoint ini akan mengirim data secara real-time setiap kali ada perubahan di database Firebase.

## Cara Menggunakan Real-time Stream

### Dari Browser (JavaScript/HTML):

```html
<!DOCTYPE html>
<html>
<head>
  <title>Marine Data Real-time</title>
</head>
<body>
  <h1>Marine Data Real-time</h1>
  <div id="data"></div>

  <script>
    const eventSource = new EventSource('http://localhost:3000/api/marine/stream');
    
    eventSource.onmessage = function(event) {
      const data = JSON.parse(event.data);
      console.log('Received data:', data);
      
      // Update UI dengan data terbaru
      document.getElementById('data').innerHTML = JSON.stringify(data, null, 2);
    };

    eventSource.onerror = function(error) {
      console.error('EventSource error:', error);
    };
  </script>
</body>
</html>
```

### Dari ESP32 (C++):

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* serverUrl = "http://your-server-ip:3000/api/marine/post";

void sendMarineData(float waveHeight, int waveDirection, float windSpeed, int windDirection) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    String jsonData = "{";
    jsonData += "\"wave_height\":" + String(waveHeight) + ",";
    jsonData += "\"wave_direction\":" + String(waveDirection) + ",";
    jsonData += "\"wind_speed\":" + String(windSpeed) + ",";
    jsonData += "\"wind_direction\":" + String(windDirection);
    jsonData += "}";
    
    int httpResponseCode = http.POST(jsonData);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error sending data");
    }
    
    http.end();
  }
}

void loop() {
  // Baca sensor Anda
  float waveHeight = readWaveHeight();
  int waveDirection = readWaveDirection();
  float windSpeed = readWindSpeed();
  int windDirection = readWindDirection();
  
  // Kirim data ke server
  sendMarineData(waveHeight, waveDirection, windSpeed, windDirection);
  
  delay(5000); // Kirim setiap 5 detik
}
```

### Dari Python:

```python
import requests
import sseclient  # pip install sseclient-py

# Subscribe ke real-time stream
def listen_to_stream():
    response = requests.get('http://localhost:3000/api/marine/stream', stream=True)
    client = sseclient.SSEClient(response)
    
    for event in client.events():
        data = json.loads(event.data)
        print('Received data:', data)

# Post data baru
def post_marine_data(wave_height, wave_direction, wind_speed, wind_direction):
    url = 'http://localhost:3000/api/marine/post'
    data = {
        'wave_height': wave_height,
        'wave_direction': wave_direction,
        'wind_speed': wind_speed,
        'wind_direction': wind_direction
    }
    response = requests.post(url, json=data)
    print(response.json())
```

## Struktur Data di Firestore

Collection: `marine_environment_data`

Document structure:
```json
{
  "wave_height": 2.5,
  "wave_direction": 180,
  "wind_speed": 15.3,
  "wind_direction": 90,
  "timestamp": Timestamp
}
```

## Keuntungan Firebase Firestore

1. **Real-time Updates**: Data otomatis ter-update di semua client yang terhubung
2. **Scalability**: Otomatis scale sesuai kebutuhan
3. **Offline Support**: Data tetap bisa diakses saat offline
4. **No Server Maintenance**: Fully managed oleh Google
5. **Free Tier**: 50K reads, 20K writes per hari gratis

## Security Rules (untuk Production)

Di Firebase Console > Firestore Database > Rules, update dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /marine_environment_data/{document=**} {
      allow read: if true;  // Semua orang bisa baca
      allow write: if request.auth != null;  // Hanya authenticated user yang bisa tulis
    }
  }
}
```

## Troubleshooting

1. **Error: Firebase config tidak ditemukan**
   - Pastikan file `.env` sudah dibuat dan terisi dengan benar
   - Restart server setelah mengubah `.env`

2. **Error: Permission denied**
   - Cek Firestore Rules di Firebase Console
   - Untuk testing, set rules ke test mode

3. **Real-time stream tidak bekerja**
   - Pastikan client support Server-Sent Events (SSE)
   - Cek firewall/proxy yang mungkin block connection

## Migration dari Prisma/Supabase

✅ Semua dependency Prisma dan Supabase sudah dihapus
✅ Database sekarang menggunakan Firebase Firestore
✅ Real-time updates sudah terintegrasi
✅ API endpoints tetap sama (backward compatible)

## Next Steps

1. Setup Firebase project dan dapatkan konfigurasi
2. Install dependencies dengan `npm install`
3. Update file `.env` dengan konfigurasi Firebase Anda
4. Jalankan server dengan `npm run dev`
5. Test real-time functionality dengan membuka `/api/marine/stream`
