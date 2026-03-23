# 🌸 Template Undangan Digital – Rustic Floral

Template undangan pernikahan digital **Rustic Floral** oleh daydev. Template ini menggabungkan kehangatan alam dengan sentuhan romantis digital.

## ✨ Fitur

- **Opening Cover** dengan animasi slide dan tampilan nama pengantin
- **Countdown Timer** otomatis menghitung mundur ke hari pernikahan
- **Galeri Foto Slideshow** hingga 10 foto dengan thumbnail dan autoplay
- **Video Teaser** embed YouTube / Vimeo
- **Angpao Digital** – nomor rekening bank & QR Code e-wallet (GoPay/OVO/dll)
- **Add to Calendar** – Google Calendar & Apple Calendar (file .ics)
- **RSVP Form** konfirmasi kehadiran
- **Animasi Kelopak Bunga** jatuh (falling petals)
- **Navigasi Tetap** (sticky nav) saat scroll
- **Scroll Reveal** animasi saat scroll
- **Lightbox** untuk foto fullscreen
- Desain **Responsif** (Mobile-first)

## 🎨 Karakteristik Desain

| Aspek | Detail |
|---|---|
| **Palet Warna** | Krem, Cokelat Muda, Terracotta, Hijau Daun (Earth Tones) |
| **Font Nama** | Great Vibes / Dancing Script (script/handwriting) |
| **Font Detail** | Playfair Display (serif), Lato (sans-serif) |
| **Ornamen** | SVG watercolor bunga & daun di sudut halaman |
| **Animasi** | Kelopak bunga berguguran, fade-in on scroll |

## 🚀 Cara Pakai

### 1. Buka dan Edit Konfigurasi

Edit bagian `CONFIG` di file `assets/js/main.js`:

```javascript
const CONFIG = {
  groomName: "Nama Mempelai Pria",
  brideName: "Nama Mempelai Wanita",
  weddingDate: "2025-12-25T08:00:00",  // Tanggal & waktu akad
  akad: {
    date: "25 Desember 2025",
    time: "08.00 – 10.00 WIB",
    venue: "Nama Masjid / Gedung",
    address: "Alamat lengkap",
    mapsUrl: "https://maps.google.com/?q=...",
  },
  resepsi: {
    date: "25 Desember 2025",
    time: "11.00 – 15.00 WIB",
    venue: "Nama Gedung Resepsi",
    address: "Alamat lengkap",
    mapsUrl: "https://maps.google.com/?q=...",
  },
  youtube: "https://www.youtube.com/embed/VIDEO_ID_ANDA",
  gallery: [
    { src: "assets/images/foto1.jpg", caption: "Momen Pertama" },
    // ... hingga 10 foto
  ],
  gift: [
    { type: "bank", bank: "BCA", account: "1234567890", name: "Nama" },
    { type: "ewallet", provider: "GoPay", account: "0812-xxxx", qr: "assets/images/qr.png" },
  ],
};
```

### 2. Tambahkan Foto

Letakkan foto di folder `assets/images/` dan perbarui path di `CONFIG.gallery`.

### 3. Build CSS (opsional)

Jika ingin memodifikasi Tailwind:

```bash
npm install
npm run build:css     # Build sekali
npm run dev:css       # Watch mode
```

### 4. Deploy

Upload semua file (kecuali `node_modules`) ke hosting statis (GitHub Pages, Netlify, Vercel, dll).

## 📁 Struktur File

```
├── index.html              # Halaman utama undangan
├── assets/
│   ├── css/
│   │   ├── style.css       # Gaya kustom (animasi, warna, komponen)
│   │   └── tailwind.css    # Tailwind CSS (pre-compiled)
│   ├── js/
│   │   └── main.js         # JavaScript (konfigurasi & fitur)
│   └── images/             # Letakkan foto di sini
├── input.css               # Input untuk build Tailwind
├── tailwind.config.js      # Konfigurasi Tailwind
└── package.json
```

## 📝 Lisensi

MIT © [daydev](https://github.com/iamdayy)
