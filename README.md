# Worksheet P6 - Responsif Mobile-First

Nama: Friska Rahmadani
NIM: 25523106

## A. Kerangka
- Baris halaman: `auto 1fr auto`
- Kolom isi: `16rem 1fr`
- Navbar: flex, arah baris
- Menu samping: flex, arah kolom
- Galeri: grid
- Isi kartu: flex

## B. Layout
`.page` menjadi grid dengan `min-height: 100dvh`. Area isi menggunakan grid dua kolom dan `gap`. Navbar menggunakan flex dan `gap`.

## C. Galeri
Galeri menggunakan `repeat(auto-fit, minmax(16rem, 1fr))` tanpa media query khusus galeri. Baris bawah kartu memakai flex dan `gap`.

## D. Penempatan
Blok daftar masakan memakai `grid-column: span 2`. Area halaman menggunakan named grid areas `sisi` dan `utama`.

## E. Overflow
Kartu galeri memiliki `min-height: 14rem`. Item yang dapat menyusut diberi `min-width: 0`, sedangkan teks panjang memakai `overflow-wrap: anywhere`.

## F. Pemeriksaan
Uji halaman pada lebar 360 px dan 1280 px. Pastikan galeri berubah jumlah kolom tanpa media query, tidak ada overflow, tidak ada float, dan tema P4 tetap bekerja.


## P6 - Responsif Mobile-First
- Viewport: `width=device-width, initial-scale=1.0`.
- Gaya dasar dibuat untuk layar sempit terlebih dahulu.
- 48rem: galeri berubah menjadi dua kolom.
- 60rem: sidebar bersanding dengan konten dan galeri menjadi tiga kolom.
- Gambar memakai `max-width: 100%` dan tabel memakai `.table-wrap { overflow-x: auto; }`.
- `tokens.css` diisi kembali (sebelumnya kosong) agar semua `var(--space-*)`, `var(--spacing-*)`, `--font-size-*`, `--radius-*` terbaca.
- `layout.css`: jumlah kolom (`.isi`, `.utama`, `.galeri`) dipindah ke `responsif.css`; `grid-template-areas` dan `auto-fit` dihapus karena bentrok dengan gaya dasar.
- Tidak ada lebar piksel tetap di berkas CSS (hanya garis tepi).

### Hasil uji
| Lebar | Kolom galeri | Sidebar | Gulir mendatar |
| --- | --- | --- | --- |
| 360 px | 1 | di atas konten | tidak ada (tabel bergulir sendiri) |
| 768 px | 2 | di atas konten | tidak ada |
| 1.280 px | 3 | bersanding | tidak ada |

Tangkapan layar: folder `screenshots/`.
