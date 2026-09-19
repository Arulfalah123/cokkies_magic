# Magic Bakery - Cookies dan Roti Homemade

Landing page toko cookies bergaya retro bakery. Dibuat dengan HTML, CSS, dan JavaScript murni tanpa build step, jadi bisa langsung dibuka di browser atau di hosting statis seperti GitHub Pages.

## Struktur

```
.
├── index.html              halaman utama
├── assets/
│   ├── css/style.css       seluruh styling, termasuk mode gelap
│   ├── js/main.js          menu mobile, slider, reveal on scroll, form
│   └── img/*.svg           ilustrasi produk (SVG buatan sendiri, bebas lisensi)
└── README.md
```

## Bagian halaman

1. Navbar sticky dengan menu mobile dan tombol ganti tema
2. Hero: judul besar, kartu foto kuning, badge alasan memilih
3. Marquee berjalan (cookies, pretzel, cake, pastry, croissant, bagel)
4. Andalan Kami: kartu foto, rating, kartu video
5. Paling Laris: slider produk dengan tombol panah dan scroll snap
6. Prosesnya Begini: tiga langkah proses
7. Tentang Kami dan statistik
8. Testimoni pelanggan
9. Ajakan langganan email dan footer

Seluruh copy memakai bahasa Indonesia dan harga dalam rupiah.

## Cara menjalankan lokal

Cukup buka `index.html` lewat browser. Kalau mau lewat server lokal:

```bash
python -m http.server 8000
```

lalu buka `http://localhost:8000`.

## Ganti gambar produk

Semua gambar ada di `assets/img/` dalam format SVG. Untuk memakai foto asli, simpan file foto di folder yang sama lalu ubah atribut `src` pada `index.html`. Ukuran kartu sudah pakai `aspect-ratio`, jadi foto persegi paling aman.

## Ganti warna

Semua warna diatur lewat CSS variable di bagian `:root` pada `assets/css/style.css`. Ubah satu nilai di situ dan seluruh halaman ikut berubah. Palet mode gelap ada di blok `[data-theme="dark"]`.

## Deploy ke GitHub Pages

1. Push repo ini ke GitHub
2. Buka Settings > Pages
3. Source: Deploy from a branch, pilih branch `main` dan folder `/ (root)`
4. Tunggu satu sampai dua menit, situs aktif di `https://<username>.github.io/<nama-repo>/`
