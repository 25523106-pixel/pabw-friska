# Worksheet P8 - JavaScript Modern ES6+

Nama: Friska Rahmadani
NIM: 25523106

## Isi folder
- `profil.html` - halaman P6; isi (judul, tabel, galeri, tentang, footer) sekarang digambar dari data di `js/app.js`.
- `js/app.js` - data (`profil`, `daftarMasakan`), fungsi murni, array methods, dan penampil ke halaman.
- Berkas CSS, `tema.js`, dan gambar tidak diubah dari P6.

## Ringkasan
- A: `<script type="module" src="js/app.js"></script>` satu kali sebelum `</body>`; dibuka lewat Live Server.
- B: `const`/`let`, template literal, `?.` dan `??` (`profil.alamat?.kota ?? "Belum diisi"`).
- C: fungsi murni `buatPerkenalan` dan `formatKeahlian` (plus pembantu `kapitalAwal`, `amankanTeks`, `saringKesulitan`, `buatBarisTabel`, `buatKartuGaleri`).
- D: `map` (membuat baris tabel), `filter` (masakan "Mudah", galeri hanya yang bergambar), `find` (Mie Goreng); `sort` memakai salinan `[...daftarMasakan]`.
- Perbaikan dari P6: tag `tema.js` yang tertulis dua kali dihapus satu; skrip inline form dipindah ke `app.js`; input pengguna di-escape (`amankanTeks`) sebelum masuk `innerHTML`.

## Pertemuan 8 - Deklarasi AI
Dibantu AI: kerangka `js/app.js` dan pemindahan isi HTML P6 menjadi data.
Saya kerjakan sendiri: [ISI - mis. memeriksa tiap baris di Console, galat E.5, tangkapan layar, tiket keluar, penilaian mandiri].
