# Worksheet P5 - Layout Modern: Flexbox dan Grid

Nama: Friska Rahmadani
NIM: 25523106

## Lembar A
Kerangka halaman:
- Baris 1: header = auto
- Baris 2: isi = 1fr
- Baris 3: footer = auto
- Kolom isi: sidebar 16rem dan konten 1fr

Sumbu:
- Navbar: baris, sumbu utama horizontal
- Baris tombol kartu: baris, sumbu utama horizontal
- Menu samping: kolom, sumbu utama vertikal

Pilihan:
- Kepala halaman: Flex, karena menyusun elemen dalam satu arah.
- Isi dua kolom: Grid, karena membutuhkan baris/kolom.
- Galeri kartu: Grid, karena kartu disusun dalam beberapa kolom.
- Isi satu kartu: Flex, karena elemen disusun dalam satu arah.

## Lembar D
- `.sorotan { grid-column: span 2; }`
- `.papan { grid-row: span 2; }`
- Area utama menggunakan `.sisi` dan `.utama` dengan `grid-area`.

## Lembar F
Potongan kode:
`grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));`

Dipakai pada:
Galeri kartu.

Tiket keluar:
1. Flex dipakai pada navbar dan bagian dalam kartu karena elemen disusun satu arah.
2. Grid dipakai pada kerangka halaman dan galeri karena membutuhkan susunan baris dan kolom.
3. Kasus meluber: teks panjang dapat mendorong kolom; diperbaiki dengan `min-width: 0` dan `overflow-wrap: anywhere`.

Catatan:
Bagian paling sulit adalah menyesuaikan grid dan flex agar tetap rapi pada ukuran layar berbeda.
